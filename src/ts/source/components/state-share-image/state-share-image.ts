import {LitElement, html} from '@polymer/lit-element';
import { defaultBaseImage } from '../../core/defaultBaseImage';



class StateShareImage extends LitElement {
    static get properties() {
        return {
        };
    }

    constructor() {
        super();
    }

    createRenderRoot() {
        return this;
    }


    toggleCommands(event?) {
        console.log('toggleCommands');
        // console.log(event);

        const commands: HTMLElement = this.querySelector('.state-share-image-commands');
        if (commands.style.display === 'block') {
            commands.style.display = 'none';
        } else {
            commands.style.display = 'block';
        }
    }

    copyStateImage() {
        console.log('copyStateImage');

        this.toggleCommands();
    }

    pasteStateImage() {
        console.log('pasteStateImage');

        this.toggleCommands();
    }


    render() {
        return html`
            <img class="state-share-image" src="${defaultBaseImage}" @click=${ (e: Event) => this.toggleCommands(e) }>
            <div class="state-share-image-commands">
                <ul>
                    <li @click=${ _ => this.copyStateImage() }>
                        <img class="state-share-image-commands-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIvSURBVGhD7ZkxSxxRFIU3RKxTJF0gXSzEfyDapIhlgqW1QrAysuYHREyvBkzAzkZsBK1s7EwjETSohYVFQkiVQhBBdv3u26O4O7MyjrNvR7gfHN7b++7c8w7iFrMVx4lIrVYbrtfrq6yH6CSCdtEcns91hYfDwClUY2h0sP2DBnSV/DBkqFshrsH+gKVHV8oHA1bDNGDgMXrP9k2nhU8VXbIPsB/RlfLBgCPNsmHvVI4CfhuyNu8ZlfPBgFPNMgZVjgLeK/K1IHMq56NEQX6ipRYtog8cP9Mj7aGxFEHugr5/aFiPpfMYgoj/9L/So0nKEoT9DsuX26K2gM7YB9jP69EkHJb6n536hFqsZ0/lJGUPwtFgoyP0nKqcxIMUgAdJw4MUgAdJw4MUgAdJw4MUgAdJw4MUgAdJw4MUQMeCsB9SOQotQT6r3ARHmYPsqs8aqyp3HOye4rffcA7ekzpqgqPMQezVfoD9JVpHrS/KitZ3dDuE0acrNcFx5iAv0G/1dgX8l3SdBBxnC2LQ0I/s1X5U8DS+se3VVRJwlj2IQV8PjW/RDPumF2VoGwU4/8XSen4vMWMWTaLXsm8L/fcLchfM+NQYFYatqBwFLIsLwoCPmmXDtlSOAn5jsjbvA5XzwQD7ofQGPn9lGe+08JlGf9kH2C/rSvlgxhOG/GiM6w74X6B+XSk/DHmJbr77Y4LvORrVVR4OM3uR/cnX0FYEbeJn33LtfxdxHMd5JFQqVz9EQKuXFaMtAAAAAElFTkSuQmCC">
                        Copy State-Share Image
                    </li>

                    <li @click=${ _ => this.pasteStateImage() }>
                        <img class="state-share-image-commands-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHCSURBVGhD7ZkxTsNAEEVNCSUcASFabgABjhCo6JCQOAGUEWVuQAGEggPQIVGkQIISUULHFShCEcnmz/jHWiE72awXywrzpC+yO/v/zCgdSYz/QJZlS2madqEH6JOSz12p8Vm7wbBr0AsGLgW1Z2iVz9sJ5lzBkG/5yNXgzSu0TFv7wIzn+aizwSJntDUDeu5DAzR+9NCXTklwfoeOqA9eK/IWKsv4rRtol+OEgYAL9g0C/g1GSdYmr0PpMWo+0HiPAUHAP2JUgdyxHAT8HUb5A9Mt/XU4YJzkHfIuGGRcM84fmIb0Kzjf4c/JRDxPBW/G0D015nUlzKzsgfOQ4/kD0xP9Cs6nLClyZikas3rITCz5Iyb6lZImxyxFQzIZr0hPlhSZiSV/xES/IqEsKTivQ98s1wZZI8lkvCI9WVZwjr+IgOst3Pehy5rqSxZjC3DfzCJ/jS3iYotExBZxsUUiYou42CIRsUVcbJGI2CIutkhEbBEXWyQitoiLLRIRW8RlkRaZ+k/sJsSeBTITx/MHvkFubw9Y5Irj+QNTh/42scPx5gPGXu5vBWE/vU2Qb0a+Uqjsh8omJL23OY5hGMZCkCQ/C094m/En7K4AAAAASUVORK5CYII=">
                        Paste State-Share Image
                    </li>
                </ul>
            </div>
        `;
    }
}


customElements.define('state-share-image', StateShareImage);
