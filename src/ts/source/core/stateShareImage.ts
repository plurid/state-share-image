import { defaultBaseImage } from './defaultBaseImage';
import { convert } from './convert';



/**
 * stateShareImage.
 *      encode  :: returns image with encoded state object;
 *      decode  :: from image gets the state object.
 *
 * Steganography methods:
 *      LSB     :: least significant bit;
 *      MSB     :: most significant bit;
 *      DFT     :: discrete fourier transform;
 *      DCT     :: discrete cosine transform;
 *      DWT     :: discrete wavelet transform;
 *      RSQ     :: random sequence generator;
 *      CM      :: chaotic map;
 *      ECC     :: error correction code;
 *      SPIHTR  :: set partitioning in hierarchical tree references.
 */
export const stateShareImage = {
    /**
     * Convert the stateObject into a base64 image based on baseImage
     *
     * @param stateObject   Application State Object
     */
    encode(stateObject: Object) {
        let baseImage = '';
        const stateString = JSON.stringify(stateObject);
        console.log('stateString', stateString);

        const domainImageMetaTag = document.querySelector('meta[property="state-share-image"]');
        const domainImageSrc = domainImageMetaTag ? domainImageMetaTag.getAttribute('content') : '';

        if (domainImageSrc) {
            // const image = getImageDataURL(domainImageSrc);
        } else {
            baseImage = defaultBaseImage;
        }
        // console.log('baseImage', baseImage);

        let image = new Image();
        image.onload = function() {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            canvas.width = image.width;
            canvas.height = image.height;

            ctx.drawImage(image, 0, 0);

            var imgData = ctx.getImageData(0, 0, image.width, image.height);
            var pixelColors = imgData.data;
            console.log(pixelColors);

            let i = 0;

            let stateBits = '';

            while (i < stateString.length) {
                const binaryChar = convert.toBinary(stateString[i]);

                stateBits += binaryChar;

                i++;
            }
            console.log(stateBits);


            var setBit = (number, location, bit) => {
                return (number & ~(1 << location)) | (bit << location);
            };

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
            console.log(pixelColors);

            ctx.putImageData(imgData, 0, 0);

            let data = canvas.toDataURL();
            let newImg = new Image();
            newImg.src = data;
            body.appendChild(newImg);
        };
        image.src = baseImage;

        const stateImage = image;

        return stateImage;
    },

    /**
     * From image data get a state object
     *
     * @param imageData
     */
    decode(imageData: String) {

    }
}



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
