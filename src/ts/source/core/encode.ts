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
    console.log('default image pixelColors', pixelColors);

    for (let i = 0; i < stateString.length; i++) {
        const binaryChar = convert.charToBinary(stateString[i]);
        stateBits += binaryChar;
    }
    const stateBitsLength = convert.numToBinary(stateBits.length);
    stateBits = stateBitsLength + stateBits;
    console.log('stateBits', stateBits);

    for (let i = 0; i < stateBits.length; i++) {
        switch(method) {
            case 'MSB':
                // ???
                if ( i < 32) {
                    console.log('MSB');
                    // console.log(pixelColors[i]);
                    // console.log(parseInt(stateBits[i]));
                    // console.log(parseInt(stateBits[i]) + 7);
                }
                pixelColors[i] = pixelColors[i] >> parseInt(stateBits[i]);
                // pixelColors[i] = 255 - pixelColors[i] >> (parseInt(stateBits[i])+7);
                break;
            default:
                // LSB
                pixelColors[i] = pixelColors[i] ^ parseInt(stateBits[i]);
        }
    }
    console.log('encoded state pixelColors', pixelColors);

    ctx.putImageData(imgData, 0, 0);

    return canvas.toDataURL();
}
