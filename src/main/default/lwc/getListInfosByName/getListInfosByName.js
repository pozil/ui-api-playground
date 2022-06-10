import { LightningElement, wire } from 'lwc';
import { getListInfosByName } from 'lightning/uiListsApi';

export default class GetListInfosByName extends LightningElement {
    listViewApiNames = 'Account.AllAccounts, Contact.AllContacts';
    listViewApiNamesFinal;

    @wire(getListInfosByName, {
        names: '$listViewApiNamesFinal'
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
        this.listViewApiNamesFinal = this.listViewApiNames
            .replace(' ', '')
            .split(',');
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !this.listViewApiNames;
    }
}
