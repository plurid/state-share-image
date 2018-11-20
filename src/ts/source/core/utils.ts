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
 * @param stateImage
 * @param baseImage
 * @param method
 * @returns {string}         State string.
 */
export function stateDecode(stateImage: HTMLImageElement,
                            baseImage: HTMLImageElement,
                            method: string): string {
    let stateString = '';

    let canvasStateImage = document.createElement('canvas');
    let ctxStateImage = canvasStateImage.getContext('2d');
    canvasStateImage.width = stateImage.width;
    canvasStateImage.height = stateImage.height;
    ctxStateImage.drawImage(stateImage, 0, 0);

    let imgDataStateImage = ctxStateImage.getImageData(0, 0, stateImage.width, stateImage.height);
    let pixelColorsStateImage = imgDataStateImage.data;
    // console.log('default image pixelColorsStateImage', pixelColorsStateImage);



    let canvasBaseImage = document.createElement('canvas');
    let ctxBaseImage = canvasBaseImage.getContext('2d');
    canvasBaseImage.width = baseImage.width;
    canvasBaseImage.height = baseImage.height;
    ctxBaseImage.drawImage(baseImage, 0, 0);

    let imgDataBaseImage = ctxBaseImage.getImageData(0, 0, baseImage.width, baseImage.height);
    let pixelColorsBaseImage = imgDataBaseImage.data;
    // console.log('default image pixelColorsBaseImage', pixelColorsBaseImage);


    var messageSizeBinary = '', pos = 0;
    while (pos < 32) {
        var bit = getBit(pixelColorsStateImage[pos], 0);
        messageSizeBinary += bit;
        // console.log(bit);
        // messageSize = setBit(messageSize, pos, bit);
        pos++;
    }

    // console.log(messageSizeBinary)

    // let stateStringLengthBinary = '';

    // for (let i = 0; i < 16; i++) {
    //     let char = pixelColorsBaseImage[i] - pixelColorsStateImage[i];
    //     stateStringLengthBinary += char;
    // }

    // console.log(stateStringLengthBinary);



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


function getBit(number, location) {
    return ((number >> location) & 1);
};
