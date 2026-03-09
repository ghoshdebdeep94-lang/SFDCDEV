import { LightningElement, api, wire } from 'lwc';
import {CurrentPageReference} from 'lightning/navigation';
import getProducts from '@salesforce/apex/ProductController.getProducts';
import {registerListener, unregisterAllListener, fireEvent} from 'c/pubsub'

export default class ProductTileList extends LightningElement {

    pageNumber=1;
    pageSize;
    totalItemCount=0;
    filters={};

    @wire(CurrentPageReference) pageRef;
    @wire(getProducts, {filters:'$filters',pageNumber:'$pageNumber'}) products;

    connectedCallBack(){
        registerListener('filterChange', this.handleFilterChange, this);
    }
    handleProductSelected(event){
        fireEvent(this.pageRef, 'productSelected', event.detail);
    }
    disconnectedCallBack(){
        unregisterAllListener(this);
    }
    handleFilterChange(filters){
        this.filters={...filters};
        this.pageNumber=1;
    }
    handlePreviousPage(){
        this.pageNumber=this.pageNumber-1;
    }
    handleNextPage(){
        this.pageNumber=this.pageNumber+1;
    }
}