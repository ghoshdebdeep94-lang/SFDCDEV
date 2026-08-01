import { LightningElement } from "lwc";
import getContacts from "@salesforce/apex/ContactManager.getContacts";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class DynamicContactList extends LightningElement {
  numberOfRecords;
  contacts;

  handleChange(event) {
    this.numberOfRecords = event.target.value;
  }

  getContacts() {
    getContacts({ records: this.numberOfRecords })
      .then((response) => {
        this.contacts = response;

        this.dispatchEvent(
          new ShowToastEvent({
            title: "Success",
            message: "Succesfully Retrieved Records",
            variant: "success"
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
