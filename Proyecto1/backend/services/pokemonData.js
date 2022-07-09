const axios = require("axios").default;

class pokemonData{

    async pokemonInfo(name) {

        const { data: pokemon } = await this.getPokemon(name);

     /*   console.log("------------------------------DATA DE POKEMON---------------------------------------------");
        console.log({pokemon});*/

        const { data: species_data } = await this.getSpecies(name);

      /*  console.log("------------------------------DATA DE species_data---------------------------------------------");
        console.log({species_data}); */

        const { data: evolutionChain_data } = await this.getEvolutionChain(species_data.evolution_chain.url)

      /* console.log("------------------------------DATA DE evolutionChain_data---------------------------------------------");
        console.log(evolutionChain_data); */ 
        
        const { data: encounters_data } = await this.getLocation(name);

      /*  console.log("------------------------------DATA DE encounters_data---------------------------------------------");
        console.log(encounters_data);*/

        pokemon['date'] = Date.now();
        pokemon['date_string'] = (new Date()).toLocaleString("es-ES");
        pokemon['evolution_chain_data'] = evolutionChain_data;
        pokemon['encounters_data'] = encounters_data;

        /*console.log("------------------------------DATA DE POKEMON---------------------------------------------");
        console.log(pokemon);*/
       
        return pokemon;

    }

    async getPokemon(name) {
        return await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      }

    async getLocation(name) {
        return await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/encounters`);
      }

    async getSpecies(name) {
        return await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
      }

    async getEvolutionChain(url) {
        return await axios.get(`${url}`);
      }
}

module.exports = pokemonData;