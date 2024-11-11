import { LightningElement, wire } from 'lwc';
import { getListRecordsByName } from 'lightning/uiListsApi';

export default class GetListRecordsByName extends LightningElement {
    objectApiName = 'Account';
    listViewApiName = 'AllAccounts';
    fields;
    optionalFields;
    searchTerm;
    sortBy;
    pageSize;
    where;
    pageToken;

    objectApiNameFinal;
    listViewApiNameFinal;
    fieldsFinal;
    optionalFieldsFinal;
    searchTermFinal;
    sortByFinal;
    pageSizeFinal;
    whereFinal;
    pageTokenFinal;

    @wire(getListRecordsByName, {
        objectApiName: '$objectApiNameFinal',
        listViewApiName: '$listViewApiNameFinal',
        fields: '$fieldsFinal',
        optionalFields: '$optionalFieldsFinal',
        searchTerm: '$searchTermFinal',
        sortBy: '$sortByFinal',
        pageSize: '$pageSizeFinal',
        where: '$whereFinal',
        pageToken: '$pageTokenFinal'
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
        this.objectApiNameFinal = this.objectApiName;
        this.listViewApiNameFinal = this.listViewApiName;
        this.fieldsFinal = this.fields
            ? this.fields.replace(' ', '').split(',')
            : undefined;
        this.optionalFieldsFinal = this.optionalFields
            ?.replace(' ', '')
            .split(',');
        this.searchTermFinal = this.searchTerm;
        this.sortByFinal = this.sortBy;
        this.pageSizeFinal = this.pageSize
            ? parseInt(this.pageSize, 10)
            : undefined;
        this.whereFinal = this.where;
        this.pageTokenFinal = this.pageToken
            ? parseInt(this.pageToken, 10)
            : undefined;
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !(this.objectApiName && this.listViewApiName);
    }
}
