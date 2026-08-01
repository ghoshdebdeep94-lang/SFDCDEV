import { LightningElement } from "lwc";

export default class ErroChild extends LightningElement {
  constructor() {
    super();
    console.log("Child constructor");
  }

  connectedCallback() {
    console.log("Child connected Callback");
  }

  renderedCallback() {
    console.log("Child rendered Callback");
  }

  disconnectedCallback() {
    console.log("Child disconnected Callback");
  }
}
