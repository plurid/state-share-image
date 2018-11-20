import { convert } from './convert';


const WORDSIZE = 32;



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
    // console.log('stateBits', [stateBits]);
    const stateBitsLength = convert.numToBinary(stateBits.length);
    // console.log('stateBitsLength', stateBitsLength);
    // console.log('stateBits Length Before', stateBits.length);
    stateBits = stateBitsLength + stateBits;
    // console.log('stateBits with Length', [stateBits]);
    // console.log('stateBits Length After', stateBits.length);

    for (let i = 0; i < stateBits.length; i++) {
        pixelColors[i] = pixelColors[i] ^ parseInt(stateBits[i]);
    }
    // console.log('encoded state pixelColors', pixelColors);
    // console.log('------------');

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

    const stateStringLengthBinary = computeStateStringLengthBinary(
                                        pixelColorsStateImage,
                                        pixelColorsBaseImage);
    // console.log('stateStringLengthBinary', stateStringLengthBinary);
    const stateStringLength = convert.numFromBinary(stateStringLengthBinary);
    // console.log('stateStringLength', stateStringLength);
    const stateStringBinary = computeStateStringBinary(
                                        pixelColorsStateImage,
                                        pixelColorsBaseImage,
                                        stateStringLength);
    // console.log('stateStringBinary', [stateStringBinary]);
    const stateArrayBinary = computeStateArrayBinary(stateStringBinary);
    // console.log('stateArrayBinary', [stateArrayBinary]);
    const stateString = computeStateString(stateArrayBinary);
    return stateString;
}



function computeStateStringLengthBinary(
                pixelColorsStateImage: Uint8ClampedArray,
                pixelColorsBaseImage: Uint8ClampedArray): string {
    let stateStringLengthBinary = '';
    for (let i = 0; i < WORDSIZE; i++) {
        let char = pixelColorsStateImage[i] ^ pixelColorsBaseImage[i];
        stateStringLengthBinary += char;
    }
    return stateStringLengthBinary;
}


function computeStateStringBinary(
                pixelColorsStateImage: Uint8ClampedArray,
                pixelColorsBaseImage: Uint8ClampedArray,
                stateStringLength: number): string {
    let stateStringBinary = ''
    for (let i = WORDSIZE; i < stateStringLength + WORDSIZE; i++) {
        let char = pixelColorsStateImage[i] ^ pixelColorsBaseImage[i];
        stateStringBinary += char;
    }
    return stateStringBinary;
}


function computeStateArrayBinary(stateStringBinary: string): Array<string> {
    let stateArrayBinary = [];
    for (let i = 0; i < stateStringBinary.length / WORDSIZE; i++ ) {
        let val = stateStringBinary.substring(WORDSIZE * i, WORDSIZE * (i+1));
        stateArrayBinary.push(val);
    }
    return stateArrayBinary;
}


function computeStateString(stateArrayBinary: Array<string>): string {
    let stateString = '';
    for (let i = 0; i < stateArrayBinary.length; i++) {
        stateString += convert.charFromBinary(stateArrayBinary[i]);
    }
    return stateString;
}
