import { LightningElement } from 'lwc';
import { generateRecordInputForUpdate } from 'lightning/uiRecordApi';

export default class GenerateRecordInputForUpdate extends LightningElement {
    record;
    objectInfo;
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
        const record = JSON.parse(this.record);
        const objectInfo =
            this.objectInfo && this.objectInfo !== ''
                ? JSON.parse(this.objectInfo)
                : undefined;
        generateRecordInputForUpdate(record, objectInfo)
            .then(response => {
                this.dispatchEvent(
                    new CustomEvent('response', {
                        detail: response,
                        bubbles: true
                    })
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new CustomEvent('response', {
                        detail: { error },
                        bubbles: true
                    })
                );
            });
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
        return !(this.record && this.isValidJson);
    }
}
