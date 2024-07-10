const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')

const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1

//função responsável por buscar os dados do pokemon na API
const fetchPokemon = async (pokemon) => {
    const APIFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIFetch.status == 200){
        const data = await APIFetch.json();
        return data
    }         
}

//função responsável por renderizar o nome, o id e a imagem do pokemon escolhido
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'carregando...';
    pokemonNumber.innerHTML = '?';
    data = await fetchPokemon(pokemon);
    if(data){
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];    
    input.value = ''
    searchPokemon = data.id
    } else {
        pokemonName.innerHTML = 'not found';
        pokemonNumber.innerHTML = '?';
        pokemonImage.src = ''
        input.value = ''
    }

}

//função de EventListener para capturar o que foi escrito no formulário e jogar para a função de busca na API
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
})

//função para o botão Prev
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1
        renderPokemon(searchPokemon);
    }
})

//função para o botão Next
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
})

renderPokemon('1')
