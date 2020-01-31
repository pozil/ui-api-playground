import { LightningElement } from 'lwc';
import API_DEFINITIONS from './api-definitions.js';

export default class UiApiPlayground extends LightningElement {
    apiDefinitions = API_DEFINITIONS;
    selectedEndpoint;

    handleMenuSelect(event) {
        const { value } = event.detail;
        this.selectedEndpoint = this.apiDefinitions
            .reduce(
                (accumulator, category) =>
                    accumulator.concat(category.endpoints),
                []
            )
            .find(item => item.name === value);
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
}
