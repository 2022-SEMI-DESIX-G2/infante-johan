const express = require('express');
const app = express();

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
     
        return(arr);
    }
    else{
        console.log("El Valor debe ser Positivo");
        return("El Valor debe ser Positivo")
    }
}

app.get('/Fibonacci/:num', function(req, res){
    let numero = req.params.num
    res.json({sequence:[fibonacci(numero)]});
})

app.listen(3000);