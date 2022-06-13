import { LightningElement, track, wire } from 'lwc';
import { getRelatedListRecordsBatch } from 'lightning/uiRelatedListApi';

export default class GetRelatedListRecordsBatch extends LightningElement {
    parentRecordId = '';
    @track
    relatedListParameters = [
        {
            relatedListId: 'Contacts',
            fields: ['Contact.Name', 'Contact.Id']
        },
        {
            relatedListId: 'Opportunities',
            fields: ['Opportunity.Name', 'Opportunity.Amount']
        }
    ];

    parentRecordIdFinal;
    relatedListParametersFinal;

    @wire(getRelatedListRecordsBatch, {
        parentRecordId: '$parentRecordIdFinal',
        relatedListParameters: '$relatedListParametersFinal'
    })
    callUiApi(response) {
        this.dispatchEvent(
            new CustomEvent('response', {
                detail: response,
                bubbles: true
            })
        );
    }

    handleParentRecordIdChange(event) {
        this.parentRecordId = event.target.value;
    }

    handleRelatedListParametersChange(event) {
        this.relatedListParameters = event.target.value;
    }

    handleRemoveItem(event) {
        const id = event.detail;
        const index = this.relatedListParameters.indexOf(
            (list) => list.relatedListId === id
        );
        this.relatedListParameters.splice(index, 1);
    }

    handleAddItem(event) {
        this.relatedListParameters.push({ relatedListId: '', fields: [] });
    }

    handleSendRequest() {
        this.parentRecordIdFinal = this.parentRecordId;
        this.relatedListParametersFinal = this.relatedListParameters;
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    get isCallApiButtonDisabled() {
        let isMissingListInfo = false;
        this.relatedListParameters.forEach((list) => {
            if (list.relatedListId === '' || list.fields === '') {
                isMissingListInfo = true;
            }
        });
        return (
            !this.parentRecordId ||
            this.relatedListParameters.length === 0 ||
            isMissingListInfo
        );
    }
}
