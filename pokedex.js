
const pokemonCount = 800;
var pokedex = {}; //  each element array is going to consist of 6+ elements Ex => {1: {"name: bulbasaur, "img" : url, "type" : ["grass" , "poison"], desc : "....." } }

window.onload = async function(){

    let i = 1;

    for (i; i <= pokemonCount; i++){
        await getPokemon(i);
        //<div id="1" class="pokemon-name"></div>
        let pokemon = document.createElement("div");
        pokemon.id  = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("pokemon-name");
        pokemon.addEventListener("click", updatePokemon);
        document.getElementById("pokemon-list").append(pokemon);
    }

    
    //document.getElementById("pokemon-description").innerText = pokedex[1]["desc"];
    //document.getElementById("pokemon-moves").innerText = pokedex[1]["move"];
    
    console.log(pokedex);
}





async function getPokemon(num){
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
    
    let res = await fetch(url);
    let pokemon = await res.json();
    console.log(pokemon);
    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];
    let pokemonShinyImg = pokemon["sprites"]["front_shiny"];
    let pokemonWeight = pokemon["weight"];
    let pokemonMove = pokemon["moves"];
    let pokemonBackImg = pokemon["sprites"]["back_default"]
    let pokemonBackShiny = pokemon["sprites"]["back_shiny"]

res = await fetch(pokemon["species"]["url"]);
let pokemonDesc = await res.json();
console.log(pokemonDesc);
pokemonDesc = pokemonDesc["flavor_text_entries"][10]["flavor_text"];

pokedex[num] = {"name" : pokemonName, "img" : pokemonImg, "types" : 
                pokemonType, "desc" : pokemonDesc, "shiny" : pokemonShinyImg, 
                "weight" : pokemonWeight, "moves" : pokemonMove,
                "img_back" : pokemonBackImg, "shiny_back" : pokemonBackShiny, };

 
}


function generateNumber() {
    var randomNumber = Math.floor(Math.random() * 80) + 1;
    console.log(randomNumber);
  }



function updatePokemon(){


    //update name of current pokemon
    document.getElementById("pokemon-name-text").innerText = pokedex[this.id]["name"].toUpperCase();

    document.getElementById("pokemon-img2").src = pokedex[this.id]["shiny"];
    document.getElementById("pokemon-img1").src = pokedex[this.id]["img"];

    document.getElementById("pokemon-img3").src = pokedex[this.id]["img_back"];
    document.getElementById("pokemon-img4").src = pokedex[this.id]["shiny_back"];


    //clear previous type
    let typesDiv = document.getElementById("pokemon-types");
    while (typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }

    //update types
    let types = pokedex[this.id]["types"];
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]); //adds background color and font color
        typesDiv.append(type);
    }

    //Update the pokemon weigth
    document.getElementById("pokemon-weight").innerText = ("Weight: " + pokedex[this.id]["weight"]);

    //update description
    document.getElementById("pokemon-description").innerText = ("Description:\n\n" + pokedex[this.id]["desc"]);

//clear previous type
let movesDiv = document.getElementById("pokemon-moves");
while (movesDiv.firstChild) {
    movesDiv.firstChild.remove();
}

//update types
let moves = pokedex[this.id]["moves"];
for (let i = 0; i < moves.length; i++) {
    let move = document.createElement("span");
    move.innerText = (moves[i]["move"]["name"].toUpperCase() + "\n\n");
    move.classList.add("move-box");
    //adds background color and font color
    movesDiv.append(move);
}

}


document.getElementById("searchInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      search();
    }
  });

// Search function

async function search() {
    var input = document.getElementById("searchInput").value.toLowerCase();
    console.log("Search query: " + input);
    if (isNaN(input)) { // search by name
      for (let i = 1; i <= pokemonCount; i++) {
        if (pokedex[i]["name"].toLowerCase() === input) {
          updatePokemon.call(document.getElementById(i));
          break;
        }
      }
    } else { // search by number
      let num = parseInt(input);
      if (num >= 1 && num <= pokemonCount) {
        updatePokemon.call(document.getElementById(num));
      }
    }
  }