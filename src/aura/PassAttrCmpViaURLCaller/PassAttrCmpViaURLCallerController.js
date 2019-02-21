({
	doInit : function(component, event, helper) {
        //Recupera a url
        let url = window.location.toString();
        //Remove o nome da tab que se encontra o componente da url
        let urlOrg = url.substring(url.lastIndexOf('/'),0);
        //Parêmetro com a url destino do redirecionamento(API)
        let tabNovoComponent = '/Adicione o nome da tab';
  		//Constroi o link para a tab
		let urlCarteira = urlOrg + tabNovoComponent;
        //Parêmetro para o component destino saber qual o valor deve atribuir à variável
        let param = '?page=resgates';
        //Redireciona
        window.location.replace(urlCarteira + param);
	}
})