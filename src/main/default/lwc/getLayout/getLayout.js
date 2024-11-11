import { LightningElement, wire } from 'lwc';
import { getLayout } from 'lightning/uiLayoutApi';

export default class GetLayout extends LightningElement {
    objectApiName = 'Account';
    layoutType = 'Compact';
    mode = 'View';
    recordTypeId;
    objectApiNameFinal;
    layoutTypeFinal;
    modeFinal;
    recordTypeIdFinal;

    @wire(getLayout, {
        objectApiName: '$objectApiNameFinal',
        layoutType: '$layoutTypeFinal',
        mode: '$modeFinal',
        recordTypeId: '$recordTypeIdFinal'
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
        this.objectApiNameFinal = this.objectApiName;
        this.layoutTypeFinal = this.layoutType;
        this.modeFinal = this.mode;
        this.recordTypeIdFinal = this.recordTypeId;
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !(this.objectApiName && this.layoutType && this.mode);
    }

    get layoutTypeOptions() {
        return [
            { label: 'Compact', value: 'Compact' },
            { label: 'Full', value: 'Full' }
        ];
    }

    get modeOptions() {
        return [
            { label: 'Create', value: 'Create' },
            { label: 'Edit', value: 'Edit' },
            { label: 'View', value: 'View' }
        ];
    }
}
