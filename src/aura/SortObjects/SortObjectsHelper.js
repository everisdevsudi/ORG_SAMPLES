({
    fetchAccData : function(component){
        var action = component.get("c.getOppData");
        
        action.setCallback(this, function(response) {
            var state = response.getState();  
            
            if (state === "SUCCESS") {
                component.set("v.data", response.getReturnValue());
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
        var data = component.get("v.data");
        var reverse = sortDirection !== 'asc';
        data.sort(this.sortBy(fieldName,reverse));
        component.set("v.data", data);
    },
    sortBy: function (field,reverse) {
        reverse = reverse ? -1 : 1;
        return function(a,b){
            return reverse * ((a[field] > b[field]) - (b[field] > a[field]));
        }
    },
    sortbyAmount : function(component){
        var action = component.get("c.getDataSorted");
        
        action.setParams({
            aData : JSON.stringify(component.get('v.data'))
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();  
            
            if (state === "SUCCESS") {
                component.set("v.data", response.getReturnValue());
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
    }
})