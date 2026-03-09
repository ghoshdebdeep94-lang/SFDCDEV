import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactManager.getContacts';

export default class Contacts extends LightningElement {
   
    @wire(getContacts) contacts;
}