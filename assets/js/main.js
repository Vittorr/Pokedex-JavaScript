const pokemonList = document.getElementById('pokemonList')  
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151; // quer pegar somente os da 1 geração
const limit = 10;
let offset = 0;
 
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>                          
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" 
                    alt="${pokemon.name}">
            </div>
        </li>
    `
}                                                      // not pokemon.order ; pokemon.sprites.other.dream_world.front_default

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {    
        const newHtml = pokemons.map(convertPokemonToLi).join('')      
        pokemonList.innerHTML += newHtml 
    })                                  
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsNextPage = offset + limit

    if (qtdRecordsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton) // removendo o botão (tem que pegar o elemento pai e tirar o filho (ele mesmo))
    } else {
        loadPokemonItems(offset, limit)
    }
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// se quiser fazer para somar +5 infito pegando todas as gerações

// loadMoreButton.addEventListener('click', () => {
//     offset += limit
//     loadPokemonItems(offset, limit)
// })


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// OBS: podemos juntar a função pra converter a lista de objetos em lista HTML pois podemos usar o map direto mas é melhor dxar separado:


// function loadPokemonItems(offset, limit) {
//     pokeApi.getPokemons(offset, limit).then((pokemons = []) => {    
//         const newHtml = pokemons.map((pokemon) => `
//             <li class="pokemon ${pokemon.type}">
//                 <span class="number">#${pokemon.number}</span>                          
//                 <span class="name">${pokemon.name}</span>

//                 <div class="detail">
//                     <ol class="types">
//                         ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
//                     </ol>

//                     <img src="${pokemon.photo}" 
//                         alt="${pokemon.name}">
//                 </div>
//             </li>
//         `).join('')      

//         pokemonList.innerHTML += newHtml 
//     })                                  
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// OBS: se refere a parte final do código abaixo:

// mapeando os pokemons transformando em li dps juntando tudo e no HTML
// manipular promise, lista de objetos, transformar a lista de objetos, concatenar os objetos, juntar no HTML


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// OBS: não precisa mais pq os tipos ficaram simples com a criação da classe!!!


// function convertPokemonTypesToLi(pokemonTypes) {
//     return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
// }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// pokemons.map((pokemon) => convertPokemonToLi(pokemon)) // função map transformando o pokemon em um HTML    
// -> um jeito de usar map pra transformar uma coisa em outra porém a função já faz isso então só chamamos o map com a função


// return pokemon.name (retornar o nome do pokemon...)
// o join serve para: juntar todos os elementos da lista em uma única string

// concatenamos no fim tudo geralzao com o HTML existente antes


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// OBS: esse é um jeito de peagar itens da lista transformar e salvar em uma nova lista... mas o map em cima já faz melhor então substituido!!!

// const listItems = []
    
    // for (let i = 0; i < pokemons.length; i++) {               
    //     const pokemon = pokemons[i];                          
    //     listItems.push(convertPokemonToLi(pokemon))           
    // }   

    // console.log(listItems) 


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// pokeApi.getPokemons().then((pokemons) => {
//         const listItems = []

//         pokemons.map()
        
//         for (let i = 0; i < pokemons.length; i++) {            // percorrendo os pokemons, pegando eles e transformando em li(html)
//             const pokemon = pokemons[i];                       // no final concatenando ao HTML inicial existente do projeto
//             listItems.push(convertPokemonToLi(pokemon))        // console.log(convertPokemonToLi(pokemon)) (OBS: apertar enter onde estava)
//         }   
//         pokemonList.innerHTML += convertPokemonToLi(pokemon)   // console.log(pokemonsList)             (OBS: aperta enter para ond estava
//     })                                                         // .catch((error) => console.error(error)) (OBS: enter p onde estava)    


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// pokemonList.innerHTML += '<li>Teste</li>'                  // alterando HTML do elemento que tá dentro da lista como formato de texto
// pokemonList.appendChild('<li>Teste</li>')                  // trabalhando com HTML não no formato de texto mas como objeto


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 1 then: transformando response em uma promessa do body convertida em json
// 2 then: recebendo body convertido e printando ele (oq vai pro 2 then é o retorno do 1)
// OBS: -> o que vai para o 1 then é o retorno do fetch
// catch: caso dê algum erro (OBS: pode ter o finally...)

// OBS: debugger jeito fácil de debugar para ver oq está rolando....

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// fetch(url)                                                 // mesmo principio do try catch finally...
//     .then((response) => {                                  // o then avisa que quando der certo chamar a função e printar a resposta
//                                                            // console.log(response) para mostrar a resposta (não está em json)
//         // response
//         //     .json()
//         //     .then(function (responseBody) {             // tem que transformar em json para poder trabalhar com ele
//         //         console.log(responseBody)
//         // })                                              // não fazer callback... função dentro de função dentro de função etc    

//         return response.json()                             // pode simplificar sem retornar do modo de arrow function...
//     }) 
//     .then(function (jsonBody) {                            // o 2 then já subentende o que aconteceu no de cima e encapsula ele (+ elegante)
//         console.log(jsonBody)
//     })
//     .catch((error) => {
//         console.error(error)
//     })
//     .finally (() => {
//         console.log('Requisição concluída')
//     }) 


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// o fetch é um processo demorado --> processamento assíncrono do HTTP até chamar e receber. não temos a resposta de imediato... mas uma hora vai ter
// promise é uma promessa de um resultado, conforme vc executar isso uma hora vc vai receber o objeto solicitado se tudo der certo

// arrow function... usada no contexto do fetch nos casos de callback... sintaxe (=>)
// -> quando tem 1 linha só não precisa declarar o retorno dela... simplificar como mostrado acima

// getelementbyclassname retorna lista html pq pode ter mais de um // diferente do getbyid que retorna só um pq só pode um id de msm nome




