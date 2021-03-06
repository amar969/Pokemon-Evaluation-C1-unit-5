async function main() {
  let data = await getData();
  console.log(data);
  displayData(data);
}

main();

async function getData() {
  try {
    let res = await fetch("https://pokeapi.co/api/v2/pokemon");
    let data = await res.json();
    return data.results;
  } catch (err) {
    console.log(err);
  }
}

let d = document.getElementById("display-data");

function displayData(pokemonList) {
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");

  let row_1 = document.createElement("tr");
  let heading_1 = document.createElement("th");
  heading_1.innerHTML = "Pokemon";

  pokemonList.forEach((element) => {
    let row_2 = document.createElement("tr");
    let td = document.createElement("td");
    td.innerHTML = element.name;
    row_2.appendChild(td);
    tbody.appendChild(row_2);
  });

  row_1.appendChild(heading_1);
  thead.appendChild(row_1);
  table.appendChild(thead);
  table.appendChild(tbody);
  d.appendChild(table);

  localStorage.setItem("pokemonL", JSON.stringify(pokemonList));
  var e = JSON.parse(localStorage.getItem("pokemonL"));
  console.log(e);
}

//Search Pokemon

async function mainPokemon() {
  let data = await searchPoke();
  if (data === undefined) return false;
  displayPokemon(data);
  console.log(data);
}

async function searchPoke() {
  let search = document.getElementById("search").value;
  try {
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}/`);
    let data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

let pokemon_div = document.getElementById("showResult");
function displayPokemon(pokemonList1) {
    pokemon_div.innerHTML = "";
    let id = document.createElement("p");
    id.innerHTML = pokemonList1.id;

    let p = document.createElement("p");
    p.innerHTML = pokemonList1.name;

    let height = document.createElement("p");
    height.innerHTML = pokemonList1.height;

    let weight = document.createElement("p");
    weight.innerHTML = pokemonList1.weight;

    pokemon_div.appendChild(id);
    pokemon_div.appendChild(p);
    pokemon_div.appendChild(height);
    pokemon_div.appendChild(weight);
    
    
    pokemonList1.abilities.forEach((element) =>{
        let ab = document.createElement("span");
        ab.textContent = element.ability.name;
        pokemon_div.appendChild(ab);    
    }) 

    pokemonList1.moves.forEach((element) => {
        let mo = document.createElement("span");
        mo.textContent = element.move.name + ", ";
        pokemon_div.appendChild(mo);
    })

}   

var timerID; // undefined

function debounce(cbFunc, delay) {
  if (timerID) {
    clearTimeout(timerID);
  }

  timerID = setTimeout(function () {
    cbFunc();
  }, delay);
}
