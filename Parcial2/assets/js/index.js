((utils) => {

    const App = {
        htmlElements: {
            pokemonFinderForm: document.querySelector('#pokemon-finder-form'),
            pokemonFinderType: document.querySelector('#select-type'),
            pokemonFinderInput: document.querySelector('#input-query'),
            pokemonFinderOutput: document.querySelector('#section-stats-response'),
            pokemonFinderButtonForm: document.querySelector('#buttons-form'),
            pokemonFinderCleanButton: document.querySelector('#clean-button'),
            errorInput: document.querySelector('#error-input'),
            errorType: document.querySelector('#error-type'),
        },
        init: () => {
            App.htmlElements.pokemonFinderForm.addEventListener('submit', App.handlers.pokemonFinderFormOnSubmit);
            App.htmlElements.pokemonFinderCleanButton.addEventListener('click', App.handlers.pokemonFinderCleanButtonOnClick)
        },
        handlers: {
            pokemonFinderFormOnSubmit: async(e) => {
                e.preventDefault();
                App.htmlElements.errorInput.innerHTML = "";
                App.htmlElements.errorType.innerHTML = "";
                let error = '<span class="err">Este campo es obligatorio*</span>';

                const inputValue = App.htmlElements.pokemonFinderInput.value;
                const typeValue = App.htmlElements.pokemonFinderType.value;

                try {
                    if (!inputValue) {
                        App.htmlElements.errorInput.innerHTML = error;
                    } else if (typeValue === 'default') {
                        App.htmlElements.errorType.innerHTML = error;
                    } else {
                        App.htmlElements.pokemonFinderButtonForm.className += " buttons-form-visible-buttons"
                        App.htmlElements.pokemonFinderCleanButton.className += " clean-button-visible"
                        const response = await utils.methods.getSearch({ inputValue, typeValue });
                        const { species } = response;
                        if (species) response['chain_evolves'] = await utils.methods.getEvolutionChain(species.url);

                        const renderedTemplate = App.templates.render({ typeValue, response });
                        App.htmlElements.pokemonFinderOutput.innerHTML = renderedTemplate;

                    }
                } catch (error) {
                    console.log(error);
                    App.htmlElements.pokemonFinderOutput.innerHTML = ` <section class="container container-stats">
                    <center>
                        <h3>${error}</h3>
                    </center>
                </section>`;
                }

            },
            pokemonFinderCleanButtonOnClick: () => {
                App.htmlElements.pokemonFinderInput.value = '';
                App.htmlElements.pokemonFinderType.value = 'default';
                App.htmlElements.pokemonFinderOutput.innerHTML = '';
                App.htmlElements.pokemonFinderButtonForm.classList.remove('buttons-form-visible-buttons');
                App.htmlElements.pokemonFinderCleanButton.classList.remove('clean-button-visible')
            },

        },
        templates: {
            render: ({ typeValue, response }) => {
                const renderMap = {
                    ability: App.templates.abilityCard,
                    pokemon: App.templates.pokemonCard,
                };

                return renderMap[typeValue] ? renderMap[typeValue](response) : App.templates.errorCard();
            },
            errorCard: () => `<h1>There was an error</h1>`,
            pokemonCard: ({ id, name, weight, height, sprites, abilities, chain_evolves }) => {
                let { back_default, front_default } = sprites;

                let abilitiesList = abilities.map(({ ability, is_hidden }) => `<li>${ability.name} ${is_hidden?'<i class="fa-solid fa-eye-slash"></i>':""}</li>`)

                let evolvesList = chain_evolves.map(({ name, is_baby }) => `<li>${name} ${is_baby?'<img class="img-baby" src="./assets/img/bebe.png" alt="img_baby">':""}</li>`)

                console.log({ back_default, front_default });
                console.log({ abilitiesList });

                return ` <section class="container container-stats">
                <h3>${name} (${id})</h3>
                <section class="container-asides">
                    <section class="aside-A">
                        <h4>Sprites</h4>
                        <img class="sprites" src=${front_default} alt="Front_Image_Pokemon">
                        <img class="sprites" src=${back_default} alt="Back_Image_Pokemon">
    
                        <h4>Evolutions chain</h4>
                        <ul class="scroll-container scroll-evolutions">
                            ${evolvesList.join("")}
                        </ul>
                    </section>
    
                    <section class="aside-B">
                        <h4>Weight/Height</h4>
                        <p class="weight-height">${weight}/${height}</p>
    
                        <h4>Abilities</h4>
                        <ul>${abilitiesList.join("")}</ul>
                    </section>
                </section>
            </section>`;
            },

            abilityCard: ({ name, pokemon }) => {
                const nameArr = name.split("");
                nameArr.splice(0, 1, nameArr[0].toUpperCase());
                name = nameArr.join("");
                console.log(name);
                const pokemonList = pokemon.map(({ pokemon, is_hidden }) => `<li>${pokemon.name} ${is_hidden?'<i class="fa-solid fa-eye-slash"></i>':""}</li>`);
                return ` <section class="container container-stats">
                <h3>${name}</h3>
                <section class="container-asides">
                    <section class="aside-A">
                        <h4>Who can learn it?</h4>
                        <ul class="scroll-container">
                            ${pokemonList.join("")}
                        </ul>
                    </section>
                </section>
            </section>`;
            },
        },

    };

    App.init();

})(document.Utils);