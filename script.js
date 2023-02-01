let boardUI = document.getElementById('board');
let statusIndicator = document.getElementById('status');
let turnIndicator = document.getElementById('turnIndicator');
let playerTurn = true;
let gameOn = true;
let turnCounter = 0;

let gameBoard = {
    field1: {owner: 'blank'},
    field2: {owner: 'blank'},
    field3: {owner: 'blank'},
    field4: {owner: 'blank'},
    field5: {owner: 'blank'},
    field6: {owner: 'blank'},
    field7: {owner: 'blank'},
    field8: {owner: 'blank'},
    field9: {owner: 'blank'},
};

let score = {
    player: [],
    ai: [],
};

const winConditions = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
];

function createTile(fieldName) {
    let field = document.createElement('div');
    return {
	fieldID: fieldName,
	create: function () {
	    field.classList.add('field');
	    field.id = fieldName;
	    field.addEventListener('click', play);
	    if (field.id.slice(-1) % 2 === 0) {
		field.style.background = 'grey';
	    } else {
		field.style.background = 'white';
	    };
	},
	append: function () {
	    boardUI.appendChild(field);
	}
    };
};

//const tile1 = createTile('one');
//
//tile1.create();
//tile1.append();

function init() {
    for (const key in gameBoard) {
//	let field = document.createElement('div');
//	field.classList.add('field');
//	field.id = key;
//	field.addEventListener('click', play);
//	if (field.id.slice(-1) % 2 === 0) {
//	    field.style.background = 'grey';
//	} else {
//	    field.style.background = 'white';
//	};
//	boardUI.appendChild(field);
	
	let tile = createTile(key);
	tile.create();
	tile.append();
    };
};

function play() {
    if (gameOn) {
	if (gameBoard[this.id].owner === 'blank') {
	    let X = document.createElement('img');
	    X.src = 'images/x.svg';
	    this.appendChild(X);
	    playerTurn = false;
	    gameBoard[this.id].owner = 'player';
	    score.player.push(Number(this.id.slice(-1)));
	    chickenDinner();
	    aiPlay();
	};
	if (turnCounter === 9 && gameOn) {
	    statusIndicator.textContent = 'Stalemate!';
	    console.log(winConditions.length);
	    turnIndicator.remove();
	};
    };
};

function aiPlay() { 
    if (gameOn) {
	let possibleMoves = Object.keys(gameBoard).filter(keyName => gameBoard[keyName].owner == 'blank');
	let aiMove = possibleMoves[Math.floor(Math.random()*possibleMoves.length)];
	let O = document.createElement('img');
	O.src = 'images/o.svg';
	gameBoard[aiMove].owner = 'ai';
	score.ai.push(Number(aiMove.slice(-1)));
	document.getElementById(aiMove).appendChild(O);
    };
};

let checker = (arr, target) => target.every(v => arr.includes(v));

function chickenDinner() {
    turnCounter++;
    for (i = 0; i < winConditions.length; i++) {
	if (playerTurn === false) {
	    if (checker(score.player, winConditions[i]) === true) {
		let declaration = document.createElement('div');
		declaration.textContent = 'X wins!';
		boardUI.appendChild(declaration);
		gameOn = false;
	    };
	} else {
	    if (checker(score.ai, winConditions[i]) === true) {
		gameOn = false;
	    };
	};
    };
};

const documentHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
};

window.addEventListener('resize', documentHeight);
documentHeight();

init();
