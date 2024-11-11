import { LightningElement, wire } from 'lwc';
import { getRelatedListsInfo } from 'lightning/uiRelatedListApi';

export default class GetRelatedListsInfo extends LightningElement {
    parentObjectApiName = 'Account';
    recordTypeId = '';

    parentObjectApiNameFinal;
    recordTypeIdFinal;

    @wire(getRelatedListsInfo, {
        parentObjectApiName: '$parentObjectApiNameFinal',
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
        this.recordTypeIdFinal =
            this.recordTypeId.trim() === '' ? null : this.recordTypeId;
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !this.parentObjectApiName;
    }
}
