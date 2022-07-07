(() => {
    const Utils = {
        methods: {
            fibonacci: (inputNum) => {

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

                alertify.success('Fibonacci Generado.');
                 
                    return arr;
                }
                else{
                    alertify.alert("Porfavor solo introduzca valores positivos.", function(){alertify.error('Error: Valor Negativo');});
                }
            }

        }
    }
    document.Utils = Utils;
})();