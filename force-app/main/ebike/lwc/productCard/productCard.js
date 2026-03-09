import { LightningElement, wire} from 'lwc';
import {CurrentPageReference} from 'lightning/navigation';
import {getRecord} from 'lightning/uiRecordApi';
import {registerListerner, unregisterAllListerner} from 'c/pubsub';
import PRODUCT_OBJECT from '@salesforce/schema/Product__c';
import NAME_FIELD from '@salesforce/schema/Product__c.Name';
import LEVEL_FIELD from '@salesforce/schema/Product__c.Level__c'; 
import MATERIAL_FIELD from '@salesforce/schema/Product__c.Material__c';
import CATEGORY_FIELD from '@salesforce/schema/Product__c.Category__c';  
import PICTURE_URL_FIELD from '@salesforce/schema/Product__c.Picture_URL__c';     
import MSRP_FIELD from '@salesforce/schema/Product__c.MSRP__c';

 const fields=
    [
        NAME_FIELD,
        LEVEL_FIELD,
        MATERIAL_FIELD,
        CATEGORY_FIELD,
        PICTURE_URL_FIELD,
        MSRP_FIELD
    ];


export default class ProductCard extends LightningElement {
   recordId;
   @wire(CurrentPageReference) pageRef;
   @wire(getRecord,{recordId: '$recordId', fields})

   connectedCallBack(){
    registerListerner('productSelected', this.handleProductSelected, this);
   }

   disconnectedCallBack(){
    unregisterAllListerner(this);
   }

   handleProductSelected(productID){
    this.recordid = productID;
   }

   get noData(){
    return !this.product.error && !this.product.data;
   }

}
