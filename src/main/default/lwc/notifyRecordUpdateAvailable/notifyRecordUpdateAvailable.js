import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';

export default class NotifyRecordUpdateAvailable extends LightningElement {
    recordIds = '0010u000005dp2dAAA';

    handleRecordIdsChange(event) {
        this.recordIds = event.target.value;
    }

    async handleSendRequest() {
        const recordIds = this.recordIds?.replace(' ', '').split(',');
        if (!recordIds) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message:
                        'Could not build a list of record IDs based on your input.',
                    variant: 'error'
                })
            );
            return;
        }

        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));

        try {
            await notifyRecordUpdateAvailable(recordIds);
            this.dispatchEvent(
                new CustomEvent('response', {
                    detail: undefined,
                    bubbles: true
                })
            );
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record update notified.',
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
        return !this.recordIds;
    }
}
