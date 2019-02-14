({
    fetchAccData : function(component){
        var action = component.get("c.getAccData");
        var filter = component.get("v.filter");
        var searchString = component.get("v.search");
            
        action.setParams({
            aPage : component.get("v.actualPage"),
            aFilter : filter,
            aSortField : component.get("v.sortedBy"),
            aOrder : component.get("v.sortedDirection"),
            aSearchString : (searchString && searchString.length > 3) ? searchString : ''
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();  
            
            if (state === "SUCCESS") {
                var mapReturned = response.getReturnValue();
                var total = parseInt(mapReturned['totalRecords']);
                total = total == 0 ? 1 : total;
                var totalPages = Math.ceil(total/filter);
                var pages = [];
                /* Cria uma lista de valores sequênciais para mostrar os botões */
                for(var i = 1; i <= totalPages ; i++){ pages.push(i); }
                
                component.set("v.pages", pages);
                component.set("v.totalPages", totalPages);
                component.set("v.data", JSON.parse(mapReturned['data']));
            }              
            else if (state === "ERROR" || state === "INCOMPLETE") {
                var errors = response.getError();
                if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error : "+ errors[0].message);
                        }
                } else {
                    console.log("Unkown Error");
                }
            }
            component.set("v.spinner",false);
        });
        component.set("v.spinner",true);
        $A.enqueueAction(action);
    },
    sortData: function (component, fieldName, sortDirection) {
        /* função padrão */
        var data = component.get("v.data");
        var reverse = sortDirection !== 'asc';
        //sorts the rows based on the column header that's clicked (ordenação padrão da datatable)
        data.sort(this.sortBy(fieldName, reverse))
        component.set("v.data", data);
    },
    sortBy: function (field, reverse, primer) {
        /* função padrão */
        var key = primer ? function(x) {return primer(x[field])} : function(x) {return x[field]};
        //checks if the two rows should switch places
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    },
    firstPageNFetchData : function(component){
        component.set("v.actualPage",1);
        this.fetchAccData(component);
    }
})