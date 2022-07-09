require("dotenv").config();
const { app } = require('./config/server');
const service = require('./services/pokemonData');

const PokemonData = new service();

const port = process.env.PORT || 3000;

const CACHE = {};
const ERROR = {};
const SEGUNDOS = 1 * 60;

app.get("/cache", function(req, res) {
    res.json({ data: CACHE });
});

app.post("/pokemon/:name", async function(req, res) {
    const { name } = req.params;

    if (CACHE[name] && (JSON.parse(CACHE[name]).date + (SEGUNDOS * 1000)) >= Date.now()) {
        return res.json({ name, data: JSON.parse(CACHE[name]), isCached: true });
    }
    if (ERROR[name]) {
        return res.json({ name, data: JSON.parse(ERROR[name]), isCached: true });
    }

    let responseData;
    //console.log(await PokemonData.pokemonInfo(name));
    try {

        
        
        const pokemon = await PokemonData.pokemonInfo(name);
        responseData = pokemon;

        

        CACHE[name] = JSON.stringify(pokemon);
    } catch {
        responseData = 'error';
        ERROR[name] = JSON.stringify({ name, error: "No existe este Pokemon." });
    }
    res.json({ name, data: responseData, isCached: false });
});


app.listen(port, () => {
    console.log(`Servidor corriendo en ${port}...`);
});