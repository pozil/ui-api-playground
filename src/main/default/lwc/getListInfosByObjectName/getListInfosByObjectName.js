import { LightningElement, wire } from 'lwc';
import { getListInfosByObjectName } from 'lightning/uiListsApi';

export default class GetListInfosByObjectName extends LightningElement {
    objectApiName = 'Account';
    pageSize = 20;
    pageToken;
    q;
    recentListsOnly = false;

    objectApiNameFinal;
    pageSizeFinal;
    pageTokenFinal;
    qFinal;
    recentListsOnlyFinak;

    @wire(getListInfosByObjectName, {
        objectApiName: '$objectApiNameFinal',
        pageSize: '$pageSizeFinal',
        pageToken: '$pageTokenFinal',
        q: '$qFinal',
        recentListsOnly: '$recentListsOnlyFinal'
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
        this.pageSizeFinal = this.pageSize
            ? parseInt(this.pageSize, 10)
            : undefined;
        this.pageTokenFinal = this.pageToken;
        this.qFinal = this.q;
        this.recentListsOnlyFinal = this.recentListsOnly;
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        return !this.objectApiName;
    }
}
