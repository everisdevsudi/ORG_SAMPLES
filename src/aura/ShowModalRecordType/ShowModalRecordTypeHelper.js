({
    getListRTHelper : function(component, event, helper) {
        
        var action = component.get("c.getInfoRT");
        
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            if (state === "SUCCESS") {
                
                var returnStr = JSON.parse(response.getReturnValue());

                  component.set("v.chkListRtNames", returnStr);
                  component.set('v.showModal', true);
           
            } 
            else {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        $A.enqueueAction(action);
    },
    //função que mostra mensagem de erro
    showNotice: function (component, title, message, type) {
        component.find('notifLib').showNotice({
            "variant": type,
            "header": title,
            "message": message,
            closeCallback: function() {
                $A.get("e.force:closeQuickAction").fire();
            }
        });
    }
    
    
})