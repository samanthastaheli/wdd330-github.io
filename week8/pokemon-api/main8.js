const url = "https://pokeapi.co/api/v2/type/3";
 
function convertToJson(response) { // response is an argument 
    if(response.ok) {
        return response.json();
    } else {
        throw new Error(response.statusText); // statusText is property that contains info about what went wrong 
    }
}

function getPokemon(url) {
    fetch(url)
        .then(convertToJson)
        .then((data) => { // fetch returns promise use then to use promise
            pokemon = data.pokemon;
    });  
}

// does same thing as getPokemon
async function getPokemonAsync(url) {
    let pokemon = await fetch(url).then(convertToJson);
        /* or do: 
            let response = await fetch(url);
            let pokemon = await fetch(url).then(response);
        */
}

async function getPokemonAsyncTwo(url) {
    let pokemon = await fetch(url).then(convertToJson);
    console.log(pokemon.pokemon);
    displayPokemon(pokemon.pokemon);
}

function displayPokemon(list) {
    const listElement = document.getElementById('listElement');
    const newArray = list.map((item) => {
        return `<li data-url="${item.pokemon.url}">${item.pokemon.name}</li>` // data-url is attribute
        // return `<li><a href="${item.pokemon.url}">${item.pokemon.name}</a></li>` // when clicked displays Json
    }); // join makes the array of strings into one big string 
    listElement.innerHTML = newArray.join(""); // putting empty quotes in join makes comma go away 
    // console.log(newArray);
}

async function pokemonClicked(event) { // func needs to be called somewhere 
    console.log(event.target.dataset.url); // is li
    console.log(event.currentTarget); // is ul, thing listener is attached too
    const details = await fetch(event.target.dataset.url).then(convertToJson); // is getting url from line above not the url declared at to of doc
    console.log(details);
    // displayDetails(details);
}

document.getElementById('listElement').addEventListener('click', pokemonClicked); // called here 
getPokemonAsyncTwo(url); // pass in url 


/* function then(callback) { // this function is deep in browsers js
        callback(response); // then is used above in getPokemon function
} */                       // resposnse is within the function 