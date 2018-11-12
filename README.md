<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/state-share-image/master/about/identity/state-share-image-logo.png" height="200px">
</p>



# State-Share Image

HTTP(S) State-Sharing Using Domain-Based Generated Image

Encode the state of an application into an image in order to be able to share or store it.


## Concept

### Current State

In order to describe the place where we happen to be on the Internet at a certain time we use a `Uniform` `Resource` `Identifier` (`URI`), more precisely a `Uniform` `Resource` `Locator` (`URL`). The `URL` takes the form of a string of characters, for example `https://www.plurid.com`, in which we have concatenated the transfer protocol, in this case `HyperText Transfer Protocol Secure` (`HTTPS`), the domain, `plurid`, the subdomain, `www`, and the top-level domain `com`.

This string of characters, the `URL`, can be used to identify the current location for ourselves at a later time (by saving it letter-for-letter in a record, somewhat misnamed, bookmark), or we can share it with others by copy-pasting.

However, the Internet is not `like` a real-reality place, where a location (say, the marketplace of a small town) appears the same to whomever visits it. The Internet is dynamic, and even more, it is stateful. The same address (`URL`) might look entirely different from one user to another, or to the same user at a different time.

What changes the look and even the behavior of a certain `URL` is the state. The state can be a `JavaScript Object` which initializes the page when we first see it, and then changes according to our interactions. It could look like this

    let state = {
        app: {
            theme: 'night'
        }
    }

and it describes that the application (web page) is to be rendered with a `night` theme (black background; white text). Of course, the `state` could be more complicated than this, and it always is.

The issue is that by design HTTP(S) is a stateless transfer protocol. Once the user loads a page (a transfer is succesfully carried on) it doesn't know of any of the previous interactions, even if it is the same page. To surpass this design limit various technologies have been developed, as `cookies`, `localStorage`, or `sessionStorage`.

And although the various named technologies have made the Internet way more useful by being able to carry state, a problem still lingers on: we cannot save for ourselves or share with others the current state of an application.



### Proposal

The `State-Share Image` concept proposes to encode the state of the application, the `JavaScript Object`, into an image. This image could then be saved as a bookmark, copy-pasted to other users, and so forth.

An application could use the default base image, or it's own logo/favicon. The application will pass the nude or encrypted `state` object to the `stateShareImage.encode()` method, and retrieve the new, slightly modified image.

The image could be displayed on the URL bar, or somewhere in the application.

<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/state-share-image/master/about/docs/images/fav-url-state-img.png" height="150px">
    <img src="https://raw.githubusercontent.com/plurid/state-share-image/master/about/docs/images/url-domain-based-state-img.png" height="150px">
</p>

When the new, state-containing image is received by the application, it differentiates the base image and transforms the difference from image to the `state` object.



### Technology

The stringified `state` object, nude or encrypted, is converted to binary code, 16 bits per character.

The `state` object

    {
        app: {
            theme: 'night'
        }
    }

is read as the 25 characters-long string

    {"app":{"theme":"night"}}

and becomes

    0000000001111011 0000000000100010 0000000001100001 0000000001110000 0000000001110000 0000000000100010 0000000000111010 0000000001111011 0000000000100010 0000000001110100 0000000001101000 0000000001100101 0000000001101101 0000000001100101 0000000000100010 0000000000111010 0000000000100010 0000000001101110 0000000001101001 0000000001100111 0000000001101000 0000000001110100 0000000000100010 0000000001111101 0000000001111101

(spaces added for viewing purposes)


The used image (default or domain-based) is represented as an `Uint8ClampedArray` of the channels of each pixel `[R, G, B, A, R, G, B, A, ...]` (`Red`, `Green`, `Blue`, `Alpha`).

The default base image has 16 million values (2000 pixels x 2000 pixels x 4 channels) and starts as

    [88, 27, 56, 255, 88, 27, 56, 255, ... ]


Each bit of the binary string of the `state` object is added to the binary value of each entry in the pixel's channels `Uint8ClampedArray`. The default steganographical method of addition is `LSB` (Least Significant Bit) which obtains a slightly, human-eye imperceptible modified image. Another method, specified at generation time, can be `MSB` (Most Significant Bit), and it will obtain an image deviated from the base image to a greater extent.

To decode the `state` object from the obtained `state-share image` the reverse order of operations is applied.



### Usage

Add the `state-share-image` script to the application (or install with `npm`).

Define the `state` object for the application.

Define the base image within a `meta` tag

    <meta property="state-share-image" content="/path/to/image.png">

If no image is defined, then the default one will be used.

Pass the `state` object to the `stateShareImage.encode()` method and then pass the returned image to the supplied `<state-share-image>` element or to another HTML element defined within the application.

For a secure state encoding and sharing process, the `state` object can be stringified and encrypted before passing it to the `stateShareImage.encode()` method.

To obtain the `state` object from an image which contains one, pass the image data to the `stateShareImage.decode()` method. If the `state` object was encrypted prior to encoding, it must be decrypted after receiving it from the method.

The `<state-share-image>` element allows for easy manipulation (copy-pasting) of state images. It displays the image, a single click copies the image to clipboard as `data:image/png;base64`, a right click opens a contextual menu with the option to `Paste State Share Image` if a state share image was previously copied.

When a new state is pasted in the `<state-share-image>` element a `stateshareimage` Event is emitted.
