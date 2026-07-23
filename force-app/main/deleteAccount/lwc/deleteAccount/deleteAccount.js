import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import deleteRecord from '@salesforce/apex/AccountGridController.deleteRecord';

export default class deleteAccount extends LightningElement {
    @api recordId;
    showConfirmation = false;

    handleDelete() {
        this.showConfirmation = true;
    }

    handleConfirmDelete() {
        if (!this.recordId) {
            this.showToast('Error', 'No record ID provided.', 'error');
            return;
        }

        deleteRecord({ recordId: this.recordId })
            .then(() => {
                this.showToast('Success', 'Record deleted successfully.', 'success');
                this.showConfirmation = false;
                // Refresh the page or navigate back
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            })
            .catch(error => {
                this.showToast('Error', error.body?.message || 'An error occurred while deleting the record.', 'error');
                this.showConfirmation = false;
            });
    }

    handleCancelDelete() {
        this.showConfirmation = false;
    }

    showToast(title, message, variant) {
        const toast = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(toast);
    }
}