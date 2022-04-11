function contadorCaracteres() {

    var cadena,caracter,cont;
    var caracteres = [];

    cadena = prompt('Ingrese una palabra', '');


    for (let i = 0; i < cadena.length; i++) {

        cont=0;
        caracter=cadena[i];

        for(let j=0 ; j <= cadena.length; j++){
            
            if(caracter==cadena[j]){
                cont++;
            }
        }

        if(!caracteres.includes(caracter+" = "+cont)){
            caracteres.push(caracter+" = "+cont);
        }        
        
    }
    
    console.log(caracteres);
}