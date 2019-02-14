({
    doInit : function(component,event,helper){
        component.set('v.columns', [
            {label: 'Opportunity name', fieldName: 'Name', type: 'text', sortable : true},
            {label: 'Amount', fieldName: 'Amount', type: 'number', sortable : true},
            {label: 'Stage name', fieldName: 'StageName', type: 'text'}
        ]);
        
        helper.fetchAccData(component);
    },
    updateColumnSorting: function (component, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        component.set("v.sortedBy", fieldName);
        component.set("v.sortedDirection", sortDirection);
        helper.sortData(component,fieldName, sortDirection);
    },
    sortApex : function(component,event,helper){
        helper.sortbyAmount(component);
    }
})