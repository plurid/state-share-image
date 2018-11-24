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

    const stateStringLength = computeStateStringLength(pixelColorsStateImage.slice(0, WORDSIZE),
                                                       pixelColorsBaseImage.slice(0, WORDSIZE),
                                                       method);
    const stateStringBinary = computeStateStringBinary(pixelColorsStateImage,
                                                       pixelColorsBaseImage,
                                                       stateStringLength,
                                                       method);

    return computeStateString(stateStringBinary);
}



/**
 * Extract the pixel values from the image.
 *
 * @param image
 * @returns {Uint8ClampedArray}
 */
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


/**
 * Compute the length of the encoded state string
 * from the first WORDSIZE (32) pixels in the pixels image data.
 *
 * @param pixelColorsStateImage
 * @param pixelColorsBaseImage
 * @param method
 * @returns {number}
 */
function computeStateStringLength(pixelColorsStateImage: Uint8ClampedArray,
                                  pixelColorsBaseImage: Uint8ClampedArray,
                                  method: string): number {
    const stateStringLengthBinary = computeStateStringLengthBinary(pixelColorsStateImage,
                                        pixelColorsBaseImage,
                                        method);
    // console.log('stateStringLength', convert.numFromBinary(stateStringLengthBinary));
    return convert.numFromBinary(stateStringLengthBinary);
}


/**
 * Compute the binary value of the encoded state string length.
 *
 * @param pixelColorsStateImage
 * @param pixelColorsBaseImage
 * @param method
 * @returns {string}
 */
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


/**
 * Compute the binary of the encoded state string and
 * returns an array with each character of WORDSIZE (32) bits.
 *
 * @param pixelColorsStateImage
 * @param pixelColorsBaseImage
 * @param stateStringLength
 * @param method
 * @returns {string[]}
 */
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


/**
 * Compute characters based on the pixel values and the encoded method.
 *
 * @param pixelColorsStateImage
 * @param pixelColorsBaseImage
 * @param method
 * @returns {string}
 */
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


/**
 * Split the stateStringBinary into characters of WORDSIZE (32) bits length.
 *
 * @param stateStringBinary
 * @returns {string[]}
 */
function computeStateArrayBinary(stateStringBinary: string): string[] {
    let stateArrayBinary = [];
    for (let i = 0; i < stateStringBinary.length / WORDSIZE; i++ ) {
        const val = stateStringBinary.substring(WORDSIZE * i, WORDSIZE * (i+1));
        stateArrayBinary.push(val);
    }
    return stateArrayBinary;
}


/**
 * Converts the state string from binary to UTF-32.
 *
 * @param stateArrayBinary
 * @returns {string}
 */
function computeStateString(stateArrayBinary: string[]): string {
    let stateString = '';
    for (let i = 0; i < stateArrayBinary.length; i++) {
        stateString += convert.charFromBinary(stateArrayBinary[i]);
    }
    // console.log('stateString', stateString);
    return stateString;
}
