import { LightningElement } from 'lwc';
import API_DEFINITIONS from './api-definitions.js';

export default class UiApiPlayground extends LightningElement {
    selectedEndpoint;

    handleMenuSelect(event) {
        const { value } = event.detail;
        const endpointElement = this.template.querySelector('c-api-endpoint');
        if (endpointElement) {
            endpointElement.reset();
        }
        this.selectedEndpoint = API_DEFINITIONS.reduce(
            (accumulator, category) => accumulator.concat(category.endpoints),
            []
        ).find((item) => item.name === value);
    }

    get apiDefinitions() {
        return API_DEFINITIONS;
    }
    get isGetListUi() {
        return this.selectedEndpoint.name === 'getListUi';
    }
    get isGetListInfoByName() {
        return this.selectedEndpoint.name === 'getListInfoByName';
    }
    get isGetObjectInfo() {
        return this.selectedEndpoint.name === 'getObjectInfo';
    }
    get isGetObjectInfos() {
        return this.selectedEndpoint.name === 'getObjectInfos';
    }
    get isGetPicklistValues() {
        return this.selectedEndpoint.name === 'getPicklistValues';
    }
    get isGetPicklistValuesByRecordType() {
        return this.selectedEndpoint.name === 'getPicklistValuesByRecordType';
    }
    get isCreateRecord() {
        return this.selectedEndpoint.name === 'createRecord';
    }
    get isCreateRecordInputFilteredByEditedFields() {
        return (
            this.selectedEndpoint.name ===
            'createRecordInputFilteredByEditedFields'
        );
    }
    get isDeleteRecord() {
        return this.selectedEndpoint.name === 'deleteRecord';
    }
    get isGenerateRecordInputForCreate() {
        return this.selectedEndpoint.name === 'generateRecordInputForCreate';
    }
    get isGenerateRecordInputForUpdate() {
        return this.selectedEndpoint.name === 'generateRecordInputForUpdate';
    }
    get isGetFieldValue() {
        return this.selectedEndpoint.name === 'getFieldValue';
    }
    get isGetFieldDisplayValue() {
        return this.selectedEndpoint.name === 'getFieldDisplayValue';
    }
    get isGetRecord() {
        return this.selectedEndpoint.name === 'getRecord';
    }
    get isGetRecordCreateDefaults() {
        return this.selectedEndpoint.name === 'getRecordCreateDefaults';
    }
    get isGetRecordNotifyChange() {
        return this.selectedEndpoint.name === 'getRecordNotifyChange';
    }
    get isGetRecordUi() {
        return this.selectedEndpoint.name === 'getRecordUi';
    }
    get isUpdateRecord() {
        return this.selectedEndpoint.name === 'updateRecord';
    }
    get isGetNavItems() {
        return this.selectedEndpoint.name === 'getNavItems';
    }
    get isGetRelatedListRecords() {
        return this.selectedEndpoint.name === 'getRelatedListRecords';
    }
    get isGetRelatedListInfo() {
        return this.selectedEndpoint.name === 'getRelatedListInfo';
    }
    get isGetRelatedListsInfo() {
        return this.selectedEndpoint.name === 'getRelatedListsInfo';
    }
    get isGetRelatedListCount() {
        return this.selectedEndpoint.name === 'getRelatedListCount';
    }
}
