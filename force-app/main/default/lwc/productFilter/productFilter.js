import { LightningElement, wire,api} from 'lwc';
import {CurrentPageReference} from 'lightning/Navigation';
import {getPicklistValues} from 'lightning/uiObjectInfoApi';
import CATEGORY_FIELD from '@salesforce/schema/Product__c.Category__c';
import MATERIAL_FIELD from '@salesforce/schema/Product__c.Material__c';
import LEVEL_FIELD from '@salesforce/schema/Product__c.Level__c';
import {fireEvent} from 'c/pubsub';

export default class ProductFilter extends LightningElement {
    searchKey='';
    maxPrice = 10000;
    filters={
        searchKey: '',
        maxPrice:10000
    };
    @wire(CurrentPageReference) pageRef;

    @wire(getPicklistValues,{
        recordTypeId:'',
        fieldApiName:CATEGORY_FIELD
    }) categories;

    @wire(getPicklistValues,{
        recordTypeId:'',
        fieldApiName:MATERIAL_FIELD
    }) materials;

    @wire(getPicklistValues,{
        recordTypeId:'',
        fieldApiName:LEVEL_FIELD
    }) levels;

    handleSearchKeyChange(event){
        this.filters.searchKey = event.target.value;
        this.delayedFireFilterChangeEvent();
    }

    handleMaxPriceChange(event){
        this.filters.maxPrice = event.target.value;
        this.delayedFireFilterChangeEvent();
    }

    handleCheckboxChange(event){
        if(this.filters.categories){
            this.filters.categories = this.categories.data.values.map(
                item => item.value
            );
            this.filters.levels = this.categories.data.values.map(
                item => item.value
            );  
            this.filters.materials = this.categories.data.values.map(
                item => item.value
            );
            const value=event.targte.dataset.value;
            const filterArray = this.filters(event.target.dataset.filter);
            if(event.target.checked){
                if(!filterArray.includes(value)){
                    filterArray.push(value);
                }
                else{
                    this.filters[event.target.dataset.filter]=filterArray.filter(
                        item => item !== value
                    );
                }
                fireEvent(this.pageRef, 'filterChange', this.filters);
            }
        }
    }
    delayedFireFilterChangeEvent(){
        fireEvent(this.pageRef, 'filterChange', this.filters);
    }

}