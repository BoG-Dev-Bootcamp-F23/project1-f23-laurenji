let INDEX = 1;
let isDisplayingMoves = false;

async function fetchData() {
    let URL = `https://pokeapi.co/api/v2/pokemon/${INDEX}/`;

    const response = await fetch(URL);
    const data = await response.json();
    
    const name = data.name;
    const image = data.sprites.front_default;
    const types = data.types;
    const info = data.stats;
    const moves = data.moves;

    displayName(name);
    displayTypes(types);
    displayInfo(info);
    displayMoves(moves);
    displayImage(image);

    if (!isDisplayingMoves) {
        infoDisplay();
    } else {
        movesDisplay();
    }
}

function displayImage(image) {
    console.log(image);
    document.getElementById("image").src = image;
}

function displayMoves(moves) {
    const moveNames = [];
    moves.forEach(m => {
        moveNames.push(m.move.name);
    });

    let list = document.getElementById("moves-list");
    let fragment = document.createDocumentFragment();
    list.innerHTML = "";

    for (let i = 0; i < moveNames.length && i < 7; i++) {
        let li = document.createElement("li");
        li.textContent = moveNames[i];
        fragment.appendChild(li);
    }
    list.append(fragment);
}

function displayInfo(info) {
    const keys = [];
    const values = [];

    info.forEach(i => {
        keys.push(i.stat.name);
        values.push(i.base_stat);
    });

    let list = document.getElementById("info-list");
    list.innerHTML = "";
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

function leftClick() {
    if (INDEX > 1) {
        INDEX--;
        fetchData();
    }
}

function rightClick() {
    if (INDEX <= 1000) {
        INDEX++;
        fetchData();
    }
}

function infoDisplay() {
    document.getElementById("moves-list").style.display = "none";
    document.getElementById("info-list").style.display = "block";
    isDisplayingMoves = false;
    document.getElementById("info").style.backgroundColor = "#7CFF79";
    document.getElementById("moves").style.backgroundColor = "#E8E8E8";
    console.log("info");
}

function movesDisplay() {
    document.getElementById("info-list").style.display = "none";
    document.getElementById("moves-list").style.display = "block";
    isDisplayingMoves = false;
    document.getElementById("moves").style.backgroundColor = "#7CFF79";
    document.getElementById("info").style.backgroundColor = "#E8E8E8";
    console.log("moves");
}

fetchData();