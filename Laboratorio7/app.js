const axios = require('axios').default;

const main = async (pokemon) => {
const { data } = await axios("https://pokeapi.co/api/v2/pokemon/"+pokemon);

// console.log({data});

console.log("ID: "+data.id);
console.log("Order: "+data.order);
console.log("Nombre: "+data.name);
console.log("Peso: "+(data.weight/10)+" Kg");
console.log("Altura: "+(data.height/10)+" M");
console.log("Habilidades: "+data.abilities.map(({ ability, is_hidden }) => `${ability.name} ${is_hidden?"⊙":""}` ));

};

main("ditto");