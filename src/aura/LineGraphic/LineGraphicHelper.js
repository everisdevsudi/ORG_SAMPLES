({
    populaGraficohelper : function(component, event, helper,botao) {
        
        if(!botao){
            var botao = event.getSource().getLocalId();
             var btn = botao;
        }
        var btn = botao;
        var idBotao = btn.substr(btn.length - 1);
        
        component.get("v.botaoBooleano".concat(idBotao)) == true ? component.set("v.botaoBooleano".concat(idBotao), false) : component.set("v.botaoBooleano".concat(idBotao), true);
        
        var myCanvas = component.find("line-chart").getElement();
        var maior = -100.00;
        var cores = new Map();
        cores.set(1,"#31c667");
        cores.set(3,"#ffbd2d");
        
        
        var ctx = myCanvas.getContext("2d");
        var porcentagens = new Map();
        var largura = myCanvas.width;
        var altura = myCanvas.height;
        
        for(var i = 1; i <= 3; i++){
            var isActive = component.find("elem"+ i);
            if(component.get("v.botaoBooleano"+i) == true){
                porcentagens.set(cores.get(i),isActive);
                if(isActive.get("v.value") > maior){
                    maior = isActive.get("v.value");
                }
            }
        }
        
        function drawLine(ctx,startX, startY, endX, endY,color,text){
            ctx.save();
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(startX,startY);
            ctx.lineTo(endX,endY);          
            ctx.textBaseline="middle";
            ctx.textAlign="right";
            ctx.fillStyle = color;
            ctx.font = "normal 16px Verdana";
            ctx.fillText("+" + text + "%",endX,endY-7);            
            ctx.stroke();
            ctx.restore();
        }
        
        ctx.clearRect(0,0,largura,altura);
        function logMapElements(value, key, map) {
            var valor = parseFloat(value.get("v.value"));
            drawLine(ctx,0,altura,largura,altura*(Math.cos(valor/maior+0.4)),key ,valor.toString());
        }
        porcentagens.forEach(logMapElements);
        
        
    },
    getGraficosHelper : function(component, event, helper) {
        var perfil = component.get('v.perfil');
        console.log('perfil: ' + perfil);
        var action = component.get("c.getParametrosGrafico");
        action.setParams({ 
            perfil : (perfil != null) ? perfil : '1'
        });  
        action.setCallback(this, function(response){ 
            let state = response.getState();
            if(state === 'SUCCESS'){
                let resposta = response.getReturnValue();
                console.log('retorno gráfico reto' + JSON.stringify(resposta));
                component.set("v.cdi",resposta.CDI);
                component.set("v.poupanca",resposta.Poupanca);
                component.set("v.rendimento",resposta.Rendimento);
                setTimeout(function(){ helper.populaGraficohelper(component, event, helper,"elem1"); }, 100);
                setTimeout(function(){ helper.populaGraficohelper(component, event, helper,"elem3"); }, 200);
            }
            else if(state === "ERROR"){
                console.log('ERRORRRRR');
            }else{
                console.log('erro desconhecido'+state);
            }
        });
        $A.enqueueAction(action);
    },
})