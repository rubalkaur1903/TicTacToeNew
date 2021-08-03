const resetGame = () => {
    let board = ['', '', '', '', '', '', '', '', ''];
}
const players = ['', ''];

let currentPlayer = 'X';
let lastClickedIdx = -1;

// ************** DOM SELECTORS ****************
const boardElem = document.querySelectorAll('[data-cell]');
const playerTurnElem = document.querySelector('#player-turn');
const restartButtonElem = document.querySelector('#restart');


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
        // console.log('clicked')
        if (event.target.className === 'cell') {
            let cellIdx = event.target.dataset.indexNumber;
            takeTurn(cellIdx);
            renderPlayer();
        }
            
    }, { once: true })
});

playerTurnElem.addEventListener('click', function(event) {
    if (event.target.className !== 'start') return;
    
    const player1Input = document.querySelector('input[name=player1]');
    players[0] = player1Input.value;
    const player2Input = document.querySelector('input[name=player2]');
    players[1] = player2Input.value;

    render();
});

restartButtonElem.addEventListener('click', function () {
    console.log('restart')
})

render();
resetGame();