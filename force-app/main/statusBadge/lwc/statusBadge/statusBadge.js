import { LightningElement, api } from 'lwc';
import { STATUS_VARIANTS } from './constants';

export default class StatusBadge extends LightningElement {
    @api status;

    handleClick() {
        const event = new CustomEvent('statusclick', {
            detail: { value: this.status }
        });
        this.dispatchEvent(event);
    }
}