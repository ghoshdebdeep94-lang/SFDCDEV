import { LightningElement, api } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import deleteRecord from '@salesforce/apex/AccountGridController.deleteRecord';

export default class deleteAccount extends NavigationMixin(LightningElement) {
    @api recordId;

    async handleDelete() {
        if (!this.recordId) {
            this.showToast('Error', 'No record ID provided.', 'error');
            return;
        }

        try {
            await deleteRecord({ recordId: this.recordId });
        } catch (error) {
            // Keep this catch around the Apex call only, so a failure in the
            // navigation below is never reported as a failed delete
            this.showToast('Error', this.getErrorMessage(error), 'error', 'sticky');
            this.closeAction();
            return;
        }

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
    }

    handleCancel() {
        this.closeAction();
    }

    closeAction() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }

    getErrorMessage(error) {
        const body = error?.body;
        // Page-level errors arrive as an array, Apex errors as a single object
        if (Array.isArray(body)) {
            return body.map(e => e.message).filter(Boolean).join(', ');
        }
        return body?.message || error?.message || 'An error occurred while deleting the record.';
    }

    showToast(title, message, variant, mode = 'dismissable') {
        const toast = new ShowToastEvent({
            title,
            message,
            variant,
            mode
        });
        this.dispatchEvent(toast);
    }
}