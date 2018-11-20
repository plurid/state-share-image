import { defaultBaseImage, imageWithState } from './defaultBaseImage';
import { stateEncode, stateDecode } from './utils';


const defaultStegMethod = 'LSB';



/**
 * stateShareImage.
 *      encode  :: returns image with encoded state object;
 *      decode  :: from image gets the state object.
 *
 * Steganography methods:
 *      LSB     :: Least Significant Bit;
 *      MSB     :: Most Significant Bit;
 *      DFT     :: Discrete Fourier Transform;
 *      DCT     :: Discrete Cosine Transform;
 *      DWT     :: Discrete Wavelet Transform;
 *      RSQ     :: Random Sequence Generator;
 *      CM      :: Chaotic Map;
 *      ECC     :: Error Correction Code;
 *      SPIHTR  :: Set Partitioning In Hierarchical Tree References.
 */
interface IStateShareImage {
    /**
     * Encode the stateObject, nude or encrypted, into an image
     * using the default or specified steganography method,
     * based on the defaultBaseImage or on the provided, domain-specific image.
     *
     * @param stateObject           Application State Object (nude<object> or encoded<string>).
     * @param method                (Optional) Steganography Method. Default is 'LSB'.
     * @returns {Promise<string>}   Base64 image data.
     */
    encode(stateObject: object | string, method?: string): Promise<string>;


    /**
     * From image data get a state object if it was encoded nude
     * or an encrypted string containing the state object.
     *
     * @param imageData             Image.
     * @param method                (Optional) Steganography Method. Default is 'LSB'.
     * @returns {Promise<string>}   State string.
     */
    decode(imageData: string, method?: string): Promise<string>;


    /**
     * Encrypt the stateObject before encoding it into the image.
     */
    encrypt(stateObject: object | string, publicKey: string): string;


    /**
     * Decrypt the stateObject after decoding it from the image.
     */
    decrypt(encryptedString: string, privateKey: string): string;
}


export const stateShareImage: IStateShareImage = {
    encode(stateObject, method = defaultStegMethod) {
        const stateString = typeof stateObject === 'object'
                                ? JSON.stringify(stateObject)
                                : stateObject;
        // console.log('stateString:', stateString);

        const domainImageMetaTag = document.querySelector('meta[property="state-share-image"]');
        const domainImageSrc = domainImageMetaTag ? domainImageMetaTag.getAttribute('content') : '';
        // console.log(domainImageSrc);

        const baseImageSrc = domainImageSrc ? domainImageSrc : defaultBaseImage
        // console.log('baseImage', baseImageSrc);

        return new Promise((resolve, reject) => {
            let image = new Image();
            image.onload = () => {
                return resolve(stateEncode(image, stateString, method));
            }
            image.onerror = reject;
            image.src = baseImageSrc;
        });
    },

    decode(imageData, method = defaultStegMethod) {
        return new Promise((resolve, reject) => {
            let image = new Image();
            image.onload = () => {
                return resolve(stateDecode(image, method));
            }
            image.onerror = reject;
            image.src = imageData;
        });
    },

    encrypt(stateObject, publicKey) {
        const stateString = typeof stateObject === 'object'
                                ? JSON.stringify(stateObject)
                                : stateObject;
        let encryptedState = '';

        return encryptedState;
    },

    decrypt(encryptedString, privateKey) {
        let decryptedState = '';

        return decryptedState;
    }
}



// Exemplification
const body = document.body;
const state = {
    app: {
        theme: 'night',
        multiByteChars: 'ăîșțâ€êé☻☃⁜𩸽𠜱👦✌️'
    }
}

async function testEncode() {
    // const publicKey = '';
    // const encryptedState = stateShareImage.encrypt(state, publicKey);
    // console.log('encryptedState', encryptedState);
    // const shareImageEncrypted = await stateShareImage.encode(encryptedState);
    // console.log('shareImageEncrypted', shareImageEncrypted);

    const shareImage = await stateShareImage.encode(state);
    console.log('shareImage', shareImage);

    // let newImg = new Image();
    // newImg.src = shareImage;
    // newImg.height = 100;
    // body.appendChild(newImg);
}
testEncode();



async function testDecode() {
    // const encryptedState = await stateShareImage.decode(<encrypted-image>);
    // console.log('encryptedState', encryptedState);
    // const privateKey = '';
    // const decryptedState = stateShareImage.decrypt(encryptedState, privateKey);
    // console.log('decryptedState', decryptedState);


    let encodedState = await stateShareImage.decode('./state.png');
    console.log('encodedState', encodedState);
}
testDecode();
