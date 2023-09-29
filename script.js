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
    const height = data.height;
    const weight = data.weight;

    displayName(name);
    displayTypes(types);
    displayInfo(info, height, weight);
    displayMoves(moves);
    displayImage(image);

    if (!isDisplayingMoves) {
        infoDisplay();
    } else {
        movesDisplay();
    }
}

function displayImage(image) {
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

function displayInfo(info, height, weight) {
    const keys = [];
    const values = [];

    keys.push("height");
    values.push((height * 0.1).toFixed(1) + "m");
    keys.push("weight");
    values.push((weight * 0.1).toFixed(1) + "kg");

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
    let typeChunks = document.getElementById("type-container");
    let newHTML = "";
    types.forEach(t => {
        newHTML += `<p id="${t.type.name}">${t.type.name}</p>\n`
    });
    typeChunks.innerHTML = newHTML;
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
    document.getElementById("title").innerHTML = "Info";
}

function movesDisplay() {
    document.getElementById("info-list").style.display = "none";
    document.getElementById("moves-list").style.display = "block";
    isDisplayingMoves = true;
    document.getElementById("moves").style.backgroundColor = "#7CFF79";
    document.getElementById("info").style.backgroundColor = "#E8E8E8";
    document.getElementById("title").innerHTML = "Moves";
}

fetchData();