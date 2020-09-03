import { LightningElement } from 'lwc';
import { getFieldValue } from 'lightning/uiRecordApi';

const SAMPLE_RECORD = {
    apiName: 'Account',
    fields: {
        Name: 'Sample account'
    }
};

export default class GetFieldValue extends LightningElement {
    record = JSON.stringify(SAMPLE_RECORD, null, 4);
    field = 'Account.Name';
    isValidJson = true;

    handleJsonInputChange(event) {
        const { name, value } = event.target;
        this[name] = value;
        try {
            if (value && value !== '') {
                JSON.parse(value);
            }
            event.target.setCustomValidity('');
            this.checkJsonTextAreasValidity();
        } catch (error) {
            event.target.setCustomValidity('Invalid JSON');
            this.isValidJson = false;
        }
        event.target.reportValidity();
    }

    handleFieldChange(event) {
        this.field = event.target.value;
    }

    handleSendRequest() {
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
        const record = JSON.parse(this.record);
        const fieldValue = getFieldValue(record, this.field);
        this.dispatchEvent(
            new CustomEvent('response', {
                detail: fieldValue,
                bubbles: true
            })
        );
    }

    checkJsonTextAreasValidity() {
        let isValidJson = true;
        const textAreas = this.template.querySelectorAll('lightning-textarea');
        textAreas.forEach((textArea) => {
            if (!textArea.checkValidity()) {
                isValidJson = false;
            }
        });
        this.isValidJson = isValidJson;
    }

    get isCallApiButtonDisabled() {
        return !(this.record && this.field && this.isValidJson);
    }
}
