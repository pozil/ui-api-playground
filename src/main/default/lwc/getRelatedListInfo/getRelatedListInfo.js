import { LightningElement, wire } from 'lwc';
import { getRelatedListInfo } from 'lightning/uiRelatedListApi';

export default class GetRelatedListInfo extends LightningElement {
    parentObjectApiName = 'Account';
    relatedListId = 'Contacts';
    recordTypeId = '';
    fields = '';
    optionalFields = '';
    isRestrictColumnsToLayout = true;

    parentObjectApiNameFinal;
    relatedListIdFinal;
    recordTypeIdFinal;
    fieldsFinal;
    optionalFieldsFinal;
    isRestrictColumnsToLayoutFinal;

    @wire(getRelatedListInfo, {
        parentObjectApiName: '$parentObjectApiNameFinal',
        relatedListId: '$relatedListIdFinal',
        recordTypeId: '$recordTypeIdFinal',
        fields: '$fieldsFinal',
        optionalFields: '$optionalFieldsFinal',
        isRestrictColumnsToLayout: '$isRestrictColumnsToLayoutFinal'
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

    handleRestrictColumnsToLayoutChange(event) {
        this.isRestrictColumnsToLayout = event.target.checked;
    }

    handleSendRequest() {
        this.parentObjectApiNameFinal = this.parentObjectApiName;
        this.relatedListIdFinal = this.relatedListId;
        this.recordTypeIdFinal =
            this.recordTypeId.trim() === '' ? null : this.recordTypeId;
        this.fieldsFinal = this.fields
            ? this.fields.replace(' ', '').split(',')
            : undefined;
        this.optionalFieldsFinal = this.optionalFields
            ? this.optionalFields.replace(' ', '').split(',')
            : undefined;
        this.isRestrictColumnsToLayoutFinal = this.isRestrictColumnsToLayout;
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !this.parentObjectApiName || !this.relatedListId;
    }
}
