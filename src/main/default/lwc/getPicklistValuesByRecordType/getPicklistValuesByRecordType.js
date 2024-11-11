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

    handleChange(event) {
        const element = event.target;
        if (event.detail) {
            // Dropdown
            this[element.name] = event.detail.value;
        } else {
            // Other inputs
            this[element.name] = element.value;
        }
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
