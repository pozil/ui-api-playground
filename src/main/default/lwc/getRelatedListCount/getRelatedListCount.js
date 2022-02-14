import { LightningElement, wire } from 'lwc';
import { getRelatedListCount } from 'lightning/uiRelatedListApi';

export default class GetRelatedListRecords extends LightningElement {
    parentRecordId = '';
    relatedListId = 'Contacts';

    parentRecordIdFinal;
    relatedListIdFinal;

    @wire(getRelatedListCount, {
        parentRecordId: '$parentRecordIdFinal',
        relatedListId: '$relatedListIdFinal'
    })
    callUiApi(response) {
        this.dispatchEvent(
            new CustomEvent('response', {
                detail: response,
                bubbles: true
            })
        );
    }

    handleParentRecordIdChange(event) {
        this.parentRecordId = event.target.value;
    }

    handleRelatedListIdChange(event) {
        this.relatedListId = event.target.value;
    }

    handleSendRequest() {
        this.parentRecordIdFinal = this.parentRecordId;
        this.relatedListIdFinal = this.relatedListId;
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !this.parentRecordId || !this.relatedListId;
    }
}
