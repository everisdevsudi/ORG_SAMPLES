({
    saveFilesBase : function(component){
        var action = component.get("c.insertFiles");   
        var files = JSON.stringify(component.get("v.files"));
        
        action.setParams({
            aFilesString : files
        });  
        
        action.setCallback(this, function(response) {
            var state = response.getState();  
            
            if (state === "SUCCESS") {
                this.showToast(component,"Success","","success");
            }              
            else if (state === "ERROR" || state === "INCOMPLETE") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        this.showToast(component,"Error",errors[0].message,"error");
                    }
                } else {
                    this.showToast(component,"Error","Unknown error","error");
                }
            }
            component.set("v.files", []);
            component.set("v.spinner", false);
        });
        component.set("v.spinner", true);
        $A.enqueueAction(action);
    },
    showToast : function(component,title,message,variant) {
        component.find('notifLib').showToast({
            "title": title,
            "message": message,
            "variant" : variant
        });
    }
 })