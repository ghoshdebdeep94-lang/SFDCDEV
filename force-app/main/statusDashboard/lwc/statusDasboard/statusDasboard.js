import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { AVAILABLE_STATUSES } from "./constants";

export default class StatusDasboard extends LightningElement {
  statusList = AVAILABLE_STATUSES;

  handleParentClick(event) {
    const message = event.detail.value;
    this.dispatchEvent(
      new ShowToastEvent({
        title: "Status Clicked",
        message: `You clicked: ${message}`,
        variant: message
      })
    );
  }
}
