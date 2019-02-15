({
    doInit : function(component,event,helper){
        //component.set("v.porcentagem", parseInt(sessionStorage.getItem('value')));
       	/* Quando os dados dos gráficos ficam guardados nos cookie */
        var cookie = document.cookie;
        var cookieSplit = cookie.split(';');
        var subs;
                
        /*for(var i = 0; i < cookieSplit.length ; i++){
            if(cookieSplit[i].includes('valor1=')){
                subs = cookieSplit[i].split('valor1=');
                component.set("v.carteiraMapa.r1", parseInt(subs[subs.length-1]));
            }
            if(cookieSplit[i].includes('valor2=')){
                subs = cookieSplit[i].split('valor2=');
                component.set("v.carteiraMapa.r2", parseInt(subs[subs.length-1]));
            }
            if(cookieSplit[i].includes('valor3=')){
                subs = cookieSplit[i].split('valor3=');
                component.set("v.carteiraMapa.r3", parseInt(subs[subs.length-1]));
            }
            if(cookieSplit[i].includes('valor4=')){
                subs = cookieSplit[i].split('valor4=');
                component.set("v.carteiraMapa.r4", parseInt(subs[subs.length-1]));
            }
            if(cookieSplit[i].includes('valor5=')){
                subs = cookieSplit[i].split('valor5=');
                //let x = parseInt(subs[subs.length-1]);
                component.set("v.carteiraMapa.r5", parseInt(subs[subs.length-1]));
            }
        }*/
        helper.doInitHelper(component,event);
    }
})