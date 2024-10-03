import { LightningElement, api, track, wire } from 'lwc';
import getProperty from "@salesforce/apex/PropertHandler_LWC.getProperty";
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';

export default class PropertyManagement extends LightningElement {
    @api recordId;
    userId = USER_ID;
    verifiedvar;
    typevar;
    isfalse = true;
    istrue = false;
    @track propertylist = [];

    columns = [
        { label: 'Property Name', fieldName: 'Property_Name__c' },
        { label: 'Property Type', fieldName: 'Type__c' },
        { label: 'Property Location', fieldName: 'Location__c' },
        { label: "Property Link", fieldName: "Property_link__c" }
    ];

    propertyoptions = [
        { label: "Commercial", value: "Commercial" },
        { label: "Residential", value: "Residential" },
        { label: "Rental", value: "Rental" }
    ];

    @wire(getRecord, { recordId: "$userId", fields: ['User.Verified__c'] })
    recordFunction({ data, error }) {
        if (data) {
            this.verifiedvar = data.fields.Verified__c.value;
        } else {
            console.error(error);
        }
    }

    changehandler(event) {
        this.typevar = event.target.value;
    }

    handleClick() {
        const verifiedString = this.verifiedvar ? 'true' : 'false'; // Convert Boolean to String
        getProperty({ type: this.typevar, verified: verifiedString })
            .then((result) => {
                this.isfalse = true;
                if (result && result.length > 0) {
                    this.istrue = true;
                    this.propertylist = result;
                } else {
                    this.isfalse = false;
                    this.istrue = false;
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
}
