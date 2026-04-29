import { LightningElement, api } from 'lwc';

export default class ConnectedCallBack extends LightningElement {
    @api language = 'FR';
    message;

    connectedCallback() {
        this.message =
            this.language === 'FR' ? 'Bonjour' :
                this.language === 'ES' ? 'Hola' :
                    'Hello';
    }
}