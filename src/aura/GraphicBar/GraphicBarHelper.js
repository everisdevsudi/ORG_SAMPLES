({
	doInitHelper : function(component, event) {
        var map = new Map();
        /* Cores dos gráficos */
        map.set(1, "#00cc85");
        map.set(2, "#43adfb");
        map.set(3, "#6740ff");
        map.set(4, "#e76e23");
        map.set(5, "#e73023");
        
        var canvas;
        var ctx ;
        var porcentagem;
        
        for(var i = 1; i <= 5; i++){
            /* Pega um canvas específico. Ex: myCanvas1, myCanvas2,etc. São os ids dos canvas na tela */
            canvas = document.getElementById("myCanvas" + String(i));
          	/* Renderizar um gráfico 2d */ 
			ctx = canvas.getContext("2d");
   			/* get atributos do componente */
        	porcentagem = component.get("v.porcentagem"+ String(i));
            /* Limpa a parte do gráfico especificada
             * Parâmetro 1: a posição do gráfico em relação ao topo dele (da esquerda para a direita em px) 
             * Parâmetro 2: a posição do gráfico em relação ao topo (quão longe ele está do topo em px)
             * Parâmetro 1 e 2 definem um ponto, onde um retangulo será criado.
             * Width e height nesse caso são os valores padrões do canvas.
             */
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            /* Define a cor do gráfico */
            ctx.fillStyle = map.get(i);
            /* Preenchendo o gráfico com a respectiva cor.
             * 1º parâmetro : Ele deve ser preenchido desde o início a esquerda, por isso 0.
             * 2º parâmetro : é um cálculo inversamente proporcional, quanto menor o valor 
             * da porcentagem, mais longe do topo. Ou seja, preenche o gráfico mais abaixo.
             * os Outros parâmetros são informações do gráfico, tamanho e largura.
             */
			ctx.fillRect(0,canvas.height*(1 - porcentagem/100),canvas.width,canvas.height);
        }        
	}
})