<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/state-share-image/master/about/identity/state-share-image-logo.png" height="200px">
</p>


<p align="center">
    <a href="https://www.npmjs.com/package/@plurid/state-share-image-html">
        <img src="https://img.shields.io/npm/v/@plurid/state-share-image-html.svg?colorB=581b38&logo=npm&style=for-the-badge" alt="Version">
    </a>
    <a href="https://github.com/plurid/state-share-image/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg?colorB=492356&style=for-the-badge" alt="License">
    </a>
</p>



# State-Share Image

HTTP(S) Application State-Sharing Using Domain-Based Steganographical-Encoded Image

Encode the `state` of an application into an image in order to be able to share it with others or store it for yourself — [demo](https://plurid.com/state-share-image/) ([video](https://youtu.be/oGJjqBZp67k)).


+ [Concept](#concept)
    + [Current State](#current-state)
    + [Proposal](#proposal)
+ [Technology](#technology)
+ [Usage](#usage)
    + [Setup](#setup)
    + [HTML `state-share-image` Element](#html-state-share-image-element)



## Concept

### Current State

In order to describe the place where we happen to be on the Internet at a certain time we use a `Uniform` `Resource` `Identifier` (`URI`), more precisely a `Uniform` `Resource` `Locator` (`URL`). The `URL` takes the form of a string of characters, for example `https://www.plurid.com`, in which we have concatenated the transfer protocol, in this case `HyperText Transfer Protocol Secure` (`HTTPS`), the domain, `plurid`, the subdomain, `www`, and the top-level domain `com`.

This string of characters, the `URL`, can be used to identify the current location for ourselves at a later time (by saving it letter-for-letter in a record, somewhat misnamed, bookmark), or we can share it with others by copy-pasting.

However, the Internet is not `like` a real-reality place, where a location (say, the marketplace of a small town) appears the same to whomever visits it. The Internet is dynamic, and even more, it is stateful. The same address (`URL`) might look entirely different from one user to another, or to the same user at a different time.

What changes the look and even the behavior of a certain `URL` is the state. The state can be a `JavaScript Object` which initializes the page when we first see it, and then changes according to our interactions. It could look like this

    const state = {
        app: {
            theme: 'night'
        }
    }

and it describes that the application (web page) is to be rendered with a `night` theme (black background; white text). Of course, the `state` could be more complicated than this, and it always is.

The issue is that by design HTTP(S) is a stateless transfer protocol. Once the user loads a page (a transfer is succesfully carried on) it doesn't know of any of the previous interactions and future interactions will never know about the present ones, even if it is the same page. To surpass this design limit various technologies have been developed, as `cookies`, `localStorage`, or `sessionStorage`.

And although the various named technologies have made the Internet way more useful by being able to carry state, a problem still lingers on: we cannot save for ourselves or share with others the current state of an application.



### Proposal

The `State-Share Image` concept proposes to encode the state of the application, the `JavaScript Object`, into an image. This image could then be saved as a `state-share image mark` (akin to bookmarks), copy-pasted to other users, and so forth.

An application could use the default base image, or it's own logo/favicon. The application will pass the nude or encrypted `state` object to the `stateShareImage.encode()` method, and retrieve the new, slightly modified image.

The image could be displayed on the URL bar (if `state-share image` is implemented at the browser level, extending or replacing the use of a favicon), or somewhere in the application.

<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/state-share-image/master/about/docs/images/fav-url-state-img.png" width="60%">
    <img src="https://raw.githubusercontent.com/plurid/state-share-image/master/about/docs/images/url-domain-based-state-img.png" width="60%">
</p>

When the new, state-containing image is received by the application, it differentiates the base image and transforms the difference from image pixel data to the `state` object. The `state` object is then used to initialize the application with the new state.



## Technology

The stringified `state` object, nude or encrypted, is converted to binary code, 32 bits per character.

The `state` object

    {
        app: {
            theme: 'night'
        }
    }

is read as the 25 characters-long string

    {"app":{"theme":"night"}}

and becomes

    00000000000000000000000001111011 00000000000000000000000000100010 00000000000000000000000001100001 00000000000000000000000001110000 00000000000000000000000001110000 00000000000000000000000000100010 00000000000000000000000000111010 00000000000000000000000001111011 00000000000000000000000000100010 00000000000000000000000001110100 00000000000000000000000001101000 00000000000000000000000001100101 00000000000000000000000001101101 00000000000000000000000001100101 00000000000000000000000000100010 00000000000000000000000000111010 00000000000000000000000000100010 00000000000000000000000001101110 00000000000000000000000001101001 00000000000000000000000001100111 00000000000000000000000001101000 00000000000000000000000001110100 00000000000000000000000000100010 00000000000000000000000001111101 00000000000000000000000001111101

(spaces added for viewing purposes)


The used image (default or domain-based) is represented as an `Uint8ClampedArray` of the channels of each pixel `[R, G, B, A, R, G, B, A, ...]` (`Red`, `Green`, `Blue`, `Alpha`).

The default base image has a resolution dependant on the length of the `state` string, allowing for unoptimized storage between 1.250 and 1.2 million `LSB`-based `state` string characters, and starts as

    [88, 27, 56, 255, 88, 27, 56, 255, ... ]


Each bit of the binary string of the `state` object is added to the binary value of each entry in the pixel's channels `Uint8ClampedArray`. The default steganographical method of addition is `LSB` (Least Significant Bit) which obtains a slightly, human-eye imperceptible modified image. Another method, specified at generation time, can be `MSB` (Most Significant Bit), and it will obtain an image deviated from the base image to a greater extent.

To decode the `state` object from the obtained `state-share image` the reverse order of operations is applied.



## Usage

### Setup

Add the `state-share-image` `script.js` and `styles.css` to the application from the `./pkg` folder (or install with `npm`).

    npm install state-share-image

and import

    import 'state-share-image';
    import 'state-share-image/pkg/styles.css';

using `Webpack` or anything else to bundle.

Define the `state` object for the application.

Define the base domain image within a `meta` tag

    <meta property="state-share-image" content="/path/to/image.png">

If no image is defined, then the default one is used, based on the `state` string length

    100 pixels × 100 pixels × 4 color channels =  40.000 bits =  1.250 state string characters ≈ 10.36 kB
    200 pixels × 200 pixels × 4 color channels = 160.000 bits =  5.000 state string characters ≈ 18.16 kB
    400 pixels × 400 pixels × 4 color channels = 640.000 bits = 20.000 state string characters ≈ 33.25 kB

If the state string length is greater than the default images, a bigger one is created:

     800 pixels ×  800 pixels × 4 color channels =  2.560.000 bits =    80.000 state string characters ≈  64.01 kB
    1600 pixels × 1600 pixels × 4 color channels = 10.240.000 bits =   320.000 state string characters ≈ 127.85 kB
    3200 pixels × 3200 pixels × 4 color channels = 40.960.000 bits = 1.280.000 state string characters ≈ 357.08 kB

or larger, if needed.

Encode the `state` object using `stateShareImage.encode(stateObject)`, get `imageData` and pass it as `src` attribute to the `state-share-image` element.

    imageData = await stateShareImage.encode(stateObject);
    stateShareImageHTMLElement.src = imageData;

For a secure state encoding and sharing process, the `state` object can be stringified and encrypted before passing it to the `stateShareImage.encode()` method.

If the state-share-image element has no `src` it uses a default one for viewing purposes.

To obtain the `state` object from an image which contains one, pass the image data to the `stateShareImage.decode()` method. If the `state` object was encrypted prior to encoding, it must be decrypted after receiving it from the method.

Listen on the window for the `stateshareimage` event and initialize the state of the application with the state obtained from decoding (and decrypting) the `event.detail` image data.

    window.addEventListener('stateshareimage', async (event) => {
        appState = await stateShareImage.decode(event.detail);
    });

Setup a state action to update the `<state-share-image>` `src` attribute after each state change.

The `encode` and `decode` methods can have a secondary, optional argument, `method: string`, specifiying the type of steganography. Currently supported methods are:

    'LSB' // Least Significant Bit - default
    'MSB' // Most Significant Bit



### HTML `state-share-image` Element

<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/state-share-image/master/about/docs/images/state-share-image-element.png" height="120px">
</p>

The `<state-share-image>` HTML element allows for easy manipulation (copy-pasting) of state images.

The element displays the current `state` image.

`ctrl/cmd` + `click` copies the state-share image to clipboard as `data:image/png;base64`.

`alt/opt` + `click` pastes from clipboard a state-share image, if previously copied.

A single click opens a contextual menu with the options to `Copy State Share Image` and `Paste State Share Image` if a state-share image was previously copied.

Browser Support: due to Chrome being the only one with `navigator.clipboard.readText()` support, for Firefox/Safari and others clicking on `Paste State Share Image` will reveal an `input` field and a `Paste` button.

When a new state is pasted in the `<state-share-image>` element a `stateshareimage` `CustomEvent()` is emitted with the image data in the `event.detail` property.
