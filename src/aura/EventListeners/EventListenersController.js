({
	doMouseout : function(component, event, helper) {
        var enabledMouseOut = component.get('v.enabledMouseOut');
        
        if(enabledMouseOut){
			helper.removeEvent(document, "mouseout");
            component.set('v.enabledMouseOut', false);
        }
        else{
			helper.addEvent(document, "mouseout");
            component.set('v.enabledMouseOut', true);
        }
	},
    
    doF5Press : function(component, event, helper) {
        var enabledF5Press = component.get('v.enabledF5Press');
        
        if(enabledF5Press){
			helper.removeEvent(document, "keydown");
            component.set('v.enabledF5Press', false);
        }
        else{
			helper.addEvent(document, "keydown");
            component.set('v.enabledF5Press', true);
        }
	}
})