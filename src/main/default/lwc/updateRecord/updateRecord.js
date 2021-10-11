import { LightningElement } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';

const RECORD_INPUT = JSON.stringify({ fields: { Id: '', Name: '' } }, null, 4);

export default class UpdateRecord extends LightningElement {
    recordInput = RECORD_INPUT;
    clientOptions;
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

    async handleSendRequest() {
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
        const recordInput = JSON.parse(this.recordInput);
        const clientOptions =
            this.clientOptions && this.clientOptions !== ''
                ? JSON.parse(this.clientOptions)
                : undefined;
        try {
            const response = await updateRecord(recordInput, clientOptions);
            this.dispatchEvent(
                new CustomEvent('response', {
                    detail: response,
                    bubbles: true
                })
            );
        } catch (error) {
            this.dispatchEvent(
                new CustomEvent('response', {
                    detail: { error },
                    bubbles: true
                })
            );
        }
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
        return !(this.recordInput && this.isValidJson);
    }
}
