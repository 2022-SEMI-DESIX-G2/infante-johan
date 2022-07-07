((Utils) => {
    const App = {
        htmlElements: {
            formulario: document.querySelector('#formulario'),
            input: document.querySelector('#num'),
            cardDisplay: document.querySelector('#display')
        },
        init: () => {
            App.htmlElements.formulario.addEventListener('submit', App.handlers.FormularioSubmit);
            App.htmlElements.cardDisplay.addEventListener('click', App.handlers.DisplayClick);
        },
        utils: {
            ...Utils.methods,
        },
        templates: {
            card: (i, title) => {
                return `
                <div class="cards" id="card${i}">
                    <img src="img/abstracto_aquaMarina.jpg" alt="" class="cards-image">
                    <h3 class="card-title">${title}</h3>
                    <h3 id="borrar" class="card-title"><i class="fa-solid fa-trash-can" id=card${i}></i></h3>
                </div>`;
            }
        },
        handlers: {
            DisplayClick: (e) => {
                
                const event = e.target;
        
                if(event.nodeName=="I")
                {
                    const tarjeta = document.getElementById(event.id);
        
                    alertify.confirm("¿Esta seguro de que desea eliminar esta tarjeta?",
                    function() {
                        alertify.success('Tarjeta Eliminada.');
                        App.htmlElements.cardDisplay.removeChild(tarjeta)
                    },
                    function() {
                        alertify.error('Cancelado.');
                    });
                }
                
            },
            FormularioSubmit: (e) => {

                e.preventDefault();

                App.htmlElements.cardDisplay.innerHTML = '';

                const num = App.htmlElements.input.value;
                App.utils.fibonacci(num).forEach(function(title, i) {
                    App.htmlElements.cardDisplay.innerHTML += App.templates.card(i, title);
                });

            }
        }
    };
    App.init();
})(document.Utils);