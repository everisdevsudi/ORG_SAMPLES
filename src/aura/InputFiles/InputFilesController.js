({
    uploadFiles : function(component,event,helper){
        var inputCmp = event.getSource().get("v.files");
        var files = component.get("v.files");
        var fr = new FileReader();
        var i = 0;
        
        fr.onload = function (readerEvt) {
            var binaryString = readerEvt.target.result;
            var filesObj = new Object(); 
            
            filesObj.lFileContent = btoa(binaryString);
            filesObj.lFileName = inputCmp[i].name;
            
            files.push(filesObj);
            i++;
        };
        
        fr.onloadend = function(){
            if( i <= inputCmp.length-1 ){
            	fr.readAsBinaryString(inputCmp[i]);
            }else{
                component.set("v.files", files);
                component.set("v.spinner", false);
            }
        };
        
        component.set("v.spinner", true);
        fr.readAsBinaryString(inputCmp[i]);
    },
    saveFiles : function(component,event,helper){
    	helper.saveFilesBase(component);
    }
})