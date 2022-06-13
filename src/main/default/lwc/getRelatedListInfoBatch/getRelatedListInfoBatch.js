import { LightningElement, wire } from 'lwc';
import { getRelatedListInfoBatch } from 'lightning/uiRelatedListApi';

export default class GetRelatedListInfoBatch extends LightningElement {
    parentObjectApiName = 'Account';
    relatedListNames = 'Contacts, Opportunities';
    recordTypeId = '';

    parentObjectApiNameFinal;
    relatedListNamesFinal;
    recordTypeIdFinal;

    @wire(getRelatedListInfoBatch, {
        parentObjectApiName: '$parentObjectApiNameFinal',
        relatedListNames: '$relatedListNamesFinal',
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

    handleParentObjectApiNameChange(event) {
        this.parentObjectApiName = event.target.value;
    }

    handlRelatedListNamesChange(event) {
        this.relatedListNames = event.target.value;
    }

    handleRecordTypeIdChange(event) {
        this.recordTypeId = event.target.value;
    }

    handleSendRequest() {
        this.parentObjectApiNameFinal = this.parentObjectApiName;
        this.relatedListNamesFinal = this.relatedListNames
            .replace(' ', '')
            .split(',');
        this.recordTypeIdFinal =
            this.recordTypeId.trim() === '' ? null : this.recordTypeId;
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !this.parentObjectApiName || !this.relatedListNames;
    }
}
