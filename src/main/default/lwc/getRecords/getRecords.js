import { LightningElement, wire } from 'lwc';
import { getRecords } from 'lightning/uiRecordApi';

const API_VARIANT_FIELDS = 'fields';
const API_VARIANT_MODE_LAYOUT = 'modeAndLayout';

export default class GetRecordUi extends LightningElement {
    apiVariant = API_VARIANT_FIELDS;
    recordIds = '0010u000005dp2dAAA';
    fields;
    layoutTypes = 'Compact';
    modes = 'View';
    optionalFields;

    recordIdsFinal;
    fieldsFinal;
    layoutTypesFinal;
    modesFinal;
    optionalFieldsFinal;

    @wire(getRecords, {
        recordIds: '$recordIdsFinal',
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

    @wire(getRecords, {
        recordIds: '$recordIdsFinal',
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

    handleApiVariantChange(event) {
        this.apiVariant = event.detail.value;
        if (this.apiVariant === API_VARIANT_FIELDS) {
            this.layoutTypesFinal = undefined;
            this.modesFinal = undefined;
        } else {
            this.fieldsFinal = undefined;
        }
    }

    handleSendRequest() {
        this.recordIdsFinal = this.recordIds?.replace(' ', '').split(',');
        if (this.apiVariant === API_VARIANT_FIELDS) {
            this.fieldsFinal = this.toFieldObjects(this.fields);
        } else {
            this.layoutTypesFinal = this.layoutTypes;
            this.modesFinal = this.modes;
        }
        this.optionalFieldsFinal = this.toFieldObjects(this.optionalFields);
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    toFieldObjects(rawValue) {
        if (!rawValue) {
            return undefined;
        }
        return rawValue
            .replace(' ', '')
            .split(',')
            .map((qualifiedFieldName) => {
                const parts = qualifiedFieldName.split('.');
                if (parts.length !== 2) {
                    throw new Error(
                        `Not a qualified field name: ${qualifiedFieldName}`
                    );
                }
                return {
                    objectApiName: parts[0],
                    fieldApiName: parts[1]
                };
            });
    }

    get isCallApiButtonDisabled() {
        if (this.apiVariant === API_VARIANT_FIELDS) {
            return !(this.recordIds && this.fields);
        }
        return !(this.recordIds && this.layoutTypes && this.modes);
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
