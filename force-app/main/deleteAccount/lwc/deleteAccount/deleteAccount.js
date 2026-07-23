import { LightningElement, api } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import deleteRecord from '@salesforce/apex/AccountGridController.deleteRecord';

export default class deleteAccount extends NavigationMixin(LightningElement) {
    @api recordId;

    handleDelete() {
        if (!this.recordId) {
            this.showToast('Error', 'No record ID provided.', 'error');
            return;
        }

        deleteRecord({ recordId: this.recordId })
            .then(() => {
                this.showToast('Success', 'Record deleted successfully.', 'success');
                this.closeAction();
                // The record is gone, so send the user to the Account list view
                this[NavigationMixin.Navigate]({
                    type: 'standard__objectPage',
                    attributes: {
                        objectApiName: 'Account',
                        actionName: 'list'
                    }
                });
            })
            .catch(error => {
                this.showToast('Error', error.body?.message || 'An error occurred while deleting the record.', 'error');
                this.closeAction();
            });
    }

    handleCancel() {
        this.closeAction();
    }

    closeAction() {
        this.dispatchEvent(new CloseActionScreenEvent());
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