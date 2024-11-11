import { LightningElement } from 'lwc';
import { createListInfo } from 'lightning/uiListsApi';

export default class CreateListInfo extends LightningElement {
    objectApiName = 'Account';
    listViewApiName;
    displayColumns;
    filterLogicString;
    filteredByInfo;
    label;
    listShares;
    scope;
    visibility;

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
            listViewApiName: this.listViewApiName,
            displayColumns: this.displayColumns,
            filterLogicString: this.filterLogicString,
            label: this.label,
            visibility: this.visibility
        };
        if (this.isSharedVisibility && this.listShares) {
            input.listShares = JSON.parse(this.listShares);
        }
        if (this.filteredByInfo) {
            input.filteredByInfo = JSON.parse(this.filteredByInfo);
        }
        if (this.filteredByInfo) {
            input.scope = JSON.parse(this.scope);
        }
        try {
            const response = await createListInfo(input);
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

    get isSharedVisibility() {
        return this.visibility === 'Shared';
    }

    get visibilityOptions() {
        return [
            { label: 'Private', value: 'Private' },
            { label: 'Public', value: 'Public' },
            { label: 'Shared', value: 'Shared' }
        ];
    }
}
