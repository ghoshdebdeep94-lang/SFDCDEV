import { LightningElement, api } from "lwc";
import activeContacts from "@salesforce/apex/ContactManager.activeContacts";

export default class ActiveContactsForAccounts extends LightningElement {
  @api recordId;
  contacts = [];
  error = null;
  showContacts = false;

  handleHideContacts() {
    this.showContacts = false;
  }

  handleShowContacts() {
    activeContacts({ recordId: this.recordId, active: true })
      .then((response) => {
        this.contacts = response;
        this.showContacts = true;
      })
      .catch((error) => {
        this.error = error;
        console.log(error);
      });
  }

  handleClearError() {
    this.error = null;
  }
}
