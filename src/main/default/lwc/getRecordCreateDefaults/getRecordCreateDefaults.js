import { LightningElement, wire } from 'lwc';
import { getRecordCreateDefaults } from 'lightning/uiRecordApi';

export default class GenerateRecordInputForCreate extends LightningElement {
    objectApiName = 'Account';
    objectApiNameFinal;

    @wire(getRecordCreateDefaults, {
        objectApiName: '$objectApiNameFinal'
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

    handleSendRequest() {
        this.objectApiNameFinal = this.objectApiName;
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !this.objectApiName;
    }
}
