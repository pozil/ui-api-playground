import { LightningElement, wire } from 'lwc';
import { getListInfoByNames } from 'lightning/uiListsApi';

export default class GetListInfoByNames extends LightningElement {
    listViewApiNames = 'Account.AllAccounts';
    listViewApiNamesFinal;

    @wire(getListInfoByNames, {
        listViewApiNames: '$listViewApiNamesFinal'
    })
    callUiApi(response) {
        this.dispatchEvent(
            new CustomEvent('response', {
                detail: response,
                bubbles: true
            })
        );
    }

    handleListViewApiNamesChange(event) {
        this.listViewApiNames = event.target.value;
    }

    handleSendRequest() {
        this.listViewApiNamesFinal = this.listViewApiNames;
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !this.objectApiName;
    }
}
