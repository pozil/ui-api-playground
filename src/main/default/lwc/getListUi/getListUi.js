import { LightningElement, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';

export default class GetListUi extends LightningElement {
    objectApiName = 'Account';
    listViewApiName = 'AllAccounts';
    objectApiNameFinal;
    listViewApiNameFinal;

    @wire(getListUi, {
        objectApiName: '$objectApiNameFinal',
        listViewApiName: '$listViewApiNameFinal'
    })
    callUiApi(response) {
        this.dispatchEvent(
            new CustomEvent('response', {
                detail: response,
                bubbles: true
            })
        );
    }

    handleObjectApiNameChange(event) {
        this.objectApiName = event.target.value;
    }

    handleListViewApiNameChange(event) {
        this.listViewApiName = event.target.value;
    }

    handleSendRequest() {
        this.objectApiNameFinal = this.objectApiName;
        this.listViewApiNameFinal = this.listViewApiName;
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !this.objectApiName;
    }
}
