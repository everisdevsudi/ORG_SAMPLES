({
	 barraProgresso:  function(cmp,evt,helper){
        var botao = evt.target;
        var progresso = cmp.find('progresso').getElement();
        var botoes = cmp.find('botoes');
        var index = Number(botao.dataset.indexNumber);
        var max = Number(botoes[botoes.length-1].getElement().dataset.indexNumber);
        var crescimento = Number(max/(botoes.length-1));
        var i;
        var remover = document.getElementsByClassName('slds-is-active');
        
        progresso.style.width = index + "%";
        
        $A.util.removeClass(remover[0] , "slds-is-active");
        
        $A.util.addClass(botao.parentNode,"slds-is-active");
        
        for(i = index; i <= max ; i = i+crescimento ){
            $A.util.removeClass(botoes[i>0 ? i/crescimento : 0].getElement().parentNode,"slds-is-completed");
        }
        
        for(i = index; i >= 0 ; i = i-crescimento ){
            $A.util.addClass(botoes[i>0 ? i/crescimento : 0].getElement().parentNode,"slds-is-completed");
        }
        
    },
})