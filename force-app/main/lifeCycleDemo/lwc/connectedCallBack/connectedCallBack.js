import { LightningElement, api } from 'lwc';

export default class ConnectedCallBack extends LightningElement {
    showChild = true;

    handleClick() {
        if (this.showChild === true) {
            this.showChild = false;
        } else {
            this.showChild = true;
        }
    }

    constructor() {
        super();
        console.log('Constructor called');
    }

    connectedCallback() {
        console.log('Connected Callback called');
    }

    renderedCallback() {
        console.log('Rendered Callback called');
    }

    disconnectedCallback() {
        console.log('Disconnected Callback called');
    }

    errorCallback() {
        console.log('Error Callback called');
    }
}