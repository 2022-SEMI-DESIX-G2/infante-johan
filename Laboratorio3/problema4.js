function primos() {

    var numero;
    var numerosPrimos = [];
    var suma=0;

    numero = prompt('Ingrese un numero', '');


    for (let i = 2; i <= numero; i++) {

        if (Divisibleprimo(i)) {
            
            numerosPrimos.push(i);
            suma = suma + i;

        }

    }
       
    console.log("1,"+numerosPrimos + " = "+(suma+1));
}

function Divisibleprimo(numeroo) {

    for (let j = 2; j < numeroo; j++) {

        if (numeroo % j === 0) {
            return false;
        }
    }
    return numeroo !== 1;
}