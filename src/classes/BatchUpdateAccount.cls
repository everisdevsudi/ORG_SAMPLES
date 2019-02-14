global class BatchUpdateAccount implements Database.Batchable<sObject>, Database.Stateful, Schedulable
{	
    //A classe Batch deve implementar Database.Batchable<sObject>, Database.Stateful, Schedulable;
    //A classe deve obrigatoriamente implementar os métodos Start, execute e Finish. 
    //O objetivo deste Batch de exemplo é recuperar as contas que não possuem valor no campo Industry e no execute, preencher este campo e dar um update na conta.
    
    global String triggerId { get; set; }
    global BatchUpdateAccount(){}
    
    global static String executarBatch()//Método para executar o batch
    { return database.executeBatch(new BatchUpdateAccount(), 1); }
    
    global static String agendar()// Metodo criado para realizar o agendamento do batch para rodar de determinado tempo em tempo.
    {
        Datetime lProxExec = system.now().addMinutes(1);
        String lCronStr = lProxExec.second() + ' ' + lProxExec.minute() + ' ' + lProxExec.hour() + ' ' + lProxExec.day() + ' ' + lProxExec.month() + ' ?';
        BatchUpdateAccount lBatch = new BatchUpdateAccount();
        String lAgendName = 'Update Industry fields of Accounts at: ' + system.now();
        
        return system.schedule(lAgendName, lCronStr, lBatch);
    }
    global Database.queryLocator start(Database.BatchableContext bc)//Método start que é onde é feita a busca dos dados que será passado para o método de execute.
    {	
        String lQuery = 'SELECT Id, Name, Industry FROM Account WHERE Industry = null';
        return Database.getQueryLocator(lQuery);
    }
    
    global void execute(SchedulableContext sc)//Metodo execute obrigatorio pois é onde é feita a instanciação do batch para executar.
    {
        BatchUpdateAccount lBatch = new BatchUpdateAccount();
        lBatch.triggerId = sc.getTriggerId();
        Database.executeBatch(lBatch, 1);
    }
    
    global void execute(Database.BatchableContext BC, List<Account> lNewAccount)//Método execute também obrigatório,
    {//onde é feito o processamento de acordo com o retorno do start, nesse exemplo é uma lista de contas retornadas do select do start.
        System.debug('Contas para atualizar-> '+lNewAccount);
        
        List<String> lstIndustryValues = new List<String>();
        List<Account> lstAccsToUpdate = new List<Account>(); 
        Integer i=0;
        Schema.DescribeFieldResult fieldResult = Account.Industry.getDescribe();        
        list<Schema.PicklistEntry> lstIndustry = fieldResult.getPicklistValues();
        
        for(Schema.PicklistEntry industryValues : lstIndustry)
        {
            lstIndustryValues.add(industryValues.getValue());
        }
        System.debug('lstIndustryValues-> '+ lstIndustryValues);    
        
        for(Account acc : lNewAccount)
        {       
            acc.Industry = lstIndustryValues.get(i);
            i++;
            lstAccsToUpdate.add(acc);
        }
        try{
            Database.update(lstAccsToUpdate,false);
        }
        Catch(Exception e)
        {
            System.debug('Erro no batch UpdateAccount: '+ e.getMessage());
        }
        
    }
    
    global void finish(Database.BatchableContext BC)// método finish para encerrar a execução atual e utiliza o método "agendar" para Schedular a proxima execução.
    {
        if (String.isBlank(this.triggerId)) { return; }
        try { system.abortJob(this.triggerId); } catch(Exception ex) { }
        agendar();
    }
}
