({      //Chama o Helper
    getListRTCrtl : function(component, event, helper) {
        
        helper.getListRTHelper(component, event, helper);
    },
    //Fecha o modal
    closeModal : function(component, event, helper) {
        component.set('v.showModal', false);
    },
    //Guarda o id do recordtype selecionado
    selectedRT : function(component, event, helper) {
        var rtId = event.currentTarget.value;
        component.set('v.rtSelected', rtId);
    },
    
    newRecordAcc : function(component, event, helper) {   
        var selected = component.get("v.rtSelected"); 
        if(!selected){
            
            //lança uma mensagem, caso nenhum valor seja selecionado
            helper.showNotice(component,'Erro', 'Ao menos um opção deve ser selecionada.', 'error'); 
            return;
        }
        //lança o evento que mostra o layout padrão de criação de registro
            var evt = $A.get("e.force:createRecord");
            evt.setParams({
                "entityApiName": "Account",
                "defaultFieldValues": {
                    'recordTypeId' : component.get("v.rtSelected")      
                }
            });     
            evt.fire();
            component.set('v.showModal', false);

     
    }
 })