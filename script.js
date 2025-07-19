let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");

const muteBtn = document.getElementById("muteBtn");
music.muted = false;  // start unmuted

muteBtn.addEventListener("click", () => {
  music.muted = !music.muted;
  muteBtn.innerText = music.muted ? "Unmute Music 🔈" : "Mute Music 🔊";
});

music.loop = true; // to loop the music continuously
music.play();

let turn = "X";
let isgameover = false;
let mode = localStorage.getItem("mode");
let playerName = localStorage.getItem("playerName");
let difficulty = localStorage.getItem("difficulty") || "medium"; // default difficulty

// Show or hide difficulty selector based on mode
const difficultySelector = document.getElementById("difficultySelector");
if (mode === "single") {
  difficultySelector.style.display = "inline-block";
  difficultySelector.value = difficulty;
} else {
  difficultySelector.style.display = "none";
}

difficultySelector.addEventListener("change", () => {
  difficulty = difficultySelector.value;
  localStorage.setItem("difficulty", difficulty);
});

document.getElementById("player").innerText = playerName || "Player";
document.getElementById("scoreX").innerText = localStorage.getItem("scoreX") || 0;
document.getElementById("scoreO").innerText = localStorage.getItem("scoreO") || 0;

const changeTurn = () => (turn === "X" ? "O" : "X");

// Play background music
window.addEventListener("load", () => {
  music.loop = true;
  music.volume = 0.2;
  music.play().catch(() => {
    console.log("Autoplay blocked. Will play on first interaction.");
  });
});

document.body.addEventListener(
  "click",
  () => {
    if (music.paused) music.play();
  },
  { once: true }
);

// Show winner popup
const showWinnerPopup = (winner) => {
  document.getElementById("popupMessage").innerText = `🎉 ${winner} Won the Game! 🎉`;
  document.getElementById("winnerPopup").style.display = "flex";
  document.getElementById("celebrationGif").style.width = "200px";
};

// Show draw popup
const showDrawPopup = () => {
  document.getElementById("drawPopup").style.display = "flex";
};

// Hide draw popup
const hideDrawPopup = () => {
  document.getElementById("drawPopup").style.display = "none";
};

// Main win-check logic
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let boxes = document.getElementsByClassName("box");
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let won = false;
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText !== "" &&
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[1]].innerText === boxtext[e[2]].innerText
    ) {
      won = true;
      let winner = boxtext[e[0]].innerText;
      document.querySelector(".info").innerText = winner + " Won";
      isgameover = true;
      gameover.play();

      boxes[e[0]].classList.add("highlight");
      boxes[e[1]].classList.add("highlight");
      boxes[e[2]].classList.add("highlight");

      // Show winner popup and update scores
      showWinnerPopup(winner);
      let key = "score" + winner;
      let currentScore = parseInt(localStorage.getItem(key)) || 0;
      localStorage.setItem(key, currentScore + 1);
      document.getElementById(key).innerText = currentScore + 1;
    }
  });

  // If no win and all boxes filled => draw
  if (!won && Array.from(boxtext).every((box) => box.innerText !== "")) {
    document.querySelector(".info").innerText = "It's a Tie!";
    showDrawPopup();
    isgameover = true;
    gameover.play();
  }
};

// Reset game
function resetGame() {
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((el) => (el.innerText = ""));
  Array.from(document.getElementsByClassName("box")).forEach((el) =>
    el.classList.remove("highlight")
  );
  turn = "X";
  isgameover = false;
  document.querySelector(".info").innerText = "Turn for " + turn;
  document.getElementById("celebrationGif").style.width = "0px";
  document.getElementById("winnerPopup").style.display = "none";
  document.getElementById("drawPopup").style.display = "none";
}

// Game box click logic
const boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "" && !isgameover) {
      boxtext.innerText = turn;
      audioTurn.play();
      checkWin();
      if (!isgameover) {
        turn = changeTurn();
        document.querySelector(".info").innerText = "Turn for " + turn;
        if (mode === "single" && turn === "O") {
          aiMove(difficulty);  // Pass difficulty to aiMove (should be handled in ai.js)
        }
      }
    }
  });
});

// Reset button
document.getElementById("reset").addEventListener("click", resetGame);

// Draw popup close button
document.getElementById("drawPopupCloseBtn").addEventListener("click", () => {
  hideDrawPopup();
  resetGame();
});

// Exit button
document.getElementById("exit").addEventListener("click", () => {
  window.location.href = "index.html";
});

// Close winner popup
function closePopup() {
  document.getElementById("winnerPopup").style.display = "none";
}
