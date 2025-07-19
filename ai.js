function aiMove() {
  let difficulty = localStorage.getItem("difficulty") || "easy";
  if (difficulty === "easy") {
    makeRandomMove();
  } else if (difficulty === "medium") {
    makeMediumMove();
  } else {
    makeBestMove();
  }
}

function makeRandomMove() {
  let boxtexts = document.getElementsByClassName("boxtext");
  let emptyBoxes = [];
  Array.from(boxtexts).forEach((el, idx) => {
    if (el.innerText === "") emptyBoxes.push(idx);
  });
  if (emptyBoxes.length > 0 && !isgameover) {
    let randIdx = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    makeMove(randIdx, "O");
  }
}

function makeMediumMove() {
  let boxtexts = document.getElementsByClassName("boxtext");

  // Try to win
  for (let i = 0; i < 9; i++) {
    if (boxtexts[i].innerText === "") {
      boxtexts[i].innerText = "O";
      if (isWinning("O")) {
        makeMove(i, "O");
        return;
      }
      boxtexts[i].innerText = "";
    }
  }

  // Try to block opponent
  for (let i = 0; i < 9; i++) {
    if (boxtexts[i].innerText === "") {
      boxtexts[i].innerText = "X";
      if (isWinning("X")) {
        boxtexts[i].innerText = "";
        makeMove(i, "O");
        return;
      }
      boxtexts[i].innerText = "";
    }
  }

  // Fallback random move
  makeRandomMove();
}

function isWinning(player) {
  let boxtext = document.getElementsByClassName("boxtext");
  const wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return wins.some(([a, b, c]) => {
    return boxtext[a].innerText === player &&
           boxtext[b].innerText === player &&
           boxtext[c].innerText === player;
  });
}

function makeMove(index, player) {
  setTimeout(() => {
    let boxtexts = document.getElementsByClassName("boxtext");
    if (!isgameover && boxtexts[index].innerText === "") {
      boxtexts[index].innerText = player;
      audioTurn.play();
      checkWin();
      if (!isgameover) {
        turn = "X";
        document.querySelector(".info").innerText = "Turn for " + turn;
      }
    }
  }, 500);
}

function makeBestMove() {
  let bestScore = -Infinity;
  let move;
  let board = Array.from(document.getElementsByClassName("boxtext"), el => el.innerText);

  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = "O";
      let score = minimax(board, 0, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  if (move !== undefined) {
    makeMove(move, "O");
  }
}

function minimax(board, depth, isMaximizing) {
  let result = evaluate(board);
  if (result !== null) return result;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "O";
        best = Math.max(best, minimax(board, depth + 1, false));
        board[i] = "";
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "X";
        best = Math.min(best, minimax(board, depth + 1, true));
        board[i] = "";
      }
    }
    return best;
  }
}

function evaluate(board) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] === "O" ? 10 : -10;
    }
  }

  if (board.every(cell => cell !== "")) return 0;
  return null;
}
