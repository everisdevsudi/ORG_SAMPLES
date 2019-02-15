public class BuscaCEP {
    //Método responsável pela chamada do serviço de consultaCEP que retorna o endereço com o Bairro, Cidade, Complemento,Endereco e UF.
    public static void getEndereco(String cep)
    {
        clienteMasterSigepBsbCorreios.AtendeClientePort request = new clienteMasterSigepBsbCorreios.AtendeClientePort();
        
        try{
            clienteMasterSigepBsbCorreios.enderecoERP response = request.consultaCEP(cep);
            System.debug('RETORNO:');
            System.debug(response);
          
        }catch(Exception e){
            System.debug('Mensagem de erro-> '+ e.getMessage());
        }
    }  
}