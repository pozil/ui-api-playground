const API_DEFINITIONS = [
    {
        name: 'uiListApi',
        endpoints: [
            {
                name: 'getListUi',
                description:
                    "Use this wire adapter to get the records and metadata for a list view. Leave the 'List View API Name' field empty to retrieve all list views.",
                docUrlKey: 'lwc.reference_get_list_ui'
            }
        ]
    },
    {
        name: 'uiObjectInfoApi',
        endpoints: [
            {
                name: 'getObjectInfo',
                description:
                    'Use this wire adapter to get metadata about a specific object. The response includes metadata describing fields, child relationships, record type, and theme.',
                docUrlKey: 'lwc.reference_wire_adapters_object_info'
            },
            {
                name: 'getPicklistValues',
                description:
                    'Use this wire adapter to get the picklist values for a specified field.',
                docUrlKey: 'lwc.reference_wire_adapters_picklist_values'
            },
            {
                name: 'getPicklistValuesByRecordType',
                description:
                    'Use this wire adapter to get the values for every picklist of a specified record type.',
                docUrlKey: 'lwc.reference_wire_adapters_picklist_values_record'
            }
        ]
    },
    {
        name: 'uiRecordApi',
        endpoints: [
            {
                name: 'getRecordCreateDefaults',
                description:
                    'Use this wire adapter to get default information and data needed to create a record.',
                docUrlKey: 'lwc.reference_wire_adapters_create_record_values'
            },
            {
                name: 'getRecordUi',
                description:
                    'Use this wire adapter to get layout information, metadata, and data to build UI for one or more records.',
                docUrlKey: 'lwc.reference_wire_adapters_record_ui'
            }
        ]
    }
];

// Add fullname to endpoints
const FULL_API_DEFINITIONS = API_DEFINITIONS.map(category => {
    category.endpoints = category.endpoints.map(endpoint => {
        endpoint.fullname = `${category.name}.${endpoint.name}`;
        return endpoint;
    });
    return category;
});

export default FULL_API_DEFINITIONS;
