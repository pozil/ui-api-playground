import { LightningElement } from 'lwc';
import API_DEFINITIONS from './api-definitions.js';

export default class UiApiPlayground extends LightningElement {
    selectedEndpoint;

    handleMenuSelect(event) {
        const { value } = event.detail;
        this.selectedEndpoint = API_DEFINITIONS.reduce(
            (accumulator, category) => accumulator.concat(category.endpoints),
            []
        ).find(item => item.name === value);
    }

    get apiDefinitions() {
        return API_DEFINITIONS;
    }
    get isGetListUi() {
        return this.selectedEndpoint.name === 'getListUi';
    }
    get isGetObjectInfo() {
        return this.selectedEndpoint.name === 'getObjectInfo';
    }
    get isGetPicklistValues() {
        return this.selectedEndpoint.name === 'getPicklistValues';
    }
    get isGetPicklistValuesByRecordType() {
        return this.selectedEndpoint.name === 'getPicklistValuesByRecordType';
    }
    get isGetRecordCreateDefaults() {
        return this.selectedEndpoint.name === 'getRecordCreateDefaults';
    }
    get isGetRecordUi() {
        return this.selectedEndpoint.name === 'getRecordUi';
    }
}
