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

async function request(url:string, callback:any): Promise<any>{
    const response = await fetch(url)
    if(response.ok){
        const data = await response.json()//convert the first reponse of fetch to json
        const dataToReturn = await callback(data)

        return dataToReturn
    }else {
        throw new Error("Error al conectar con PokeAPI")
    }    
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

function loadPokemonInDOM(): void{
    img.src = pokemonImage
}

async function init(){

    pokemonID = generateRandomPokemon(getPokemonCount())
    const pokemonUrl:string = `${apiUrl}pokemon-form/${pokemonID}/`
    try{
        pokemonName = await request(pokemonUrl,(data:any) => data.pokemon.name)
        console.log(pokemonName)
        pokemonImage = await request(pokemonUrl,(data:any) => data.sprites.front_default)
        loadPokemonInDOM()
    }catch(error){
        console.error(error)
        alert(error)
    }
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