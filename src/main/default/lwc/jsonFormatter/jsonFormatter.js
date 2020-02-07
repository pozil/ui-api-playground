import { LightningElement, api, track } from 'lwc';

export default class JsonFormatter extends LightningElement {
    @track treeData;
    json;
    rawValue;

    @api
    set value(value) {
        this.rawValue = value;
        if (typeof value === 'string') {
            this.treeData = undefined;
        } else {
            this.treeData = this.formatObject(value);
        }
        this.json = JSON.stringify(value, null, 2);
    }

    get value() {
        return this.rawValue;
    }

    formatObject(objectData) {
        const treeData = [];
        // eslint-disable-next-line guard-for-in
        for (const key in objectData) {
            treeData.push(this.formatTreeNode(key, objectData[key]));
        }
        return treeData;
    }

    formatTreeNode(key, value) {
        const node = {
            label: key,
            name: key
        };
        if (Array.isArray(value)) {
            if (value.length === 0) {
                node.label += ' = []';
            } else {
                node.expanded = false;
                node.label += ` (${value.length} item${
                    value.length === 1 ? '' : 's'
                })`;
                node.items = this.formatObject(value);
            }
        } else if (value === null) {
            node.label += ' = null';
        } else {
            switch (typeof value) {
                case 'object':
                    node.expanded = false;
                    node.items = this.formatObject(value);
                    break;
                case 'string':
                    node.label += ` = "${value}"`;
                    break;
                default:
                    node.label += ` = ${value}`;
            }
        }
        return node;
    }
}
