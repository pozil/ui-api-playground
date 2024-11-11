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

    handleRemove() {
        this.dispatchEvent(
            new CustomEvent('remove', {
                detail: this.relatedListId,
                bubbles: true
            })
        );
    }
}
