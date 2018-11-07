import {LitElement, html} from '@polymer/lit-element';



class StateShareImage extends LitElement {
    static get properties() {
        return {
        };
    }

    constructor() {
        super();
    }

    render() {
        return html`
            state-share-image
        `;
    }

}


customElements.define('state-share-image', StateShareImage);
