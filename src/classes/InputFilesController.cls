public class InputFilesController {
    
    public class FileObj{
        public String lFileName {get;set;}
        public String lFileContent {get;set;}
    }
    
    @AuraEnabled
    public static void insertFiles(String aFilesString){
        List<FileObj> lLstFiles = (List<FileObj>) JSON.deserialize(aFilesString, List<FileObj>.class);
        List<ContentVersion> lLstContentVersion = new List<ContentVersion>();
        
        for(FileObj iFileObj : lLstFiles){
            ContentVersion lContVersion = new ContentVersion();//Objeto para Files lightning
            lContVersion.Title = iFileObj.lFileName;
            lContVersion.VersionData = EncodingUtil.base64Decode(iFileObj.lFileContent);//converte para blob 
            lContVersion.PathOnClient = iFileObj.lFileName;
            lLstContentVersion.add(lContVersion);
        }        
        
        try{
            insert lLstContentVersion;
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}