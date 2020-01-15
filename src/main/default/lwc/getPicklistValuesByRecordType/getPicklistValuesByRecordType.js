import { LightningElement, wire } from 'lwc';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';

export default class GetPicklistValuesByRecordType extends LightningElement {
    recordTypeId = '012000000000000AAA';
    objectApiName = 'Account';
    recordTypeIdFinal;
    objectApiNameFinal;

    @wire(getPicklistValuesByRecordType, {
        objectApiName: '$objectApiNameFinal',
        recordTypeId: '$recordTypeIdFinal'
    })
    callUiApi(response) {
        this.dispatchEvent(
            new CustomEvent('response', {
                detail: response,
                bubbles: true
            })
        );
    }

    handleObjectApiNameChange(event) {
        this.objectApiName = event.target.value;
    }

    handleRecordTypeIdChange(event) {
        this.recordTypeId = event.target.value;
    }

    handleSendRequest() {
        this.recordTypeIdFinal = this.recordTypeId;
        this.objectApiNameFinal = this.objectApiName;
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !(this.recordTypeId && this.objectApiName);
    }
}
