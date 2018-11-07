import { defaultBaseImage } from './defaultBaseImage';



/**
 * Convert the stateObject into a base64 image based on baseImage
 *
 * @param stateObject   Application State Object
 */
function stateShareImage(stateObject: Object) {
    let baseImage = '';

    const domainImageMetaTag = document.querySelector('meta[property="state-share-image"]');
    const domainImageSrc = domainImageMetaTag ? domainImageMetaTag.getAttribute('content') : '';

    if (domainImageSrc) {
        // read domainImage from domainImageSrc
        baseImage = 'readImage';
    } else {
        baseImage = defaultBaseImage;
    }


    // console.log('baseImage', baseImage);
    // console.log('stateObject', stateObject);

    const stateImage = baseImage;
    // console.log('stateImage', stateImage);

    return stateImage;
}



// Exemplification

let state = {
    app: {
        theme: 'night'
    }
}

let shareImage = stateShareImage(state);
console.log(shareImage);
