const INDEX = 1;
const URL = `https://pokeapi.co/api/v2/pokemon/${INDEX}/`;

async function fetchData() {
    const response = await fetch(URL);
    const data = await response.json();
    
    const name = data.name;
    const types = data.types;
    const info = data.stats;
    const moves = data.moves;

    displayName(name);
    displayTypes(types);
    displayInfo(info);
    displayMoves(moves);
}

function displayMoves(moves) {
    const moveNames = [];
    moves.forEach(m => {
        moveNames.push(m.move.name);
    });

    let list = document.getElementById("list");
    let fragment = document.createDocumentFragment();

    moveNames.forEach(move => {
        
    });
}

function displayInfo(info) {
    const keys = [];
    const values = [];

    info.forEach(i => {
        keys.push(i.stat.name);
        values.push(i.base_stat);
    });

    let list = document.getElementById("list");
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < keys.length; i++) {
        let listElement = keys[i] + ": " + values[i];
        let li = document.createElement("li");
        li.textContent = listElement;
        fragment.appendChild(li);
    }
    list.append(fragment);

}

function displayTypes(types) {
    const typeNames = [];
    types.forEach(t => {
        typeNames.push(t.type.name);
    });
}

function displayName(name) {
    const text = document.getElementById("name");
    text.textContent = name;
}

fetchData();