import { LightningElement, wire } from 'lwc';
import { getRelatedListInfo } from 'lightning/uiRelatedListApi';

export default class GetRelatedListInfoBatch extends LightningElement {
    parentObjectApiName = 'Account';
    relatedListIds = 'Contacts, Opportunities';
    recordTypeId = '';

    parentObjectApiNameFinal;
    relatedListIdsFinal;
    recordTypeIdFinal;

    @wire(getRelatedListInfo, {
        parentObjectApiName: '$parentObjectApiNameFinal',
        relatedListIds: '$relatedListIdsFinal',
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

    handleRelatedListIdsChange(event) {
        this.relatedListIds = event.target.value;
    }

    handleRecordTypeIdChange(event) {
        this.recordTypeId = event.target.value;
    }

    handleSendRequest() {
        this.parentObjectApiNameFinal = this.parentObjectApiName;
        this.relatedListIdsFinal = this.relatedListIds
            .replace(' ', '')
            .split(',');
        this.recordTypeIdFinal =
            this.recordTypeId.trim() === '' ? null : this.recordTypeId;
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !this.parentObjectApiName || !this.relatedListIds;
    }
}
