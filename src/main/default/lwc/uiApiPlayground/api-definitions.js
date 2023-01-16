const API_DEFINITIONS = [
    {
        name: 'uiAppsApi',
        endpoints: [
            {
                name: 'getNavItems',
                status: 'Beta',
                description:
                    '[BETA] Retrieves the items in the navigation menu.',
                docUrlKey: 'lwc.reference_wire_adapters_get_nav_items'
            }
        ]
    },
    {
        name: 'uiListsApi',
        endpoints: [
            {
                name: 'getListInfoByName',
                description:
                    'Use this wire adapter to get the metadata for a list view.',
                docUrlKey: 'lwc.reference_get_list_info_by_name'
            },
            {
                name: 'getListInfosByName',
                description:
                    'Use this wire adapter to get the metadata for a batch of list views.',
                docUrlKey: 'lwc.reference_get_list_infos_by_name'
            }
        ]
    },
    {
        name: 'uiListApi',
        endpoints: [
            {
                name: 'getListUi',
                status: 'Deprecated',
                description:
                    "[DEPRECATED] Use this wire adapter to get the records and metadata for a list view. Leave the 'List View API Name' field empty to retrieve all list views.",
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
                name: 'getObjectInfos',
                description:
                    'Use this wire adapter to get metadata for multiple specific object. The response includes metadata describing fields, child relationships, record type, and theme for each object.',
                docUrlKey: 'lwc.reference_wire_adapters_object_infos'
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
                name: 'createRecord',
                description: 'Creates a record.',
                docUrlKey: 'lwc.reference_create_record'
            },
            {
                name: 'createRecordInputFilteredByEditedFields',
                description:
                    'Creates a RecordInput object with a list of fields that have been edited from their original values to pass in a call to updateRecord(recordInput).',
                docUrlKey: 'lwc.reference_create_record_input_update'
            },
            {
                name: 'deleteRecord',
                description: 'Deletes a record.',
                docUrlKey: 'lwc.reference_delete_record'
            },
            {
                name: 'generateRecordInputForCreate',
                description:
                    'Generates a representation of a record (Record Input) that can be used to create a record using createRecord(RecordInput). Passing in ObjectInfo filters the Record Input to only fields that are createable.',
                docUrlKey: 'lwc.reference_generate_record_input_create'
            },
            {
                name: 'generateRecordInputForUpdate',
                description:
                    'Generates a representation of a record (Record Input) that can be used to update a record using updateRecord(recordInput). Passing in ObjectInfo filters the Record Input to only fields that are updateable.',
                docUrlKey: 'lwc.reference_generate_record_input_update'
            },
            {
                name: 'getFieldValue',
                description:
                    'Gets a field’s value from a record. Spanning fields are supported.',
                docUrlKey: 'lwc.reference_get_field_value'
            },
            {
                name: 'getFieldDisplayValue',
                description:
                    'Gets the display value of a field. Spanning fields are supported.',
                docUrlKey: 'lwc.reference_get_field_display_value'
            },
            {
                name: 'getRecord',
                description: 'Use this wire adapter to get a record’s data.',
                docUrlKey: 'lwc.reference_wire_adapters_record_ui'
            },
            {
                name: 'getRecords',
                description:
                    'Gets data for a batch of records at once. You can request multiple objects or different record types.',
                docUrlKey: 'lwc.reference_wire_adapters_record_ui'
            },
            {
                name: 'getRecordCreateDefaults',
                description:
                    'Use this wire adapter to get default information and data needed to create a record.',
                docUrlKey: 'lwc.reference_wire_adapters_create_record_values'
            },
            {
                name: 'getRecordNotifyChange',
                status: 'Deprecated',
                description:
                    '[DEPRECATED] Fetch record updates for the specified record IDs and refresh the Lightning Data Service cache, providing your wires with the latest record data. Call this function to notify Lightning Data Service that a record has changed outside its mechanisms, such as via imperative Apex or Visualforce, or by calling User Interface API via a third-party framework. We recommend using notifyRecordUpdateAvailable(recordIds) instead.',
                docUrlKey: 'lwc.reference_get_record_notify'
            },
            {
                name: 'getRecordUi',
                status: 'Deprecated',
                description:
                    '[DEPRECATED] Use this wire adapter to get layout information, metadata, and data to build UI for one or more records.',
                docUrlKey: 'lwc.reference_wire_adapters_record'
            },
            {
                name: 'notifyRecordUpdateAvailable',
                description:
                    'Call this function to notify Lightning Data Service that a record has changed outside its mechanisms, such as via imperative Apex or by calling User Interface API via a third-party framework.',
                docUrlKey: 'lwc.reference_notify_record_update'
            },
            {
                name: 'updateRecord',
                description:
                    'Updates a record. Provide the record Id of the record to update in recordInput.',
                docUrlKey: 'lwc.reference_update_record'
            }
        ]
    },
    {
        name: 'uiRelatedListApi',
        endpoints: [
            {
                name: 'getRelatedListRecords',
                description: 'Returns record data for a related list.',
                docUrlKey:
                    'lwc.reference_wire_adapters_get_related_list_records'
            },
            {
                name: 'getRelatedListRecordsBatch',
                description:
                    'Returns record data for a batch of related lists.',
                docUrlKey:
                    'lwc.reference_wire_adapters_get_related_list_records_batch'
            },
            {
                name: 'getRelatedListInfo',
                description: 'Returns metadata for a related list.',
                docUrlKey: 'lwc.reference_wire_adapters_get_related_list_info'
            },
            {
                name: 'getRelatedListInfoBatch',
                description: 'Returns metadata for a batch of related lists.',
                docUrlKey:
                    'lwc.reference_wire_adapters_get_related_list_info_batch'
            },
            {
                name: 'getRelatedListsInfo',
                description: 'Returns metadata for multiple related lists.',
                docUrlKey: 'lwc.reference_wire_adapters_get_related_lists_info'
            },
            {
                name: 'getRelatedListCount',
                description: 'Returns the record count for a related list.',
                docUrlKey: 'lwc.reference_wire_adapters_get_related_list_count'
            }
        ]
    }
];

// Add fullname to endpoints
const FULL_API_DEFINITIONS = API_DEFINITIONS.map((category) => {
    category.endpoints = category.endpoints.map((endpoint) => {
        let categoryName = category.name;
        if (categoryName.indexOf(' ') !== -1) {
            categoryName = categoryName.substring(0, categoryName.indexOf(' '));
        }
        endpoint.fullname = `${categoryName}.${endpoint.name}`;
        return endpoint;
    });
    return category;
});

export default FULL_API_DEFINITIONS;
