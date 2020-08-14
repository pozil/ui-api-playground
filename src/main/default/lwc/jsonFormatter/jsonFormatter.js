import { LightningElement, api, track } from 'lwc';

const TREE_GRID_COLUMNS = [
    {
        type: 'text',
        fieldName: 'label',
        label: 'Node Name',
        initialWidth: 300,
    },
    {
        type: 'text',
        fieldName: 'value',
        label: 'Node Value',
    }
];

let nextNodeId = 0;
function getNewNodeId() {
    nextNodeId++;
    return nextNodeId;
}

export default class JsonFormatter extends LightningElement {
    json;
    rawValue;
    gridData;
    gridColumns = TREE_GRID_COLUMNS;

    @api
    set value(value) {
        this.rawValue = value;
        if (typeof value === 'string') {
            this.gridData = undefined;
        } else {
            this.gridData = this.formatObject(value);
        }
        this.json = JSON.stringify(value, null, 2);
    }

    get value() {
        return this.rawValue;
    }

    formatObject(objectData) {
        const gridData = [];
        // eslint-disable-next-line guard-for-in
        for (const key in objectData) {
            gridData.push(this.formatTreeGridNode(key, objectData[key]));
        }
        return gridData;
    }

    formatTreeGridNode(key, value) {
        const node = {
            id: getNewNodeId(),
            label: key,
            value: ''
        };
        if (Array.isArray(value)) {
            if (value.length === 0) {
                node.value = '[]';
            } else {
                node.expanded = false;
                node.value = `Array(${value.length})`;
                node._children = this.formatObject(value);
            }
        } else if (value === null) {
            node.value = 'null';
        } else {
            switch (typeof value) {
                case 'object':
                    if (Object.keys(value).length === 0) {
                        node.value = '{}';
                    } else {
                        node.expanded = false;
                        node._children = this.formatObject(value);
                    }
                    break;
                case 'string':
                    node.value = `"${value}"`;
                    break;
                default:
                    node.value = `${value}`;
            }
        }
        return node;
    }
}
