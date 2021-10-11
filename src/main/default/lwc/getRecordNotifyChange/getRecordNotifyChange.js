import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecordNotifyChange } from 'lightning/uiRecordApi';

export default class GetRecordNotifyChange extends LightningElement {
    recordIds = '001R000001RmPbSIAV';

    handleRecordIdsChange(event) {
        this.recordIds = event.target.value;
    }

    async handleSendRequest() {
        let recordsIds = this.recordIds?.replace(' ', '').split(',');
        if (!recordsIds) {
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
        recordsIds = recordsIds?.map((id) => ({ recordId: id }));

        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
        try {
            await getRecordNotifyChange(recordsIds);
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
