import { LitElement, html } from '@polymer/lit-element';
import { defaultBaseImage100 } from '../../core/defaultBaseImage';



class StateShareImage extends LitElement {
    private fallbackPasteInputLi = html``;
    private src: string | null = '';

    static get properties() {
        return {
        };
    }

    constructor() {
        super();
        this.src = this.getAttribute('src') || defaultBaseImage100;
    }

    createRenderRoot() {
        return this;
    }


    // Commands
    toggleCommands(close?: boolean, event?: MouseEvent) {
        if (event) {
            if (event.metaKey || event.ctrlKey) {
                this.copyStateImage();
                return;
            }
            if (event.altKey) {
                this.pasteStateImage();
                return;
            }
        }

        const commands: HTMLElement | null = this.querySelector('.state-share-image-commands');
        if (close) {
            commands.style.display = 'none';
        } else if (commands.style.display === 'block') {
            commands.style.display = 'none';
        } else {
            commands.style.display = 'block';
        }
    }

    copyStateImage() {
        const stateShareImage: HTMLImageElement | null = this.querySelector('.state-share-image');
        const imageSource = stateShareImage.src;

        if ((<any>navigator).clipboard) {
            (<any>navigator).clipboard.writeText(imageSource)
                .catch( (err: Error) => {
                    console.error('Failed to copy clipboard contents: ', err);
                });
        } else {
            copyToClipboard(imageSource);
        }

        this.toggleCommands(true);
    }

    pasteStateImage() {
        if ((<any>navigator).clipboard) {
            if ((<any>navigator).clipboard.readText) {
                (<any>navigator).clipboard.readText()
                    .then( (imageData: string) => {
                        this.dispatchStateShareImageEvent(imageData);
                        this.toggleCommands(true);
                    })
                    .catch( (err: Error) => {
                        console.error('Failed to read clipboard contents: ', err);
                    });
            } else {
                this.togglePasteInput();
            }
        } else {
            this.togglePasteInput();
        }
    }


    // Image Update
    dispatchStateShareImageEvent(imageData: string) {
        const event = new CustomEvent('stateshareimage', { detail: imageData });
        window.dispatchEvent(event);
        this.updateStateShareImage(imageData);
    }

    updateStateShareImage(imageData: string) {
        this.src = imageData;
        this.requestUpdate();
    }


    // Fallback Paste State-Share image for Firefox/Safari
    togglePasteInput() {
        const inputLi: HTMLDivElement | null = this.querySelector('.state-share-image-commands-input-li');

        if (inputLi) {
            if (inputLi.style.display === 'block' || inputLi.style.display === '') {
                inputLi.style.display = 'none';
            } else {
                inputLi.style.display = 'block';
            }
        }

        if (!inputLi) {
            this.fallbackPasteInputLi = html`
                <li class="state-share-image-commands-input-li">
                    <div class="state-share-image-commands-input">
                        <input class="state-share-image-commands-input-paste">
                        <button @click=${ (e: Event) => this.pasteStateImageInput() }>
                            Paste
                        </button>
                    </div>
                </li>
            `;

            this.requestUpdate();
        }
    }

    pasteStateImageInput() {
        // Set image to input value.
        const inputPaste: HTMLInputElement | null = this.querySelector('.state-share-image-commands-input-paste');
        this.dispatchStateShareImageEvent(inputPaste.value);

        // Hide Commands.
        this.toggleCommands(true);

        // Clear and hide Paste Input.
        inputPaste.value = '';
        this.togglePasteInput();
    }


    render() {
        return html`
            <img
                class="state-share-image"
                src="${this.src}"
                @click=${ (e: MouseEvent) => this.toggleCommands(false, e) }
            >

            <div class="state-share-image-commands">
                <ul>
                    <li @click=${ (e: Event) => this.copyStateImage() }>
                        <img class="state-share-image-commands-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIvSURBVGhD7ZkxSxxRFIU3RKxTJF0gXSzEfyDapIhlgqW1QrAysuYHREyvBkzAzkZsBK1s7EwjETSohYVFQkiVQhBBdv3u26O4O7MyjrNvR7gfHN7b++7c8w7iFrMVx4lIrVYbrtfrq6yH6CSCdtEcns91hYfDwClUY2h0sP2DBnSV/DBkqFshrsH+gKVHV8oHA1bDNGDgMXrP9k2nhU8VXbIPsB/RlfLBgCPNsmHvVI4CfhuyNu8ZlfPBgFPNMgZVjgLeK/K1IHMq56NEQX6ipRYtog8cP9Mj7aGxFEHugr5/aFiPpfMYgoj/9L/So0nKEoT9DsuX26K2gM7YB9jP69EkHJb6n536hFqsZ0/lJGUPwtFgoyP0nKqcxIMUgAdJw4MUgAdJw4MUgAdJw4MUgAdJw4MUgAdJw4MUQMeCsB9SOQotQT6r3ARHmYPsqs8aqyp3HOye4rffcA7ekzpqgqPMQezVfoD9JVpHrS/KitZ3dDuE0acrNcFx5iAv0G/1dgX8l3SdBBxnC2LQ0I/s1X5U8DS+se3VVRJwlj2IQV8PjW/RDPumF2VoGwU4/8XSen4vMWMWTaLXsm8L/fcLchfM+NQYFYatqBwFLIsLwoCPmmXDtlSOAn5jsjbvA5XzwQD7ofQGPn9lGe+08JlGf9kH2C/rSvlgxhOG/GiM6w74X6B+XSk/DHmJbr77Y4LvORrVVR4OM3uR/cnX0FYEbeJn33LtfxdxHMd5JFQqVz9EQKuXFaMtAAAAAElFTkSuQmCC">
                        Copy State-Share Image
                    </li>

                    <li @click=${ (e: Event) => this.pasteStateImage() }>
                        <img class="state-share-image-commands-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHCSURBVGhD7ZkxTsNAEEVNCSUcASFabgABjhCo6JCQOAGUEWVuQAGEggPQIVGkQIISUULHFShCEcnmz/jHWiE72awXywrzpC+yO/v/zCgdSYz/QJZlS2madqEH6JOSz12p8Vm7wbBr0AsGLgW1Z2iVz9sJ5lzBkG/5yNXgzSu0TFv7wIzn+aizwSJntDUDeu5DAzR+9NCXTklwfoeOqA9eK/IWKsv4rRtol+OEgYAL9g0C/g1GSdYmr0PpMWo+0HiPAUHAP2JUgdyxHAT8HUb5A9Mt/XU4YJzkHfIuGGRcM84fmIb0Kzjf4c/JRDxPBW/G0D015nUlzKzsgfOQ4/kD0xP9Cs6nLClyZikas3rITCz5Iyb6lZImxyxFQzIZr0hPlhSZiSV/xES/IqEsKTivQ98s1wZZI8lkvCI9WVZwjr+IgOst3Pehy5rqSxZjC3DfzCJ/jS3iYotExBZxsUUiYou42CIRsUVcbJGI2CIutkhEbBEXWyQitoiLLRIRW8RlkRaZ+k/sJsSeBTITx/MHvkFubw9Y5Irj+QNTh/42scPx5gPGXu5vBWE/vU2Qb0a+Uqjsh8omJL23OY5hGMZCkCQ/C094m/En7K4AAAAASUVORK5CYII=">
                        Paste State-Share Image
                    </li>
                    ${ this.fallbackPasteInputLi }
                </ul>
            </div>
        `;
    }
}


customElements.define('state-share-image', StateShareImage);



/**
 * Slow but supported on major browsers.
 *
 * @param text   Text to be copied.
 */
function copyToClipboard(text: string) {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
};



// Test event;
window.addEventListener('stateshareimage', (event) => {
    console.log(event);
    // console.log(event.detail);

    // get imageData from event.detail
    // get stateString from stateShareImage.decode(imageData);
    // decrypt stateString - optional
    // initialize the application with the state object
});
