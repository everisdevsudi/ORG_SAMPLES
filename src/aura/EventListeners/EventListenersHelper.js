({
	addEvent: function(obj, evtName) {
        var functionToExec;
        
        switch(evtName) {
            case 'mouseout':
                functionToExec = this.alertWhenLeaveHandler;
                break;
            case 'keydown':
                functionToExec = this.alertWhenF5Pressed;
                break;
        }
        
        if(obj.addEventListener){
            obj.addEventListener(evtName, functionToExec);
        }
        else if(obj.attachEvent) {
            obj.attachEvent("on" + evtName, functionToExec);
        }
    },
    
    removeEvent: function(obj, evtName) {
        var functionToExec;
        
        switch(evtName) {
            case 'mouseout':
                functionToExec = this.alertWhenLeaveHandler;
                break;
            case 'keydown':
                functionToExec = this.alertWhenF5Pressed;
                break;
        }
        
        if(obj.removeEventListener){
            obj.removeEventListener(evtName, functionToExec);
        }
        else if(obj.detachEvent) {
            obj.detachEvent("on" + evtName, functionToExec);
        }
    },
    
    alertWhenLeaveHandler: function(event){
        var from = event.relatedTarget || event.toElement;
        if(!from || from.nodeName == "HTML"){
            alert('Você está saindo da página!!!');
        }
    },
    
    alertWhenF5Pressed: function(event){
        event = event || window.event;
        
        if (event.keyCode == 116 || (event.keyCode == 82 && event.ctrlKey)) {
            var r = confirm("Você está pressionando F5!!!");
            if (r == true) {
                location.reload();
            } else {
                event.stopPropagation(); 
                event.preventDefault();
            }
        }
    }
})