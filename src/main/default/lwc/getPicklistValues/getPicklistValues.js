import { LightningElement, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';

export default class GetPicklistValues extends LightningElement {
    recordTypeId = '012000000000000AAA';
    fieldApiName = 'Account.Rating';
    recordTypeIdFinal;
    fieldApiNameFinal;

    @wire(getPicklistValues, {
        recordTypeId: '$recordTypeIdFinal',
        fieldApiName: '$fieldApiNameFinal'
    })
    callUiApi(response) {
        this.dispatchEvent(
            new CustomEvent('response', {
                detail: response,
                bubbles: true
            })
        );
    }

    handleRecordTypeIdChange(event) {
        this.recordTypeId = event.target.value;
    }

    handleFieldApiNameChange(event) {
        this.fieldApiName = event.target.value;
    }

    handleSendRequest() {
        this.recordTypeIdFinal = this.recordTypeId;
        this.fieldApiNameFinal = this.fieldApiName;
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !(this.recordTypeId && this.fieldApiName);
    }
}
