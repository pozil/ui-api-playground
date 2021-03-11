import { LightningElement, wire } from 'lwc';
import { getNavItems } from 'lightning/uiAppsApi';

export default class GetNavItems extends LightningElement {
    isSendButtonClicked = false;

    formFactor;
    navItemNames = 'standard-Account, UI_API_Playground';
    page;
    pageSize;

    formFactorFinal;
    navItemNamesFinal;
    pageFinal;
    pageSizeFinal = 33; // Hack to force the wire to be called with undefined parameter values (initial values)

    @wire(getNavItems, {
        formFactor: '$formFactorFinal',
        navItemNames: '$navItemNamesFinal',
        page: '$pageFinal',
        pageSize: '$pageSizeFinal'
    })
    callUiApi(response) {
        // Prevent from displaying API reponse on page load
        if (this.isSendButtonClicked) {
            this.dispatchEvent(
                new CustomEvent('response', {
                    detail: response,
                    bubbles: true
                })
            );
        }
    }

    handleChange(event) {
        const element = event.target;
        this[element.name] = element.value;
    }

    handleSendRequest() {
        this.isSendButtonClicked = true;
        this.formFactorFinal = this.formFactor;
        this.navItemNamesFinal = this.navItemNames
            ? this.navItemNames.replace(' ', '').split(',')
            : undefined;
        this.pageFinal = this.page ? parseInt(this.page, 10) : undefined;
        this.pageSizeFinal = this.pageSize
            ? parseInt(this.pageSize, 10)
            : undefined;
        this.dispatchEvent(new CustomEvent('request', { bubbles: true }));
    }

    handleFormFactorChange(event) {
        this.formFactor = event.detail.value;
    }

    get formFactorOptions() {
        return [
            { label: 'Large', value: 'Large' },
            { label: 'Medium', value: 'Medium' },
            { label: 'Small', value: 'Small' }
        ];
    }
}
