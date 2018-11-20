import { convert } from './convert';



/**
 * Encode the stateString into the image using the steganography method.
 *
 * @param image
 * @param stateString
 * @param method
 * @returns {string}        Base64 image data.
 */
export function stateEncode(image: HTMLImageElement,
                            stateString: string,
                            method: string): string {
    let stateBits = '';

    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    let imgData = ctx.getImageData(0, 0, image.width, image.height);
    let pixelColors = imgData.data;
    // console.log('default image pixelColors', pixelColors);

    for (let i = 0; i < stateString.length; i++) {
        const binaryChar = convert.charToBinary(stateString[i]);
        stateBits += binaryChar;
    }
    const stateBitsLength = convert.numToBinary(stateBits.length);
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


/**
 * Decode the stateString from the image using the steganography method.
 *
 * @param image
 * @param method
 * @returns {string}         State string.
 */
export function stateDecode(image: HTMLImageElement,
                            method: string): string {
    let stateString = '';

    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    let imgData = ctx.getImageData(0, 0, image.width, image.height);
    let pixelColors = imgData.data;
    console.log('default image pixelColors', pixelColors);

    // for (let i = 0; i < stateString.length; i++) {
    //     const binaryChar = convert.charToBinary(stateString[i]);
    //     stateBits += binaryChar;
    // }
    // const stateBitsLength = convert.numToBinary(stateBits.length);
    // stateBits = stateBitsLength + stateBits;
    // for (let i = 0; i < stateBits.length; i++) {
    //     let encodedPixel = setBit(pixelColors[i], 0, stateBits[i]);
    //     // console.log('pixel value', pixelColors[i]);
    //     // console.log('encoded pixel', encodedPixel);
    //     pixelColors[i] = encodedPixel;
    // }
    // // console.log('encoded state pixelColors', pixelColors);

    // ctx.putImageData(imgData, 0, 0);

    // return canvas.toDataURL();

    return stateString;
}


/**
 * Sets bit.
 *
 * @param number
 * @param location
 * @param number
 * @returns {number}
 */
function setBit(number: number, location: number, bit: any): number {
    return (number & ~(1 << location)) | (bit << location);
};
