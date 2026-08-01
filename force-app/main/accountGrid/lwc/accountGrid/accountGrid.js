import { LightningElement, api } from "lwc";

export default class AccountGrid extends LightningElement {
  @api data = [];

  @api columns = [];

  @api keyField = "Id";

  @api selectedRows = [];

  @api maxRowSelection;

  @api showRowNumbers = true;

  @api hideCheckboxColumn = false;

  handleRowSelection(event) {
    const selectedRows = event.detail.selectedRows;

    const selectedIds = selectedRows.map((record) => record.Id);

    this.dispatchEvent(
      new CustomEvent("selectionchange", {
        detail: {
          selectedRows,
          selectedIds
        },
        bubbles: true,
        composed: true
      })
    );
  }
}
