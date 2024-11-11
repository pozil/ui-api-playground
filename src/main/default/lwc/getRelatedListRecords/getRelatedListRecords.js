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
        this.parentRecordIdFinal = this.parentRecordId;
        this.relatedListIdFinal = this.relatedListId;
        this.fieldsFinal = this.fields.split(',').map((field) => field.trim());
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !this.parentRecordId || !this.relatedListId || !this.fields;
    }
}
