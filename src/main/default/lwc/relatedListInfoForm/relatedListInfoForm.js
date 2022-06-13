import { LightningElement, api } from 'lwc';

export default class RelatedListInfoForm extends LightningElement {
    @api
    set listData(value) {
        this.relatedListId = value.relatedListId;
        this.fieldsString = value.fields.join(',');
    }
    get listData() {
        return {
            relatedListId: this.relatedListId,
            fields: this.fieldsString.replace(' ', '').split(',')
        };
    }

    relatedListId;
    fieldsString;

    handleRelatedListIdChange(event) {
        this.relatedListId = event.target.value;
    }

    handleFieldsChange(event) {
        this.fieldsString = event.target.value;
    }

    handleRemove() {
        this.dispatchEvent(
            new CustomEvent('remove', {
                detail: this.relatedListId,
                bubbles: true
            })
        );
    }
}
