import { LightningElement, wire } from 'lwc';
import { getObjectInfos } from 'lightning/uiObjectInfoApi';

export default class GetObjectInfos extends LightningElement {
    objectApiNames = 'Account,Opportunity';
    objectApiNamesFinal;

    @wire(getObjectInfos, {
        objectApiNames: '$objectApiNamesFinal'
    })
    callUiApi(response) {
        this.dispatchEvent(
            new CustomEvent('response', {
                detail: response,
                bubbles: true
            })
        );
    }

    handleObjectApiNamesChange(event) {
        this.objectApiNames = event.target.value;
    }

    handleSendRequest() {
        this.objectApiNamesFinal = this.objectApiNames
            ?.replace(' ', '')
            .split(',');
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !this.objectApiNames;
    }
}
