import { defaultBaseImage, imageWithState } from './defaultBaseImage';
import { convert } from './convert';



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
     * @param stateObject     - Application State Object (nude<object> or encoded<string>)
     * @param method          - (Optional) Steganography Method. Default is 'LSB'.
     */
    encode(stateObject: object | string, method?: string): Promise<string>;


    /**
     * From image data get a state object if it was encoded nude
     * or an encrypted string containing the state object.
     *
     * @param imageData     - Image
     * @param method        - (Optional) Steganography Method. Default is 'LSB'.
     */
    decode(imageData: string, method?: string): string;


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
                const data = imageEncode(image, stateString, method);

                return resolve(data);
            }
            image.onerror = reject;
            image.src = baseImageSrc;
        });
    },

    decode(imageData, method = defaultStegMethod) {
        let stateString = ''

        const image = new Image();
        image.onload = function() {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            canvas.width = image.width;
            canvas.height = image.height;

            ctx.drawImage(image, 0, 0);

            var imgData = ctx.getImageData(0, 0, image.width, image.height);
            var pixelColors = imgData.data;
            // console.log('image with state pixelColors', pixelColors);

            // let i = 0;

            // let stateBits = '';

            // while (i < stateString.length) {
            //     const binaryChar = convert.toBinary(stateString[i]);

            //     stateBits += binaryChar;

            //     i++;
            // }
            // console.log(stateBits);



            // // function dec2bin(dec){
            // //     return (dec >>> 0).toString(2);
            // // }

            // for (let i = 0; i < stateBits.length; i++) {
            //     // let pixelBinary = dec2bin(pixelColors[i]);
            //     let encodedPixel = setBit(pixelColors[i], 0, stateBits[i]);
            //     // console.log('pixel value', pixelColors[i]);
            //     // console.log('encoded pixel', encodedPixel);

            //     pixelColors[i] = encodedPixel;
            // }
            // console.log(pixelColors);

            // ctx.putImageData(imgData, 0, 0);

            // let data = canvas.toDataURL();
            // let newImg = new Image();
            // newImg.src = data;
            // newImg.height = 100;
            // body.appendChild(newImg);
        };
        image.src = imageData;

        return stateString;
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



function setBit(number: number, location: number, bit: any): number {
    return (number & ~(1 << location)) | (bit << location);
};



function imageEncode(image: HTMLImageElement,
                     stateString: string,
                     method: string): string {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);

    var imgData = ctx.getImageData(0, 0, image.width, image.height);
    var pixelColors = imgData.data;
    // console.log('default image pixelColors', pixelColors);

    let i = 0;

    let stateBits = '';

    while (i < stateString.length) {
        const binaryChar = convert.toBinary(stateString[i]);
        stateBits += binaryChar;
        i++;
    }

    const stateBitsLength = convert.numberToBinary(stateBits.length);
    stateBits = stateBitsLength + stateBits;

    for (let i = 0; i < stateBits.length; i++) {
        let encodedPixel = setBit(pixelColors[i], 0, stateBits[i]);
        // console.log('pixel value', pixelColors[i]);
        // console.log('encoded pixel', encodedPixel);
        pixelColors[i] = encodedPixel;
    }
    // console.log('encoded state pixelColors', pixelColors);

    ctx.putImageData(imgData, 0, 0);

    return canvas.toDataURL();
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
    // const shareImageEncrypted = await stateShareImage.encode(
    //                                 stateShareImage.encrypt(state, publicKey)
    //                             );
    // console.log('shareImageEncrypted', shareImageEncrypted);

    const shareImage = await stateShareImage.encode(state);
    console.log('shareImage', shareImage);

    // let newImg = new Image();
    // newImg.src = shareImage;
    // newImg.height = 100;
    // body.appendChild(newImg);
}
testEncode();


// let encodedState = stateShareImage.decode('./state.png');
// console.log('encodedState', encodedState);
