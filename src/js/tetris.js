// const canvas = document.getElementById('game');
// const context = canvas.getContext('2d');
// const startBackdrop = document.querySelector('[data-tetris="backdrop"]');
// const startButton = startBackdrop.querySelector('[data-tetris="play"]');

// const grid = 32;
// const COLS = 8;
// const ROWS = 16;

// let tetrominoSequence = [];
// let playfield = [];

// for (let row = -2; row < ROWS; row++) {
//     playfield[row] = [];
//     for (let col = 0; col < COLS; col++) {
//         playfield[row][col] = 0;
//     }
// }

// const tetrominos = {
//     'I': [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
//     'J': [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
//     'L': [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
//     'O': [[1, 1], [1, 1]],
//     'S': [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
//     'Z': [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
//     'T': [[0, 1, 0], [1, 1, 1], [0, 0, 0]]
// };

// const colors = {
//     'I': 'cyan', 'O': 'yellow', 'T': 'purple', 'S': 'green',
//     'Z': 'red', 'J': 'blue', 'L': 'orange'
// };

// let tetromino = null;
// let rAF = null;
// let gameOver = false;

// const dropSpeed = 2;
// let fastDrop = false;

// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function generateSequence() {
//     const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
//     while (sequence.length) {
//         const rand = getRandomInt(0, sequence.length - 1);
//         const name = sequence.splice(rand, 1)[0];
//         tetrominoSequence.push(name);
//     }
// }

// function getNextTetromino() {
//     if (tetrominoSequence.length === 0) generateSequence();
//     const name = tetrominoSequence.pop();
//     const matrix = tetrominos[name];
//     const col = COLS / 2 - Math.ceil(matrix[0].length / 2);
//     const row = name === 'I' ? -1 : -2;
//     return {
//         name,
//         matrix,
//         row,
//         col,
//         y: row * grid
//     };
// }

// function rotate(matrix) {
//     const N = matrix.length - 1;
//     return matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]));
// }

// function isValidMove(matrix, cellRow, cellCol) {
//     for (let row = 0; row < matrix.length; row++) {
//         for (let col = 0; col < matrix[row].length; col++) {
//             if (matrix[row][col]) {
//                 let r = cellRow + row;
//                 let c = cellCol + col;
//                 if (c < 0 || c >= COLS || r >= ROWS || playfield[r][c]) {
//                     return false;
//                 }
//             }
//         }
//     }
//     return true;
// }

// function placeTetromino() {
//     for (let row = 0; row < tetromino.matrix.length; row++) {
//         for (let col = 0; col < tetromino.matrix[row].length; col++) {
//             if (tetromino.matrix[row][col]) {
//                 if (tetromino.row + row < 0) return showGameOver();
//                 playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
//             }
//         }
//     }
//     for (let row = ROWS - 1; row >= 0;) {
//         if (playfield[row].every(cell => !!cell)) {
//             for (let r = row; r >= 0; r--) {
//                 for (let c = 0; c < COLS; c++) {
//                     playfield[r][c] = playfield[r - 1][c];
//                 }
//             }
//         } else row--;
//     }
//     tetromino = getNextTetromino();
// }

// function showGameOver() {
//     cancelAnimationFrame(rAF);
//     gameOver = true;
//     context.fillStyle = 'black';
//     context.globalAlpha = 0.75;
//     context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
//     context.globalAlpha = 1;
//     context.fillStyle = 'white';
//     context.font = '36px monospace';
//     context.textAlign = 'center';
//     context.textBaseline = 'middle';
//     context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
// }

// function loop() {
//     rAF = requestAnimationFrame(loop);
//     context.clearRect(0, 0, canvas.width, canvas.height);

//     // рисуем поле с сеткой
//     for (let row = 0; row < ROWS; row++) {
//         for (let col = 0; col < COLS; col++) {
//             // фон
//             context.fillStyle = '#222';
//             context.fillRect(col * grid, row * grid, grid, grid);

//             // сетка на фоне
//             context.strokeStyle = '#111';
//             context.lineWidth = 1;
//             context.strokeRect(col * grid, row * grid, grid, grid);

//             // блоки из playfield
//             if (playfield[row][col]) {
//                 const name = playfield[row][col];
//                 context.fillStyle = colors[name];
//                 context.fillRect(col * grid, row * grid, grid, grid);
//             }
//         }
//     }

//     // падающий тетромино
//     if (tetromino) {
//         let speed = fastDrop ? dropSpeed * 6 : dropSpeed;
//         tetromino.y += speed;

//         let newRow = Math.floor(tetromino.y / grid);

//         if (!isValidMove(tetromino.matrix, newRow, tetromino.col)) {
//             tetromino.y = tetromino.row * grid;
//             placeTetromino();
//         } else {
//             tetromino.row = newRow;
//         }

//         context.fillStyle = colors[tetromino.name];
//         for (let row = 0; row < tetromino.matrix.length; row++) {
//             for (let col = 0; col < tetromino.matrix[row].length; col++) {
//                 if (tetromino.matrix[row][col]) {
//                     const x = (tetromino.col + col) * grid;
//                     const y = tetromino.y + row * grid;
//                     // закрашиваем блок
//                     context.fillRect(x, y, grid, grid);
//                     // рисуем линии сетки поверх блока
//                     context.strokeStyle = '#111'; // цвет линии
//                     context.lineWidth = 1;
//                     context.strokeRect(x, y, grid, grid);
//                 }
//             }
//         }
//     }
// }

// document.addEventListener('keydown', function (e) {
//     if (gameOver || !tetromino) return;
//     if (e.which === 37 || e.which === 39) {
//         const col = e.which === 37 ? tetromino.col - 1 : tetromino.col + 1;
//         if (isValidMove(tetromino.matrix, tetromino.row, col)) tetromino.col = col;
//     }
//     if (e.which === 38) {
//         const matrix = rotate(tetromino.matrix);
//         if (isValidMove(matrix, tetromino.row, tetromino.col)) tetromino.matrix = matrix;
//     }
//     if (e.which === 40) {
//         fastDrop = true;
//     }
// });

// document.addEventListener('keyup', function (e) {
//     if (e.which === 40) {
//         fastDrop = false;
//     }
// });

// startButton.addEventListener('click', () => {
//     startBackdrop.style.display = 'none';
//     canvas.style.display = 'block';
//     tetromino = getNextTetromino();
//     rAF = requestAnimationFrame(loop);
// });