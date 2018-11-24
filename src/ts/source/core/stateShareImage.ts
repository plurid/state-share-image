import { defaultBaseImage100,
         defaultBaseImage200,
         defaultBaseImage400,
         defaultBaseImage800 } from './defaultBaseImage';
import { stateEncode } from './encode';
import { stateDecode } from './decode';
import { stateEncrypt } from './encrypt';
import { stateDecrypt } from './decrypt';


const defaultStegMethod = 'LSB';

const stateStringAllowableLengths = [1249, 4999, 19999, 79999];
const stateImagePossibleWidths = [100, 200, 400, 800];


interface IDefaultBaseImage {
    name: string,
    src: string,
    sizeLimit: number,
    charsLimit: number
}
type TDefaultBaseImages = Array<IDefaultBaseImage>;


interface IDefaultBaseImages {
    [key: string]: string;
}
const defBaseImages: IDefaultBaseImages = {
    defaultBaseImage100,
    defaultBaseImage200,
    defaultBaseImage400,
    defaultBaseImage800
}

const defaultBaseImages = makeDefaultBaseImages(stateStringAllowableLengths, stateImagePossibleWidths, defBaseImages);



/**
 * stateShareImage.
 *      encode  :: returns image with encoded state object;
 *      decode  :: from image gets the state object.
 *
 * Steganography methods:
 *      LSB     :: Least Significant Bit - default (supported);
 *      MSB     :: Most Significant Bit (supported);
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

        const defaultBaseImage = defBaseImages[getDefaultBaseImage('length', stateString.length, defaultBaseImages)];

        const domainImageMetaTag = document.querySelector('meta[property="state-share-image"]');
        const domainImageSrc = domainImageMetaTag ? domainImageMetaTag.getAttribute('content') : '';
        const baseImageSrc = domainImageSrc ? domainImageSrc : defaultBaseImage;

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

        return new Promise((resolve, reject) => {
            let stateImage = new Image();
            stateImage.onload = () => {
                return resolve(new Promise((resolve, reject) => {
                        const defaultBaseImage = defBaseImages[getDefaultBaseImage('width', stateImage.width, defaultBaseImages)];
                        const baseImageSrc = domainImageSrc ? domainImageSrc : defaultBaseImage;

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
        return stateEncrypt(stateString, publicKey);
    },

    decrypt(encryptedString, privateKey) {
        return stateDecrypt(encryptedString, privateKey);
    }
}


function getDefaultBaseImage(type: string, value: number, defaultBaseImages: TDefaultBaseImages) {
    for (let i = 0; i < defaultBaseImages.length; i++) {
        const defImage = defaultBaseImages[i];

        switch(type) {
            case 'length':
                if (value < defImage.charsLimit) {
                    return defImage.name;
                }
            case 'width':
                if (value === defImage.sizeLimit) {
                    return defImage.name;
                }
        }
    }
}



function makeDefaultBaseImages(lengths: number[],
                               widths: number[],
                               defBaseImage: IDefaultBaseImages): TDefaultBaseImages {
    const defaultBaseImages: TDefaultBaseImages = [];
    const imageBaseName = 'defaultBaseImage';

    for (let i = 0; i < lengths.length; i++) {
        const imageName = imageBaseName + widths[i];
        const defaultBaseImage: IDefaultBaseImage = {
            name: imageName,
            src: defBaseImage[imageName],
            sizeLimit: widths[i],
            charsLimit: lengths[i]
        };
        defaultBaseImages.push(defaultBaseImage);
    }

    return defaultBaseImages;
}




// // Exemplification
// const body = document.body;
// const state = {
//     app: {
//         theme: 'night',
//         multiByteChars: 'ăîșțâ€êé☻☃⁜𩸽𠜱👦✌️'
//     }
// }

// async function testEncode() {
//     const method = 'MSB';

//     // const publicKey = 'test';
//     // const encryptedState = stateShareImage.encrypt(state, publicKey);
//     // console.log('encryptedState', encryptedState);
//     // const shareImageEncrypted = await stateShareImage.encode(encryptedState);
//     // console.log('shareImageEncrypted', shareImageEncrypted);

//     const shareImage = await stateShareImage.encode(state);
//     // const shareImage = await stateShareImage.encode(state, method);
//     // console.log('shareImage', shareImage);

//     const encodedState = await stateShareImage.decode(shareImage);
//     // const encodedState = await stateShareImage.decode(shareImage, method);
//     // console.log('encodedState', encodedState);


//     // const newImg = new Image();
//     // newImg.src = shareImage;
//     // newImg.height = 100;
//     // body.appendChild(newImg);
// }
// testEncode();



// // async function testDecode() {
// //     // const method = 'MSB';

// //     // const encryptedState = 'testing';
// //     // const encryptedState = await stateShareImage.decode(<encrypted-image>);
// //     // console.log('encryptedState', encryptedState);
// //     // const privateKey = 'test';
// //     // const decryptedState = stateShareImage.decrypt(encryptedState, privateKey);
// //     // console.log('decryptedState', decryptedState);

// //     // const encodedState = await stateShareImage.decode(imageWithState);
// //     // const encodedState = await stateShareImage.decode(imageWithStateMSB, method);
// //     // const encodedState = await stateShareImage.decode(invertedImageWithState);
// //     // console.log('encodedState', encodedState);
// // }
// // testDecode();

(<any>window).stateShareImage = stateShareImage;
