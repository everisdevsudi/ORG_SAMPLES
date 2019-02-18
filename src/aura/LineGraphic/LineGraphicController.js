({
    doInit: function(component, event, helper){
        component.set("v.larguraCanvas",298);
        component.set("v.alturaCanvas",154);
        helper.getGraficosHelper(component,event,helper);
    },
    /*doneRendering: function(component, event, helper) {
        let mapadeMeses = { "01" : "JAN", "02":"FEV", "03":"MAR", "04": "ABR", "05":"MAI", "06":"JUN", "07": "JUL", "09":"AGO", "10": "OUT", "11": "NOV", "12": "DEZ" };
        let mes = component.get("v.itemInvestimento.Vencimento__c");
        var today = new Date();
        var mm = ("0"+(today.getMonth()+1)).slice(-2);
        mes = mes.substring(0,2);
        if(!component.get("v.isDoneRendering")){
            component.set("v.isDoneRendering", true);
           	component.set("v.mesFinal", mapadeMeses[mes]);
            component.set("v.mesInicial", mapadeMeses[mm]);
            
            
			//setTimeout(function(){ helper.populaGraficohelper(component, event, helper,"elem1"); }, 100);
            //setTimeout(function(){ helper.populaGraficohelper(component, event, helper,"elem2"); }, 200);
        }
    },*/
    populaGrafico : function(component, event, helper) {
        helper.populaGraficohelper(component, event, helper);
    },
})