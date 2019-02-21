({
	doInit : function(component, event, helper) {
        //Recupera o valor passado na url.
        var url_string = window.location.href;
        //Recupera o valor passado na url.
        var url = new URL(url_string);
        //Recupero o valor do parâmetro.
        let blnPossuiPage = url_string.indexOf("page");
        //Valor que indica se o usuário veio do desenquadramento ao realizar a compra dos produtos em carrinho.
        let blnPerfil = url.searchParams.get("page");
        
        if(blnPossuiPage >=0 && blnPerfil == 'resgates'){
            setTimeout(function(){
                component.set("v.page", "23");
            },10000);
        }
	},
})