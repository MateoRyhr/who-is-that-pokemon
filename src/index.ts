//DOM elements
const playButton = document.querySelector(".main__button-play") as HTMLElement
const responseBox = document.querySelector(".main__response-box") as HTMLElement
const input = document.querySelector(".main__input") as HTMLInputElement
const inputButton = document.querySelector(".main__input-button") as HTMLElement
const img = document.querySelector(".main-containerimg__img") as HTMLImageElement

//backend elements
const apiUrl: string = "https://pokeapi.co/api/v2/"
let pokemonCount: number = 0
let pokemonID: number = 0
let pokemonName: string = ''
let pokemonImage: string = ''

function request(url:string, callback:any): any{
    return  fetch(url)
                .then(response => response.json())//convert the first reponse of fetch to json
                .then(callback)//obtain data
                .catch(error => console.error(error))
}

function getPokemonCount(): any{
    //The API have pokemon count of 1181, but really have 898, as of 899 there is no data
    //return request(`${apiUrl}pokemon`,(data:any) => { pokemonCount = data.count; return pokemonCount})
    return 898
}

function generateRandomPokemon(pokemonCount: number){
    const pokemonID = Math.floor(Math.random() * pokemonCount + 1)
    return pokemonID
}

function getPokemonImage(pokemonID:number): any{
    const pokemonUrl:string = `${apiUrl}pokemon-form/${pokemonID}/`
    return request(pokemonUrl,(data:any) => {pokemonImage = data.sprites.front_default; console.log(pokemonImage)})
}

function getPokemonName(pokemonID:number): any{
    const pokemonUrl:string = `${apiUrl}pokemon-form/${pokemonID}/`
    return request(pokemonUrl,(data:any) => {pokemonName = data.pokemon.name; console.log(pokemonName)})
}

function loadPokemonInDOM(): void{
    img.src = pokemonImage
}

function init(): void{
    console.log("lala")
    // getPokemonCount()
    //     .then((pokemonCount:any) => pokemonID = generateRandomPokemon(pokemonCount))
    pokemonID = generateRandomPokemon(getPokemonCount())
    console.log(pokemonID)
    pokemonName = getPokemonName(pokemonID)
        .then(() => getPokemonImage(pokemonID))
        .then(() => {loadPokemonInDOM()})
        .catch((error: Error) => console.error(error))
}

function win(){
    responseBox.innerText = `You win! The pokemon is ${pokemonName}`
}

function lose(wrongName:string){
    responseBox.innerText = `The pokemon's name is not ${wrongName}`
}

function checkName(): void{
    const inputValue: string = input.value
    if(inputValue.toLowerCase() === pokemonName.toLowerCase()) win()
    else lose(inputValue)
}

playButton.addEventListener("click",init)
inputButton.addEventListener("click",checkName)