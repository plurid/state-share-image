import { defaultBaseImage } from './defaultBaseImage';



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

    console.log('baseImage', baseImage);

    const stateImage = baseImage;

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
        theme: 'night'
    }
}
let shareImage = stateShareImage(state);
let body = document.body;
let image = new Image();
image.src = shareImage;
body.appendChild(image);

// console.log('shareImage', shareImage);
