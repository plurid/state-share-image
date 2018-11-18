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
export const stateShareImage = {
    /**
     * Encode the stateObject, nude or encrypted, into an image
     * using the default or specified steganography method,
     * based on the defaultBaseImage or on the provided, domain-specific image.
     *
     * @param stateObject     - Application State Object (nude<object> or encoded<string>)
     * @param method          - (Optional) Steganography Method. Default is 'LSB'.
     */
    encode(stateObject: object | string, method = defaultStegMethod): HTMLImageElement {
        let baseImage = '';
        let stateString = ''

        if (typeof stateObject === 'object') {
            stateString = JSON.stringify(stateObject);
        }
        if (typeof stateObject === 'string') {
            stateString = stateObject
        }

        // console.log('stateString:', stateString);

        const domainImageMetaTag = document.querySelector('meta[property="state-share-image"]');
        const domainImageSrc = domainImageMetaTag ? domainImageMetaTag.getAttribute('content') : '';

        if (domainImageSrc) {
            // const image = getImageDataURL(domainImageSrc);
        } else {
            baseImage = defaultBaseImage;
        }
        // console.log('baseImage', baseImage);

        const image = new Image();
        image.onload = function() {
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
            // console.log('stateBits', stateBits);



            // function dec2bin(dec){
            //     return (dec >>> 0).toString(2);
            // }

            for (let i = 0; i < stateBits.length; i++) {
                // let pixelBinary = dec2bin(pixelColors[i]);
                let encodedPixel = setBit(pixelColors[i], 0, stateBits[i]);
                // console.log('pixel value', pixelColors[i]);
                // console.log('encoded pixel', encodedPixel);

                pixelColors[i] = encodedPixel;
            }
            // console.log('encoded state pixelColors', pixelColors);

            ctx.putImageData(imgData, 0, 0);

            let data = canvas.toDataURL();
            let newImg = new Image();
            newImg.src = data;
            newImg.height = 100;
            body.appendChild(newImg);
        };
        image.src = baseImage;

        const stateImage = image;

        return stateImage;
    },

    /**
     * From image data get a state object if it was encoded nude
     * or an encrypted string containing the state object.
     *
     * @param imageData     - Image
     * @param method        - (Optional) Steganography Method. Default is 'LSB'.
     */
    decode(imageData: string, method = defaultStegMethod): string {
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
            console.log('image with state pixelColors', pixelColors);

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
    }
}



function setBit(number: number, location: number, bit: any): number {
    return (number & ~(1 << location)) | (bit << location);
};


// Exemplification
let body = document.body;
let state = {
    app: {
        theme: 'night',
        multiByteChars: 'ăîșțâ€êé☻☃⁜𩸽𠜱👦✌️'
    }
}
let shareImage = stateShareImage.encode(state);
// console.log('shareImage', shareImage);

let encodedState = stateShareImage.decode('./state.png');

// let newImg = new Image();
// newImg.src = './state.png';
// newImg.height = 100;
// body.appendChild(newImg);


// console.log(convert.fromBinary('0000000001000001'));
