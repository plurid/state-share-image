import { defaultBaseImage,
         imageWithState,
         imageWithStateMSB,
         invertedImageWithState,
         domainImageWithState } from './defaultBaseImage';
import { stateEncode } from './encode';
import { stateDecode } from './decode';


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
        console.log('stateString:', stateString);

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
        const domainImageMetaTag = document.querySelector('meta[property="state-share-image"]');
        const domainImageSrc = domainImageMetaTag ? domainImageMetaTag.getAttribute('content') : '';
        const baseImageSrc = domainImageSrc ? domainImageSrc : defaultBaseImage;

        return new Promise((resolve, reject) => {
            let stateImage = new Image();
            stateImage.onload = () => {
                return resolve(new Promise((resolve, reject) => {
                        let baseImage = new Image();
                        baseImage.onload = () => {
                            return resolve(stateDecode(stateImage, baseImage, method));
                        }
                        baseImage.onerror = reject;
                        baseImage.src = baseImageSrc;
                    })
                );
            }
            stateImage.onerror = reject;
            stateImage.src = imageData;
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
    const method = 'MSB';
    // const publicKey = '';
    // const encryptedState = stateShareImage.encrypt(state, publicKey);
    // console.log('encryptedState', encryptedState);
    // const shareImageEncrypted = await stateShareImage.encode(encryptedState);
    // console.log('shareImageEncrypted', shareImageEncrypted);

    const shareImage = await stateShareImage.encode(state);
    // const shareImage = await stateShareImage.encode(state, method);
    // console.log('shareImage', shareImage);

    let newImg = new Image();
    newImg.src = shareImage;
    newImg.height = 100;
    body.appendChild(newImg);
}
testEncode();



async function testDecode() {
    const method = 'MSB';

    // const encryptedState = await stateShareImage.decode(<encrypted-image>);
    // console.log('encryptedState', encryptedState);
    // const privateKey = '';
    // const decryptedState = stateShareImage.decrypt(encryptedState, privateKey);
    // console.log('decryptedState', decryptedState);

    let encodedState = await stateShareImage.decode(imageWithState);
    // let encodedState = await stateShareImage.decode(imageWithStateMSB, method);
    // let encodedState = await stateShareImage.decode(invertedImageWithState);
    console.log('encodedState', encodedState);
}
testDecode();
