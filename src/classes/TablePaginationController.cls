public class TablePaginationController {
    
    /* método que busca os dados de cada página, utiliza offset(a partir da posição que queremos) e limit */
	@AuraEnabled
    public static Map<string,String> getAccData(Decimal aPage, Decimal aFilter,String aSortField, String aOrder, String aSearchString){
        Map<String,String> lMapReturnData = new Map<String,String>();
        String lTotalRecords;
        String lQueryCondition = '';
        Integer lFilter = Integer.valueOf(aFilter);
        Integer lOffset = Integer.valueOf((aPage-1)*aFilter);
        String lQueryFields = 'SELECT Id,Name,Type,Phone ';
        
        lQueryCondition += 'FROM Account ';
        /* Search */
        if(aSearchString != null && aSearchString != '')
            lQueryCondition += 'WHERE Name LIKE ' + '\'%' + aSearchString + '%\'';
        /* Quantidade total de registros */
        lTotalRecords = String.valueOf(Database.countQuery('SELECT COUNT() '+ lQueryCondition));
        
        /*Ordena os registros*/
        if(aSortField != null)
            lQueryCondition += ' ORDER BY '+ aSortField + ' ' + aOrder;
        
        lQueryCondition +=  ' LIMIT '+ lFilter +
            	 			' OFFSET ' + lOffset;
        
        lMapReturnData.put('data', JSON.serialize(Database.query(lQueryFields + lQueryCondition)));
        lMapReturnData.put('totalRecords', lTotalRecords);
        return lMapReturnData;
    }
}