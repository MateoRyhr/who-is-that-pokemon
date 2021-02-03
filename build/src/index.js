"use strict";
//DOM elements
const playButton = document.querySelector(".main__button-play");
const responseBox = document.querySelector(".main__response-box");
const input = document.querySelector(".main__input");
const inputButton = document.querySelector(".main__input-button");
const img = document.querySelector(".main-containerimg__img");
//backend elements
const apiUrl = "https://pokeapi.co/api/v2/";
let pokemonCount = 0;
let pokemonID = 0;
let pokemonName = '';
let pokemonImage = '';
function request(url, callback) {
    return fetch(url)
        .then(response => response.json()) //convert the first reponse of fetch to json
        .then(callback) //obtain data
        .catch(error => console.error(error));
}
function getPokemonCount() {
    //The API have pokemon count of 1181, but really have 898, as of 899 there is no data
    //return request(`${apiUrl}pokemon`,(data:any) => { pokemonCount = data.count; return pokemonCount})
    return 898;
}
function generateRandomPokemon(pokemonCount) {
    const pokemonID = Math.floor(Math.random() * pokemonCount + 1);
    return pokemonID;
}
function getPokemonImage(pokemonID) {
    const pokemonUrl = `${apiUrl}pokemon-form/${pokemonID}/`;
    return request(pokemonUrl, (data) => { pokemonImage = data.sprites.front_default; console.log(pokemonImage); });
}
function getPokemonName(pokemonID) {
    const pokemonUrl = `${apiUrl}pokemon-form/${pokemonID}/`;
    return request(pokemonUrl, (data) => { pokemonName = data.pokemon.name; console.log(pokemonName); });
}
function loadPokemonInDOM() {
    img.src = pokemonImage;
}
function init() {
    console.log("lala");
    // getPokemonCount()
    //     .then((pokemonCount:any) => pokemonID = generateRandomPokemon(pokemonCount))
    pokemonID = generateRandomPokemon(getPokemonCount());
    console.log(pokemonID);
    pokemonName = getPokemonName(pokemonID)
        .then(() => getPokemonImage(pokemonID))
        .then(() => { loadPokemonInDOM(); })
        .catch((error) => console.error(error));
}
function win() {
    responseBox.innerText = `You win! The pokemon is ${pokemonName}`;
}
function lose(wrongName) {
    responseBox.innerText = `The pokemon's name is not ${wrongName}`;
}
function checkName() {
    const inputValue = input.value;
    if (inputValue.toLowerCase() === pokemonName.toLowerCase())
        win();
    else
        lose(inputValue);
}
playButton.addEventListener("click", init);
inputButton.addEventListener("click", checkName);
