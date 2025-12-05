export const SMART_LIST_IDS = {
    ALL: 'all',
    TODAY: 'today'
};

export interface SmartListConfig {
    id: string,
    label: string
}

export const SMART_LISTS: SmartListConfig[] = [
    {
        id: SMART_LIST_IDS.ALL,
        label: 'All Tasks',
    },
    {
        id: SMART_LIST_IDS.TODAY,
        label: 'Today',
    }
];