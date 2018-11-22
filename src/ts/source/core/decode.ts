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
    // State Image
    let canvasStateImage = document.createElement('canvas');
    let ctxStateImage = canvasStateImage.getContext('2d');
    canvasStateImage.width = stateImage.width;
    canvasStateImage.height = stateImage.height;
    ctxStateImage.drawImage(stateImage, 0, 0);
    let imgDataStateImage = ctxStateImage.getImageData(0, 0, stateImage.width, stateImage.height);
    let pixelColorsStateImage = imgDataStateImage.data;
    // console.log('pixelColorsStateImage', pixelColorsStateImage);


    // Base Image
    let canvasBaseImage = document.createElement('canvas');
    let ctxBaseImage = canvasBaseImage.getContext('2d');
    canvasBaseImage.width = baseImage.width;
    canvasBaseImage.height = baseImage.height;
    ctxBaseImage.drawImage(baseImage, 0, 0);
    let imgDataBaseImage = ctxBaseImage.getImageData(0, 0, baseImage.width, baseImage.height);
    let pixelColorsBaseImage = imgDataBaseImage.data;
    // console.log('pixelColorsBaseImage', pixelColorsBaseImage);


    // Compute
    const stateStringLengthBinary = computeStateStringLengthBinary(
                                        pixelColorsStateImage,
                                        pixelColorsBaseImage,
                                        method);
    // console.log('stateStringLengthBinary', stateStringLengthBinary);
    const stateStringLength = convert.numFromBinary(stateStringLengthBinary);
    // console.log('stateStringLength', stateStringLength);
    const stateStringBinary = computeStateStringBinary(
                                        pixelColorsStateImage,
                                        pixelColorsBaseImage,
                                        stateStringLength,
                                        method);
    // console.log('stateStringBinary', stateStringBinary);
    const stateArrayBinary = computeStateArrayBinary(stateStringBinary);
    // console.log('stateArrayBinary', [stateArrayBinary]);
    const stateString = computeStateString(stateArrayBinary);
    return stateString;
}



function computeStateStringLengthBinary(
                pixelColorsStateImage: Uint8ClampedArray,
                pixelColorsBaseImage: Uint8ClampedArray,
                method: string): string {
    let stateStringLengthBinary = '';
    for (let i = 0; i < WORDSIZE; i++) {
        let char;

        switch(method) {
            case 'MSB':
                // ???
                // console.log(pixelColorsStateImage[i]);
                // console.log(pixelColorsBaseImage[i]);
                char = pixelColorsStateImage[i] ^ pixelColorsBaseImage[i];
                break;
            default:
                // LSB
                char = pixelColorsStateImage[i] ^ pixelColorsBaseImage[i];
        }

        stateStringLengthBinary += char;
    }
    return stateStringLengthBinary;
}


function computeStateStringBinary(
                pixelColorsStateImage: Uint8ClampedArray,
                pixelColorsBaseImage: Uint8ClampedArray,
                stateStringLength: number,
                method: string): string {
    let stateStringBinary = '';
    for (let i = WORDSIZE; i < stateStringLength + WORDSIZE; i++) {
        let char;

        switch(method) {
            case 'LSB':
                char = pixelColorsStateImage[i] ^ pixelColorsBaseImage[i];
                break;
            case 'MSB':
                // ???
                char = pixelColorsStateImage[i] ^ pixelColorsBaseImage[i];
                break;
        }

        stateStringBinary += char;
    }
    return stateStringBinary;
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
