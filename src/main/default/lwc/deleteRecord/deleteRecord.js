import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';

export default class GetRecordUi extends LightningElement {
    recordId = '';

    handleRecordIdChange(event) {
        this.recordId = event.target.value;
    }

    async handleSendRequest() {
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
        try {
            await deleteRecord(this.recordId);
            this.dispatchEvent(
                new CustomEvent('response', {
                    detail: undefined,
                    bubbles: true
                })
            );
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record deleted',
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
        return !this.recordId;
    }
}
