const axios = require('axios').default;

const main = async (pokemon) => {
const { data } = await axios("https://pokeapi.co/api/v2/pokemon/"+pokemon);
const { data: species_cadena } = await axios("https://pokeapi.co/api/v2/pokemon-species/"+pokemon);
const { data: evolution_cadena } = await axios(species_cadena.evolution_chain.url);
let { evolves_to, is_baby, species } = evolution_cadena.chain;
const evolutionList=[];

// console.log({data});
// console.log({species_cadena});
// console.log({evolution_cadena});
// console.log(evolution_cadena.chain.evolves_to);


  if (evolves_to.length > 0) 
  {
    evolutionList.push(`${species.name}${is_baby ? 'ˇωˇ' : ''}`);
        do {
            if (evolves_to.length > 1)
            {
             for (i = 0; i < evolves_to.length; i++)
             {
               evolutionList.push(`${evolves_to[i].species.name}${evolves_to[i].is_baby ? 'ˇωˇ' : ''}`);
             }
            }else
            {
               evolutionList.push(`${evolves_to[0].species.name}${evolves_to[0].is_baby ? 'ˇωˇ' : ''}`);
            }
            evolves_to = evolves_to[0].evolves_to;
        } while (evolves_to.length > 0)
  }else
  {
    evolutionList.push(`${species.name}${is_baby ? 'ˇωˇ' : ''}`);
  }
 


console.log("ID: "+data.id);
console.log("Order: "+data.order);
console.log("Nombre: "+data.name);
console.log("Peso: "+(data.weight/10)+" Kg");
console.log("Altura: "+(data.height/10)+" M");
console.log("Evoluciones: "+evolutionList);
console.log("Habilidades: "+data.abilities.map(({ ability, is_hidden }) => `${ability.name} ${is_hidden?"⊙":""}` ));
console.log("PokedexID: "+species_cadena.pokedex_numbers.map(({ entry_number, pokedex }) => `\n #${entry_number}-${pokedex.name}` ));

};

main("pikachu");