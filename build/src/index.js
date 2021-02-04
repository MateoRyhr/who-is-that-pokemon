"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        if (response.ok) {
            const data = yield response.json(); //convert the first reponse of fetch to json
            const dataToReturn = yield callback(data);
            return dataToReturn;
        }
        else {
            throw new Error("Error al conectar con PokeAPI");
        }
    });
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
function loadPokemonInDOM() {
    img.src = pokemonImage;
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        pokemonID = generateRandomPokemon(getPokemonCount());
        const pokemonUrl = `${apiUrl}pokemon-form/${pokemonID}/`;
        try {
            pokemonName = yield request(pokemonUrl, (data) => data.pokemon.name);
            console.log(pokemonName);
            pokemonImage = yield request(pokemonUrl, (data) => data.sprites.front_default);
            loadPokemonInDOM();
        }
        catch (error) {
            console.error(error);
            alert(error);
        }
    });
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
