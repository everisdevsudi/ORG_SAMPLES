public class ShowModalRecordTypeCrtl {
       ///classe par quardar atributos enviados ao front
    public class CheckListRTNames{
        public String idRT { get; set; }
        public String name { get; set; }
    }   
    @AuraEnabled
    public static String getInfoRT(){
 
        List<ShowModalRecordTypeCrtl.CheckListRTNames> aRtCheck = new List<ShowModalRecordTypeCrtl.CheckListRTNames>();
        //busca os tipos de registro de um objeto especifico
        Schema.DescribeSObjectResult lstRT = Account.SObjectType.getDescribe();
       System.debug('rts>>>'+ lstRT.getRecordTypeInfos());
        //condições para filtrar os valores de tipo de registro
        for( Schema.RecordTypeInfo iRt : lstRT.getRecordTypeInfos()){
            if(!iRt.isMaster() && iRt.isAvailable())
            {
                ShowModalRecordTypeCrtl.CheckListRTNames aRt = new ShowModalRecordTypeCrtl.CheckListRTNames();
                aRt.idRT = iRt.getRecordTypeId();
                aRt.name = iRt.getName();
                aRtCheck.add(aRt);
            }
        }
        System.debug('lista>>>'+ aRtCheck);
        return JSON.serialize(aRtCheck);  
        
    }      
}