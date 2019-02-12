({
    uploadFiles : function(component,event,helper){
        var inputCmp = event.getSource().get("v.files");
        var files = component.get("v.files");
        var fr = new FileReader();
        var i = 0;//Contador para ler mais de um arquivo

        /* Quando a leitura é completada, salva o arquivo no atributo */
        fr.onload = function (readerEvt) {
            var binaryString = readerEvt.target.result;
            var filesObj = new Object(); 
            
            filesObj.lFileContent = btoa(binaryString);//Codifica na base 64
            filesObj.lFileName = inputCmp[i].name;
            
            files.push(filesObj);
            i++;
        };
        /* função feita ao final da leitura */
        fr.onloadend = function(){
            /* Ler o próximo arquivo, se houver um */
            if( i <= inputCmp.length-1 ){
            	fr.readAsBinaryString(inputCmp[i]);
            }else{
                component.set("v.files", files);
                component.set("v.spinner", false);
            }
        };
        
        component.set("v.spinner", true);
        /* inicia a leitura do primeiro arquivo (Blob), assícronamente */
        fr.readAsBinaryString(inputCmp[i]);
    },
    saveFiles : function(component,event,helper){
    	helper.saveFilesBase(component);
    }
})