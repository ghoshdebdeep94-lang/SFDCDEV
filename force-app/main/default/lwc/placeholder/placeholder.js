import { LightningElement,api } from 'lwc';

export default class Placeholder extends LightningElement {
    @api message;
    logoURL='/resource/bike_assets/logo.svg';
}