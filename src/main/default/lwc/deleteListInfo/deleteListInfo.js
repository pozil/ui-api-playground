import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteListInfo } from 'lightning/uiListsApi';

export default class DeleteListInfo extends LightningElement {
    objectApiName = 'Account';
    listViewApiName;

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

    async handleSendRequest() {
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
        try {
            const { objectApiName, listViewApiName } = this;
            await deleteListInfo({ objectApiName, listViewApiName });
            this.dispatchEvent(
                new CustomEvent('response', {
                    detail: undefined,
                    bubbles: true
                })
            );
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'List view deleted',
                    variant: 'success'
                })
            );
        } catch (error) {
            this.dispatchEvent(
                new CustomEvent('response', {
                    detail: { error },
                    bubbles: true
                })
            );
        }
    }

    get isCallApiButtonDisabled() {
        return !(this.objectApiName && this.listViewApiName);
    }
}
