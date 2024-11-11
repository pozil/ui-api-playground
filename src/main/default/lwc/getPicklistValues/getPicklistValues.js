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
        this.fieldApiNameFinal = this.fieldApiName;
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !(this.recordTypeId && this.fieldApiName);
    }
}
