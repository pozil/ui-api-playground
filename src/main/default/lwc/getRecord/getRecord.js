import { LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const API_VARIANT_FIELDS = 'fields';
const API_VARIANT_MODE_LAYOUT = 'modeAndLayout';

export default class GetRecordUi extends LightningElement {
    apiVariant = API_VARIANT_FIELDS;
    recordId = '001R000001RmPbSIAV';
    fields;
    layoutTypes = 'Compact';
    modes = 'View';
    optionalFields;

    recordIdFinal;
    fieldsFinal;
    layoutTypesFinal;
    modesFinal;
    optionalFieldsFinal;

    @wire(getRecord, {
        recordId: '$recordIdFinal',
        fields: '$fieldsFinal',
        optionalFields: '$optionalFieldsFinal'
    })
    callUiApiFieldsVariant(response) {
        this.dispatchEvent(
            new CustomEvent('response', {
                detail: response,
                bubbles: true
            })
        );
    }

    @wire(getRecord, {
        recordId: '$recordIdFinal',
        layoutTypes: '$layoutTypesFinal',
        modes: '$modesFinal',
        optionalFields: '$optionalFieldsFinal'
    })
    callUiApiModeAndLayoutVariant(response) {
        this.dispatchEvent(
            new CustomEvent('response', {
                detail: response,
                bubbles: true
            })
        );
    }

    handleObjectApiNameChange(event) {
        this.recordId = event.target.value;
    }

    handleApiVariantChange(event) {
        this.apiVariant = event.detail.value;
        if (this.apiVariant === API_VARIANT_FIELDS) {
            this.layoutTypesFinal = undefined;
            this.modesFinal = undefined;
        } else {
            this.fieldsFinal = undefined;
        }
    }

    handleFieldsChange(event) {
        this.fields = event.target.value;
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
        this.recordIdFinal = this.recordId;
        if (this.apiVariant === API_VARIANT_FIELDS) {
            this.fieldsFinal = this.fields;
        } else {
            this.layoutTypesFinal = this.layoutTypes;
            this.modesFinal = this.modes;
        }
        this.optionalFieldsFinal = this.optionalFields;
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        if (this.apiVariant === API_VARIANT_FIELDS) {
            return !(this.recordId && this.fields);
        }
        return !(this.recordId && this.layoutTypes && this.modes);
    }

    get apiVariantOptions() {
        return [
            { label: 'Specify fields', value: API_VARIANT_FIELDS },
            { label: 'Specify mode and layout', value: API_VARIANT_MODE_LAYOUT }
        ];
    }

    get isFieldVariant() {
        return this.apiVariant === API_VARIANT_FIELDS;
    }

    get isModeAndLayoutVariant() {
        return this.apiVariant === API_VARIANT_MODE_LAYOUT;
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
