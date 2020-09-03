import { LightningElement, wire } from 'lwc';
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
                this.dispatchEvent(
                    new CustomEvent('response', {
                        detail: response,
                        bubbles: true
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
