import { LightningElement } from "lwc";

export default class ComponentParent extends LightningElement {
  itemList = ["1", "2"];
  count = 3;

  handleAdd() {
    this.itemList = [...this.itemList, this.count++];
  }

  handleSubtract() {
    this.count--;
    this.itemList = this.itemList.slice(0, -1);
  }
}
