import { LightningElement, wire } from 'lwc';
import { getRelatedListInfo } from 'lightning/uiRelatedListApi';

export default class GetRelatedListInfo extends LightningElement {
    parentObjectApiName = 'Account';
    relatedListId = 'Contacts';
    recordTypeId = '';

    parentObjectApiNameFinal;
    relatedListIdFinal;
    recordTypeIdFinal;

    @wire(getRelatedListInfo, {
        parentObjectApiName: '$parentObjectApiNameFinal',
        relatedListId: '$relatedListIdFinal',
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

    handleRelatedListIdChange(event) {
        this.relatedListId = event.target.value;
    }

    handleRecordTypeIdChange(event) {
        this.recordTypeId = event.target.value;
    }

    handleSendRequest() {
        this.parentObjectApiNameFinal = this.parentObjectApiName;
        this.relatedListIdFinal = this.relatedListId;
        this.recordTypeIdFinal =
            this.recordTypeId.trim() === '' ? null : this.recordTypeId;
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !this.parentObjectApiName || !this.relatedListId;
    }
}
