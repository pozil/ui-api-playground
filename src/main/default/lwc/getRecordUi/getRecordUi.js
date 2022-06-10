import { LightningElement, wire } from 'lwc';
import { getRecordUi } from 'lightning/uiRecordApi';

export default class GetRecordUi extends LightningElement {
    recordIds = '001R000001RmPbSIAV';
    layoutTypes = 'Compact';
    modes = 'View';
    optionalFields;

    recordIdsFinal;
    layoutTypesFinal;
    modesFinal;
    optionalFieldsFinal;

    @wire(getRecordUi, {
        recordIds: '$recordIdsFinal',
        layoutTypes: '$layoutTypesFinal',
        modes: '$modesFinal',
        optionalFields: '$optionalFieldsFinal'
    })
    callUiApi(response) {
        this.dispatchEvent(
            new CustomEvent('response', {
                detail: response,
                bubbles: true
            })
        );
    }

    handleRecordIdsChange(event) {
        this.recordIds = event.detail.value;
    }

    handleLayoutTypeChange(event) {
        this.layoutTypes = event.detail.value;
    }

    handleModeChange(event) {
        this.modes = event.detail.value;
    }

    handleOptionalFieldChange(event) {
        this.optionalFields = event.detail.value;
    }

    handleSendRequest() {
        this.recordIdsFinal = this.recordIds;
        this.layoutTypesFinal = this.layoutTypes;
        this.modesFinal = this.modes;
        this.optionalFieldsFinal = this.optionalFields
            ?.replace(' ', '')
            .split(',');
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !(this.recordIds && this.layoutTypes && this.modes);
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
