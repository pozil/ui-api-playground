import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';

export default class GetRecordUi extends LightningElement {
    recordId = '';

    handleRecordIdChange(event) {
        this.recordId = event.target.value;
    }

    handleSendRequest() {
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
        deleteRecord(this.recordId)
            .then((response) => {
                console.log(response);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record deleted',
                        variant: 'success'
                    })
                );
            })
            .catch((error) => {
                this.dispatchEvent(
                    new CustomEvent('response', {
                        detail: { error },
                        bubbles: true
                    })
                );
            });
    }

    get isCallApiButtonDisabled() {
        return !this.recordId;
    }
}
