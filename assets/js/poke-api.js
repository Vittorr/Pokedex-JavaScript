
const pokeApi = {}

function convertPokeApiDetailToPokemon (pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type1] = types                                                     // type1 = get(0) ; type2 = get(1) ... ... ... (destructuring array)

    pokemon.types = types
    pokemon.type = type1

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)                                    
        .then((response) => response.json())      
        .then((jsonBody) => jsonBody.results)            
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}







///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// 1 passo: buscando a lista com o fetch (url) que retorna um http response
// 2 passo: convertendo a lista de http response em json que retorna um json com inúmeras informações (paginada, limites, etc)
// 3 passo: pegando apenas a lista de pokemons com os resultados (lista oficial)
// 4 passo: mapeando a lista de pokemons em uma lista de requisições com um novo fetch na URL com os detalhes de cada pokemon
// 4 passo: converter o response que será devolvido pelo novo fetch em um json 
// 5 passo: com a lista de requisições estamos esperando que todas as requisições terminem e então irá retornar a lista de detalhes com tudo

// fazendo requisição para trazer lista de pokemons -> transformar em lista de novas reqs.
// pegando lista dentro do json... 
// PODE DAR UM .catch((error) => console.error(error)) depois dos .then se quiser...


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// OBS: já está sendo usado em cima como arrow function

// Promise.all([                                            // esperar que todas as requisições terminem para retornar o resultado na lista c tudo
//     fetch ('https://pokeapi.co/api/v2/pokemon/1'),
//     fetch ('https://pokeapi.co/api/v2/pokemon/2'),
//     fetch ('https://pokeapi.co/api/v2/pokemon/3'),
//     fetch ('https://pokeapi.co/api/v2/pokemon/4'),
// ]).then((results) => {
//     console.log(results)
// })

