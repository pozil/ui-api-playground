import { LightningElement } from 'lwc';
import { createRecordInputFilteredByEditedFields } from 'lightning/uiRecordApi';

const SAMPLE_RECORD = {
    apiName: 'Account',
    fields: {
        Name: 'Sample account'
    }
};

export default class CreateRecordInputFilteredByEditedFields extends LightningElement {
    recordInput = JSON.stringify(SAMPLE_RECORD, null, 4);
    originalRecord = JSON.stringify(SAMPLE_RECORD, null, 4);

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

    handleSendRequest() {
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
        const recordInput = JSON.parse(this.recordInput);
        const originalRecord = JSON.parse(this.originalRecord);
        const filteredRecord = createRecordInputFilteredByEditedFields(
            recordInput,
            originalRecord
        );
        this.dispatchEvent(
            new CustomEvent('response', {
                detail: filteredRecord,
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
        return !(this.recordInput && this.originalRecord && this.isValidJson);
    }
}
