import { defaultBaseImage } from './defaultBaseImage';
import { convert } from './convert';



/**
 * Convert the stateObject into a base64 image based on baseImage
 *
 * @param stateObject   Application State Object
 */
function stateShareImage(stateObject: Object) {
    // to implement algorithms for mapping text-to-image
    // LSB - least significant bit
    // MSB - most significant bit
    // DFT - discrete fourier transform
    // DCT - discrete cosine transform
    // DWT - discrete wavelet transform
    // RSQ - random sequence generator
    // CM  - chaotic map
    // ECC - error correction code
    // SPIHTR - set partitioning in hierarchical tree references

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
        var colors = imgData.data;

        // console.log(colors[0]);
        // console.log(colors[1]);
        // console.log(colors[2]);
        // console.log(colors[3]);
        // console.log('-----');

        let i = 0;

        // let convertedState = ''

        while (i < stateString.length) {
            const char = convert.toBinary(stateString[i]);
            console.log(char);

            // const digit = convert.fromBinary(char);
            // convertedState += digit;
            // console.log(digit);

            i++;
        }

        // console.log('convertedState', convertedState);


        // for (let i = 0; i < colors.length; i+= 4) {
        //     colors[i] += 50;
        //     colors[i+1] += 50;
        //     colors[i+2] += 50;
        //     colors[i+3] += 50;
        //     // colors[i] = colors[i] ^ 255; // Invert Red
        //     // colors[i+1] = colors[i+1] ^ 255; // Invert Green
        //     // colors[i+2] = colors[i+2] ^ 255; // Invert Blue
        // };

        // var imgDataMod = ctx.createImageData(image.width, image.height);
        ctx.putImageData(imgData, 0, 0);

        let data = canvas.toDataURL();
        // console.log(data);

        let newImg = new Image();
        newImg.src = data;

        // let image = new Image();
        // image.src = shareImage;
        body.appendChild(newImg);

        // console.log(colors[0]);
        // console.log(colors[1]);
        // console.log(colors[2]);
        // console.log(colors[3]);
        // console.log('-----');
    };
    image.src = baseImage;

    const stateImage = image;

    return stateImage;
}



// function getImageDataURL(url) {
//     let data, canvas, ctx;
//     let img = new Image();

//     img.onload = () => {
//         canvas = document.createElement("canvas");
//         canvas.width = img.width;
//         canvas.height = img.height;

//         ctx = canvas.getContext("2d");
//         ctx.drawImage(img, 0, 0);

//         try {
//             data = canvas.toDataURL();
//             // blob = dataURIToBlob(data);
//             // console.log(data);
//         } catch(e) {
//             console.log(e);
//         }
//     };

//     img.src = url;

//     return data;
// };


// function dataURIToBlob (dataURI) {
//     var byteString = atob(dataURI.split(',')[1]);
//     var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//     var ab = [];

//     for (var i = 0; i < byteString.length; i++)
//         ab.push(byteString.charCodeAt(i));

//     return new Blob([new Uint8Array(ab)], { type: mimeString });
// };




// Exemplification

let state = {
    app: {
        theme: 'night',
        multiByteChars: 'ăîșțâ€êé☻☃⁜𩸽𠜱👦✌️'
    }
}
let shareImage = stateShareImage(state);
let body = document.body;
// let image = new Image();
// image.src = shareImage;
// body.appendChild(image);
// body.appendChild(shareImage);

// console.log('shareImage', shareImage);
