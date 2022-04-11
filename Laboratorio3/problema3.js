
function ageBisiesto(){

    var age
    var verificador="";

    age = prompt('Ingrese el año a verificar:',''); 


    if (age % 400 === 0){
        verificador = "Es un año Bisiesto";
    }
    else if(age % 100 === 0){
        verificador = "No un año Bisiesto";
    }
    else if(age % 4 === 0){
        verificador = "Es un año Bisiesto";
    }else{
        verificador = "No un año Bisiesto";
    }

    alert(verificador);

}

