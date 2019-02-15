public class CEPIntegrationREST {
    //Classe para receber as informações do retorno do serviço, o nome e tipo das variáveis deve ser o mesmo da retornada.
    public class CEPIntegrationResponse{
        public String cep { get; set; }
        public String logradouro { get; set; }
        public String complemento { get; set; }
        public String bairro { get; set; }
        public String localidade { get; set; }
        public String uf { get; set; }
        public String unidade { get; set; }
        public String ibge { get; set; }
        public String gia { get; set; }
    }
    
    public static void getAddress(String aCep){
        try{
            HttpRequest lRequest = new HttpRequest();
            //método get, busca informações. No caso, o endereço.
            lRequest.setMethod('GET');
            //nesse caso vamos passar um json
            lRequest.setHeader('Content-Type', 'application/json');
            lRequest.setHeader('Charset', 'UTF-8');
            //esse é o site que retorna para nós as informações. obs: é preciso autorizar o endpoint (na Remote Site Settings)
            lRequest.setEndPoint('https://viacep.com.br/ws/'+aCep+ '/json/?callback=');
            //no caso desse serviço, não é preciso enviar um body
            Http http = new Http();
            //chama o serviço
            HttpResponse lResponse = http.send(lRequest);
            String respString = lResponse.getBody();
            CEPIntegrationResponse lResponseAddress = new CEPIntegrationResponse();
            lResponseAddress = (CEPIntegrationResponse)JSON.deserialize(respString, CEPIntegrationResponse.class);
            
            system.debug('**************RETORNO    '+lResponseAddress);
            
        }catch(Exception e) {
            System.debug('Ocorreu um erro inexperado na chamada do serviço!\n' + e.getMessage()); 
        }
    }
}