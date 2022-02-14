import { LightningElement, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class GetRelatedListRecords extends LightningElement {
    parentRecordId = '';
    relatedListId = 'Contacts';
    fields = 'Contact.Name,Contact.Id';

    parentRecordIdFinal;
    relatedListIdFinal;
    fieldsFinal;

    @wire(getRelatedListRecords, {
        parentRecordId: '$parentRecordIdFinal',
        relatedListId: '$relatedListIdFinal',
        fields: '$fieldsFinal'
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

    handleFieldsChange(event) {
        this.fields = event.target.value;
    }

    handleSendRequest() {
        this.parentRecordIdFinal = this.parentRecordId;
        this.relatedListIdFinal = this.relatedListId;
        this.fieldsFinal = this.fields.split(',').map((field) => field.trim());
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !this.parentRecordId || !this.relatedListId || !this.fields;
    }
}
