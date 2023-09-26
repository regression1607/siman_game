let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (!started) {
    console.log("Game is started");
    started = true;
    levelup();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function levelup() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4); // Use 4 to select all buttons
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function checkAns() {
  for (let i = 0; i < userSeq.length; i++) {
    if (userSeq[i] !== gameSeq[i]) {
      h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
      document.body.style.backgroundColor = "red";
      setTimeout(function () {
        document.body.style.backgroundColor = "white";
      }, 100);
      reset();
      return;
    }
  }

  if (userSeq.length === gameSeq.length) {
    setTimeout(levelup, 1000);
  }
}

function btnPress() {
  let btn = this;
  gameFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns();
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  h2.innerText = "Press any key to start the game";
}
