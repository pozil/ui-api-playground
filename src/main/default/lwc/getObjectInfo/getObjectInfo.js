import { LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class GetObjectInfo extends LightningElement {
    objectApiName = 'Account';
    objectApiNameFinal;

    @wire(getObjectInfo, {
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

    handleCallApi() {
        this.objectApiNameFinal = this.objectApiName;
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !this.objectApiName;
    }
}
