import { LightningElement } from 'lwc';
import { updateListPreferences } from 'lightning/uiListsApi';

export default class UpdateListPreferences extends LightningElement {
    objectApiName = 'Account';
    listViewApiName = 'AllAccounts';
    columnWidths = '{ "Name": 200 }';
    columnWrap = '{ "Name": false }';
    orderedBy = '[{ "fieldApiName": "Name", "isAscending": false }]';

    isValidJson = true;

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

        const input = {
            objectApiName: this.objectApiName,
            listViewApiName: this.listViewApiName
        };
        if (this.columnWidths) {
            input.columnWidths = JSON.parse(this.columnWidths);
        }
        if (this.columnWrap) {
            input.columnWrap = JSON.parse(this.columnWrap);
        }
        if (this.orderedBy) {
            input.orderedBy = JSON.parse(this.orderedBy);
        }
        try {
            const response = await updateListPreferences(input);
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
        return !(
            this.objectApiName &&
            this.listViewApiName &&
            this.isValidJson
        );
    }
}
