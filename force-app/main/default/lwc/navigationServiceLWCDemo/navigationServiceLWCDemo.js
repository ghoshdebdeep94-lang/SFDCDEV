import { LightningElement,api } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';

export default class NavigationServiceLWCDemo extends NavigationMixin(LightningElement){
    @api recordId;

    handleView(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Account',
                actionName: 'view'
            }
        });
    }

    handleCreate(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Account',
                actionName: 'new'
            }
        });
    }

    handleEdit(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Account',
                actionName: 'edit'
            }
        });
    }
    
    handleRecentAccounts(){
        this[NavigationMixin.Navigate]({
             type: 'standard__objectPage',
             attributes:{
                objectApiName: 'Account',
                actionName: 'list'
             },
             state:{
                filterName : 'Recent'
             } 
        });
    }

    handleRelatedContacts(){
        this[NavigationMixin.Navigate]({
             type: 'standard__recordRelationshipPage',
             attributes:{
                recordId: this.recordId,
                objectApiName: 'Account',
                relationshipApiName: 'Contacts',
                actionName: 'view'
             }
        });
    }
}