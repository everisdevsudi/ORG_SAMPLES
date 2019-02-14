({
    doInit : function(component,event,helper){
        /* Definição das colunas da tabela */
        component.set('v.columns', [
            {label: 'Id', fieldName: 'Id', type: 'text'},
            {label: 'Account Name', fieldName: 'Name', type: 'text', sortable : true},/* campo pode ser ordenado */
            {label: 'Type', fieldName: 'Type', type: 'text'},
            {label: 'Phone', fieldName: 'Phone', type: 'phone'}
        ]);
        
        helper.fetchAccData(component);
    },
    updateColumnSorting: function(component, event, helper) {
        /* Função padrão utilizada para sort */
        var fieldName = event.getParam('fieldName');//identificar qual campo foi clicado
        var sortDirection = event.getParam('sortDirection');//descreve qual a direção do sort 'asc' ou 'desc'
        // assign the latest attribute with the sorted column fieldName and sorted direction
        component.set("v.sortedBy", fieldName);
        component.set("v.sortedDirection", sortDirection);
        //caso queira ordenar na busca
        helper.fetchAccData(component);
        //helper.sortData(component, fieldName, sortDirection); // ordenação padrão, feita no js
    },
    updateTable : function(component,event,helper){
        helper.firstPageNFetchData(component);
    },
    goToFirstPage : function(component,event,helper){
        helper.firstPageNFetchData(component);
    },
    goToLastPage : function(component,event,helper){
        var totalPages = component.get("v.totalPages");
        component.set("v.actualPage", totalPages);
        helper.fetchAccData(component);
    },
    goToPage : function(component,event,helper){
        var index = event.getSource().get('v.label');
        if(index != component.get("v.actualPage")) {
            component.set("v.actualPage", parseInt(index));
            helper.fetchAccData(component);
        }
    },
    searchName : function(component,event,helper){
        var searchString = component.get("v.search");
        
        if(searchString && searchString.length > 3){
            helper.firstPageNFetchData(component);
        }
    }
})