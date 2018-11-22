import { convert } from './convert';


const WORDSIZE = 32;



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
    const pixelColorsStateImage = getPixelColors(stateImage);
    const pixelColorsBaseImage = getPixelColors(baseImage);

    const stateStringLength = computeStateStringLength(pixelColorsStateImage,
                                                       pixelColorsBaseImage,
                                                       method);
    const stateStringBinary = computeStateStringBinary(pixelColorsStateImage,
                                                       pixelColorsBaseImage,
                                                       stateStringLength,
                                                       method);
    const stateString = computeStateString(stateStringBinary);
    return stateString;
}



function getPixelColors(image: HTMLImageElement): Uint8ClampedArray {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    const imageData = context.getImageData(0, 0, image.width, image.height);
    // console.log('pixelColors', imageData.data);
    return imageData.data;
}


function computeStateStringLength(pixelColorsStateImage: Uint8ClampedArray,
                                  pixelColorsBaseImage: Uint8ClampedArray,
                                  method: string): number {
    const stateStringLengthBinary = computeStateStringLengthBinary(pixelColorsStateImage,
                                        pixelColorsBaseImage,
                                        method);
    // console.log('stateStringLength', convert.numFromBinary(stateStringLengthBinary));
    return convert.numFromBinary(stateStringLengthBinary);
}


function computeStateStringLengthBinary(pixelColorsStateImage: Uint8ClampedArray,
                                        pixelColorsBaseImage: Uint8ClampedArray,
                                        method: string): string {
    let stateStringLengthBinary = '';
    for (let i = 0; i < WORDSIZE; i++) {
        const char = computeChar(pixelColorsStateImage[i], pixelColorsBaseImage[i], method);
        stateStringLengthBinary += char;
    }
    return stateStringLengthBinary;
}


function computeStateStringBinary(pixelColorsStateImage: Uint8ClampedArray,
                                  pixelColorsBaseImage: Uint8ClampedArray,
                                  stateStringLength: number,
                                  method: string): string[] {
    let stateStringBinary = '';
    for (let i = WORDSIZE; i < stateStringLength + WORDSIZE; i++) {
        const char = computeChar(pixelColorsStateImage[i], pixelColorsBaseImage[i], method);
        stateStringBinary += char;
    }
    // console.log('stateStringBinary', computeStateArrayBinary(stateStringBinary));
    return computeStateArrayBinary(stateStringBinary);
}


function computeChar(pixelColorsStateImage: number,
                     pixelColorsBaseImage: number,
                     method: string): string {
    let char, compute;

    switch(method) {
        case 'MSB':
            compute = pixelColorsStateImage ^ pixelColorsBaseImage;
            char = compute === 7 ? '1' : '0';
            break;
        default:
            // LSB
            compute = pixelColorsStateImage ^ pixelColorsBaseImage;
            char = compute === 1 ? '1' : '0';
    }

    return char;
}


function computeStateArrayBinary(stateStringBinary: string): Array<string> {
    let stateArrayBinary = [];
    for (let i = 0; i < stateStringBinary.length / WORDSIZE; i++ ) {
        const val = stateStringBinary.substring(WORDSIZE * i, WORDSIZE * (i+1));
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
