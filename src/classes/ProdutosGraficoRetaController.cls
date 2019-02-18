public class ProdutosGraficoRetaController {    
    @AuraEnabled
    public static Map<String,Decimal> getParametrosGrafico(string perfil){
        Map<string,Decimal> mapa = new Map<String,Decimal>();
        Map<String,Decimal> filtro = new Map<string,Decimal>();
        //RecordType rt = [select Id from RecordType where sObjectType='Parametro__c' and DeveloperName  ='PrevisaoCarteira' limit 1]  ;     
        /*Parametro__c parametro = [SELECT TaxaRentabilidadeAcoes__c,  TaxaRentabilidadeIPCA__c, TaxaRentabilidadePoupanca__c, TaxaCDI__c,
                                  TaxaPerfil1__c, TaxaPerfil2__c, TaxaPerfil3__c, TaxaPerfil4__c, TaxaPerfil5__c FROM Parametro__c 
                                  WHERE Recordtype.id = :rt.Id
                                  ORDER BY CreatedDate DESC limit 1];*/
        filtro.put('1',1/*taxa perfil 1*/);
        filtro.put('2',2/*taxa perfil 2*/);
        filtro.put('3',3/*taxa perfil 3*/);
        filtro.put('4',4/*taxa perfil 4*/);
        filtro.put('5',5/*taxa perfil 5*/);
        mapa.put('Acoes',1.2);
        mapa.put('CDI',0.4);
        mapa.put('IPCA',1.2);
        mapa.put('Poupanca',0.01);
        mapa.put('Rendimento',filtro.get('1'));
        return mapa;
    }
}