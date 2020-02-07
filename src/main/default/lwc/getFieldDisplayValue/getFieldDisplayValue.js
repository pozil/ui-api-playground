import { LightningElement } from 'lwc';
import { getFieldDisplayValue } from 'lightning/uiRecordApi';

const SAMPLE_RECORD = {
    apiName: 'Case',
    fields: {
        ClosedDate: {
            value: '2019-09-01T13:59:00.000Z',
            displayValue: '9/1/2019 1:59 PM'
        }
    }
};

export default class GetFieldDisplayValue extends LightningElement {
    record = JSON.stringify(SAMPLE_RECORD, null, 4);
    field = 'Case.ClosedDate';
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
        const fieldValue = getFieldDisplayValue(record, this.field);
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
        textAreas.forEach(textArea => {
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
