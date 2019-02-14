public class SortObjectsController {

    @AuraEnabled
    public static List<Object> getOppData(){
        return [SELECT Name,Amount,StageName from Opportunity LIMIT 100];
    }
    
    @AuraEnabled
    public static List<Object> getDataSorted(String aData){
        List<OpportunityWrapper> lLstOppWrapper = new List<OpportunityWrapper>();
        List<Opportunity> lLstOpp = new List<Opportunity>();
        
        for(Opportunity iOpp : (List<Opportunity>)JSON.deserialize(aData, List<Opportunity>.class)){
            lLstOppWrapper.add(new OpportunityWrapper(iOpp));
        }
        
        lLstOppWrapper.sort();
        
        for(OpportunityWrapper iOppWrapper : lLstOppWrapper){ lLstOpp.add(iOppWrapper.oppy); }
        
        return lLstOpp;
    }
}