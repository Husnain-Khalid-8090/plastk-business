/**
 ** [route_name:string] :
 **     {
 **       searchText: boolean (shows/hides the search text option in the Component on that route).
 **       searchDate: boolean (shows/hides the search by date option in the Component on that route).
 **       searchFilter: null/undefined/false/object (if provided with object it will show the filter otherwise hide the filter search option).
 **       searchFilterExample  = { [key:string|number]: filterValue }[]
 **     }
 */
export const FilterStatus = {
  dashboard: {
    searchText: true,
    searchDate: false,
    placeholderText: 'Search Transaction',
  },
  stores: {
    searchText: true,
    searchDate: false,
    placeholderText: 'Search Stores',
    searchFilter: { 0: 'All', 1: 'Active', 2: 'Pending', 3: 'Deactivated', 4: 'Closed' },
    customKey: { title: 'Store Type', name: 'store_type', options: { 0: 'All', 1: 'Online', 2: 'In Store' } },
  },
  'store-groups': {
    searchText: true,
    searchDate: false,
    placeholderText: 'Search by Store Group Name',
    searchFilter: { 0: 'All', 1: 'Active', 2: 'Not Active' },
  },
  promotions: {
    searchText: true,
    searchDate: true,
    placeholderText: 'Search Promotions',
    searchFilter: { 0: 'All', 1: 'Active', 2: 'Pending', 3: 'Completed', 4: 'Stopped' },
  },
  'store-managers': {
    searchText: true,
    searchDate: false,
    placeholderText: 'Search Store Managers',
  },
  statements: {
    searchText: false,
    searchDate: true,
  },
  'payment-history': {
    placeholderText: 'Search Payments History',
    searchText: true,
    searchDate: true,
    searchFilter: { 0: 'All', 1: 'Card Payment', 2: 'Interac Payment', 3: 'Plastk Credit' },
  },
};
