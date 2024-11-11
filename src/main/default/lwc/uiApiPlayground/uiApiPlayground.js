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
        return API_DEFINITIONS.map((apiCategory) => {
            const cat = apiCategory;
            cat.endpoints = cat.endpoints.map((apiEndpoint) => {
                const e = apiEndpoint;
                e.label = e.status ? `${e.name} (${e.status})` : e.name;
                return e;
            });
            return cat;
        });
    }

    get isCreateListInfo() {
        return this.selectedEndpoint.name === 'createListInfo';
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
    get isDeleteListInfo() {
        return this.selectedEndpoint.name === 'deleteListInfo';
    }
    get isGenerateRecordInputForCreate() {
        return this.selectedEndpoint.name === 'generateRecordInputForCreate';
    }
    get isGenerateRecordInputForUpdate() {
        return this.selectedEndpoint.name === 'generateRecordInputForUpdate';
    }
    get isGetFieldDisplayValue() {
        return this.selectedEndpoint.name === 'getFieldDisplayValue';
    }
    get isGetFieldValue() {
        return this.selectedEndpoint.name === 'getFieldValue';
    }
    get isGetLayout() {
        return this.selectedEndpoint.name === 'getLayout';
    }
    get isGetListInfoByName() {
        return this.selectedEndpoint.name === 'getListInfoByName';
    }
    get isGetListInfosByName() {
        return this.selectedEndpoint.name === 'getListInfosByName';
    }
    get isGetListInfosByObjectName() {
        return this.selectedEndpoint.name === 'getListInfosByObjectName';
    }
    get isGetListObjectInfo() {
        return this.selectedEndpoint.name === 'getListObjectInfo';
    }
    get isGetListPreferences() {
        return this.selectedEndpoint.name === 'getListPreferences';
    }
    get isGetListRecordsByName() {
        return this.selectedEndpoint.name === 'getListRecordsByName';
    }
    get isGetListUi() {
        return this.selectedEndpoint.name === 'getListUi';
    }
    get isGetNavItems() {
        return this.selectedEndpoint.name === 'getNavItems';
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
    get isGetRecord() {
        return this.selectedEndpoint.name === 'getRecord';
    }
    get isGetRecordCreateDefaults() {
        return this.selectedEndpoint.name === 'getRecordCreateDefaults';
    }
    get isGetRecordNotifyChange() {
        return this.selectedEndpoint.name === 'getRecordNotifyChange';
    }
    get isGetRecords() {
        return this.selectedEndpoint.name === 'getRecords';
    }
    get isGetRecordUi() {
        return this.selectedEndpoint.name === 'getRecordUi';
    }
    get isGetRelatedListCount() {
        return this.selectedEndpoint.name === 'getRelatedListCount';
    }
    get isGetRelatedListInfo() {
        return this.selectedEndpoint.name === 'getRelatedListInfo';
    }
    get isGetRelatedListInfoBatch() {
        return this.selectedEndpoint.name === 'getRelatedListInfoBatch';
    }
    get isGetRelatedListRecords() {
        return this.selectedEndpoint.name === 'getRelatedListRecords';
    }
    get isGetRelatedListRecordsBatch() {
        return this.selectedEndpoint.name === 'getRelatedListRecordsBatch';
    }
    get isGetRelatedListsInfo() {
        return this.selectedEndpoint.name === 'getRelatedListsInfo';
    }
    get isNotifyRecordUpdateAvailable() {
        return this.selectedEndpoint.name === 'notifyRecordUpdateAvailable';
    }
    get isUpdateListInfoByName() {
        return this.selectedEndpoint.name === 'updateListInfoByName';
    }
    get isUpdateListPreferences() {
        return this.selectedEndpoint.name === 'updateListPreferences';
    }
    get isUpdateRecord() {
        return this.selectedEndpoint.name === 'updateRecord';
    }
}
