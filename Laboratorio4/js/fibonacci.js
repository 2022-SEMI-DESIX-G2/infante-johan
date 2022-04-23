(() => {
    const formulario = document.getElementById('formulario');
    const CardDisplay = document.getElementById('Display');   

    const FormularioSubmit = (e) => {
        e.preventDefault();

        let InputNum = document.getElementById('num').value;
        
        let a=0, b=1, c, title;

        if (InputNum >= 1) {

            CardDisplay.innerHTML = '';

            for (let i = 1; i <= InputNum; i++) {
                title = a;
                c = a + b;
                a = b;
                b = c;
                CardDisplay.innerHTML +=
                `
                    <div class="cards" id="card${i}">
                        <img src="img/abstracto_aquaMarina.jpg" alt="" class="cards-image">
                        <h3 class="card-title">${title}</h3>
                        <h3 id="borrar" class="card-title"><i class="fa-solid fa-trash-can" id=card${i}></i></h3>
                    </div>`;
            }
        }
        else{
            alertify.alert("Porfavor solo introduzca valores positivos.", function(){alertify.error('Error');});
        }
    };

    const DisplayClick = (e) => {
        const event = e.target;

        if(event.nodeName=="I")
        {
            const tarjeta = document.getElementById(event.id);

            alertify.confirm("¿Esta seguro de que desea eliminar esta tarjeta?",
            function() {
                alertify.success('Tarjeta Eliminada.');
                CardDisplay.removeChild(tarjeta)
            },
            function() {
                alertify.error('Cancelado');
            });
        }
        
    }
    
    formulario.addEventListener('submit', FormularioSubmit);
    CardDisplay.addEventListener('click', DisplayClick);

})();