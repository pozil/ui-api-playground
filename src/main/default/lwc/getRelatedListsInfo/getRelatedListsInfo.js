import { LightningElement, wire } from 'lwc';
import { getRelatedListsInfo } from 'lightning/uiRelatedListApi';

export default class GetRelatedListsInfo extends LightningElement {
    parentObjectApiName = 'Account';
    recordTypeId = '';

    parentObjectApiNameFinal;
    recordTypeIdFinal;

    @wire(getRelatedListsInfo, {
        parentObjectApiName: '$parentObjectApiNameFinal',
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

    handleRecordTypeIdChange(event) {
        this.recordTypeId = event.target.value;
    }

    handleSendRequest() {
        this.parentObjectApiNameFinal = this.parentObjectApiName;
        this.recordTypeIdFinal =
            this.recordTypeId.trim() === '' ? null : this.recordTypeId;
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !this.parentObjectApiName;
    }
}
