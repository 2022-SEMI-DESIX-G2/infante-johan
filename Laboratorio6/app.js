const numero=5;

const fibonacci = (inputNum) => {

    const arr = [];
    let a=0, b=1, c, title;

    if (inputNum >= 1) {

        for (let i = 1; i <= inputNum; i++) {
            title = a;
            c = a + b;
            a = b;
            b = c;

            arr.push(title);
        }
     
        console.log(arr);
    }
    else{
        console.log("El Valor debe ser Positivo");
    }
}

fibonacci(numero);