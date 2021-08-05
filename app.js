
let board = ['', '', '', '', '', '', '', '', ''];
const players = ['', ''];

let currentPlayer = 'X';
let isGameActive = true;
let lastClickedIdx = -1;




// ************** DOM SELECTORS ****************
const boardElem = document.querySelectorAll('[data-cell]');
const playerTurnElem = document.querySelector('#player-turn');
const restartButtonElem = document.querySelector('#restart');
const gameStatusElem = document.querySelector('.game-status')


const winningMessage = () => `${getCurrentPlayer} has won this round!!!`
const drawMessage = () => `It's a draw!`;

let currentPlayerIdx = 0;
const changeTurn = () => {
    currentPlayerIdx = Math.abs(currentPlayerIdx-1);
}
const getCurrentPlayer = () => players[currentPlayerIdx];


// ************** DOM MANIPULATION FUNCTIONS ****************
const renderPlayer = () => {
    let text;
    if(!players[0] || !players[1]) {
        text = `
        <input name="player1" placeholder="Player 1">
        <input name="player2" placeholder="Player 2">
        <button class="start">Start</button>
        `
    } else {
        text = `It's currently ${getCurrentPlayer()}'s turn.`
    }
    playerTurnElem.innerHTML = text;
}

const renderRestart = () => {
    restartButtonElem.innerHTML = `
    <button class="Restart">Restart Game</button>
    `
}
const render = () => {
    renderRestart();
    renderPlayer();
}
//***************** TRIGGERING ON EACH TURN CLICK *****************
const checkWin = () => {
    console.log('X won')
    let winningCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    let roundWon = false;
    for (let i = 0; i <= winningCombination.length; i++) {
        // const winningCondition = winningCombination[i];
        let a = winningCombination[i][0];
        let b = winningCombination[i][1];
        let c = winningCombination[i][2];
        console.log(a, b, c)
        if (a === '' || b === '' || c === '') {
            console.log('empty spot')
            continue;
        } 
        if ( a === b && b === c) {
            console.log('winningCombination')
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        console.log('winningMessage')
        gameStatusElem.innerHTML = winningMessage();
        isGameActive = false;
        return;
    } 
}

const takeTurn = (cellIdx) => {
    console.log(cellIdx)
    if(!players[0] || !players[1]) return;
    console.log('clicked');
    
    board[cellIdx] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById(cellIdx).innerHTML = currentPlayer;
    
    const lastPlayerTurn = board[lastClickedIdx];
    lastClickedIdx = cellIdx;
    
    
    changeTurn();
}

// ************** EVENT LISTENERS ****************

boardElem.forEach(cell => {
    cell.addEventListener('click', function (event) {
        if (!players[0] || !players[1]) return;
        // console.log('clicking')
        if (event.target.className === 'cell') {
            let cellIdx = event.target.dataset.indexNumber;
            takeTurn(cellIdx);
            renderPlayer();
            checkWin();
        }
        
    }, { once: true })
});

playerTurnElem.addEventListener('click', function(event) {
    if (event.target.className !== 'start') return;
    
    const player1Input = document.querySelector('input[name=player1]');
    players[0] = player1Input.value;
    const player2Input = document.querySelector('input[name=player2]');
    
    if (player2Input.value === '') {
        players[1] = 'Computer';
    } else {
        players[1] = player2Input.value;
    }
    render();
});

restartButtonElem.addEventListener('click', function () {
    console.log('restart')
    render();
})

render();

