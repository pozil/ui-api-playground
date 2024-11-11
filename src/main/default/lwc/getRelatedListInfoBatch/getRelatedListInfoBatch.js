import { LightningElement, wire } from 'lwc';
import { getRelatedListInfoBatch } from 'lightning/uiRelatedListApi';

export default class GetRelatedListInfoBatch extends LightningElement {
    parentObjectApiName = 'Account';
    relatedListNames = 'Contacts, Opportunities';
    recordTypeId = '';

    parentObjectApiNameFinal;
    relatedListNamesFinal;
    recordTypeIdFinal;

    @wire(getRelatedListInfoBatch, {
        parentObjectApiName: '$parentObjectApiNameFinal',
        relatedListNames: '$relatedListNamesFinal',
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
        this.parentObjectApiNameFinal = this.parentObjectApiName;
        this.relatedListNamesFinal = this.relatedListNames
            .replace(' ', '')
            .split(',');
        this.recordTypeIdFinal =
            this.recordTypeId.trim() === '' ? null : this.recordTypeId;
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !this.parentObjectApiName || !this.relatedListNames;
    }
}
