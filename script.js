
const loadingScreen =
document.getElementById(
"loadingScreen"
);

window.onload = ()=>{

setTimeout(()=>{

loadingScreen.style.display =
"none";

},2000);

};

const monkey =
document.getElementById(
"monkey"
);

const banana =
document.getElementById(
"banana"
);

const gameContainer =
document.getElementById(
"gameContainer"
);

const scoreEl =
document.getElementById(
"score"
);

const bananasCaughtEl =
document.getElementById(
"bananasCaught"
);

const livesEl =
document.getElementById(
"lives"
);

const levelEl =
document.getElementById(
"level"
);

const missionEl =
document.getElementById(
"mission"
);

const startScreen =
document.getElementById(
"startScreen"
);

const gameOverScreen =
document.getElementById(
"gameOverScreen"
);

const finalText =
document.getElementById(
"finalText"
);

const startBtn =
document.getElementById(
"startBtn"
);

const pauseBtn =
document.getElementById(
"pauseBtn"
);

const leftBtn =
document.getElementById(
"leftBtn"
);

const rightBtn =
document.getElementById(
"rightBtn"
);

const winScreen =
document.getElementById(
"winScreen"
);

const winText =
document.getElementById(
"winText"
);

const nextLevelBtn =
document.getElementById(
"nextLevelBtn"
);

let monkeyX = 100;

let bananaX = 200;
let bananaY = 0;

let score = 0;

let bananasCaught = 0;

let lives = 5;

let level = 1;

let combo = 0;

let bananaSpeed = 4;

let gameRunning = false;

let paused = false;

let missionDone = false;

let animationId;

let rockInterval;

const missions = {

1:{
text:"Catch 10 bananas",
target:10,
type:"catch"
},

2:{
text:"Reach 30 score",
target:30,
type:"score"
},

3:{
text:"Catch 25 bananas",
target:25,
type:"catch"
},

4:{
text:"Reach 60 score",
target:60,
type:"score"
},

5:{
text:"Catch 30 bananas",
target:30,
type:"catch"
},

6:{
text:"Reach 100 score",
target:100,
type:"score"
},

7:{
text:"Catch 50 bananas",
target:50,
type:"catch"
},

8:{
text:"Reach 150 score",
target:150,
type:"score"
},

9:{
text:"Catch 75 bananas",
target:75,
type:"catch"
},

10:{
text:"Reach 200 score",
target:200,
type:"score"
},

11:{
text:"Catch 100 bananas",
target:100,
type:"catch"
},

12:{
text:"Reach 300 score",
target:300,
type:"score"
},


};

missionEl.innerText =
missions[level].text;

function randomBanana(){

bananaX =
Math.random() *
(gameContainer.clientWidth - 80);

bananaY = 0;

banana.style.left =
bananaX + "px";

banana.style.top =
bananaY + "px";

const random =
Math.random();

if(random < 0.1){

banana.innerHTML = "👑🍌";
banana.dataset.points = "10";

}else if(random < 0.3){

banana.innerHTML = "🌟🍌";
banana.dataset.points = "5";

}else if(random < 0.5){

banana.innerHTML = "🔥🍌";
banana.dataset.points = "3";

}else{

banana.innerHTML = "🍌";
banana.dataset.points = "1";

}

}

function createPopup(text,x,y){

const popup =
document.createElement(
"div"
);

popup.className =
"popup";

popup.innerText =
text;

popup.style.left =
x + "px";

popup.style.top =
y + "px";

gameContainer.appendChild(
popup
);

setTimeout(()=>{

popup.remove();

},1000);

}

function missionComplete(){

gameRunning = false;

cancelAnimationFrame(
animationId
);

clearInterval(
rockInterval
);

winText.innerHTML = `
Level ${level} Complete!
`;

winScreen.style.display =
"flex";

}

function checkMission(){

if(missionDone) return;

const currentMission =
missions[level];

if(

currentMission.type ===
"catch" &&

bananasCaught >=
currentMission.target

){

missionDone = true;

missionComplete();

}

if(

currentMission.type ===
"score" &&

score >=
currentMission.target

){

missionDone = true;

missionComplete();

}

}

function createRock(){

const rock =
document.createElement(
"div"
);

rock.className =
"rock";

rock.innerHTML =
"🪨";

let rockX =
Math.random() *
(gameContainer.clientWidth - 80);

let rockY = -50;

rock.style.left =
rockX + "px";

rock.style.position =
"absolute";

gameContainer.appendChild(
rock
);

function moveRock(){

if(!gameRunning) return;

rockY += 6;

rock.style.top =
rockY + "px";

const monkeyRect =
monkey.getBoundingClientRect();

const rockRect =
rock.getBoundingClientRect();

if(

rockRect.bottom >=
monkeyRect.top &&

rockRect.left <
monkeyRect.right &&

rockRect.right >
monkeyRect.left

){

lives--;

combo = 0;

livesEl.textContent =
lives;

createPopup(
"OUCH!",
rockX,
rockY
);

rock.remove();

if(lives <= 0){

endGame();

}

return;

}

if(rockY < 700){

requestAnimationFrame(
moveRock
);

}else{

rock.remove();

}

}

moveRock();

}

function moveBanana(){

if(!gameRunning) return;

bananaY += bananaSpeed;

bananaX += Math.sin(
bananaY * 0.05
) * 2;

banana.style.left =
bananaX + "px";

banana.style.top =
bananaY + "px";

const monkeyRect =
monkey.getBoundingClientRect();

const bananaRect =
banana.getBoundingClientRect();

if(

bananaRect.bottom >=
monkeyRect.top &&

bananaRect.left <
monkeyRect.right &&

bananaRect.right >
monkeyRect.left

){

let points =
parseInt(
banana.dataset.points
);

combo++;

score += points * combo;

bananasCaught++;

scoreEl.textContent =
score;

bananasCaughtEl.textContent =
bananasCaught;

createPopup(
"+" + (points * combo),
bananaX,
bananaY
);

checkMission();

randomBanana();

}

if(bananaY > 520){

combo = 0;

randomBanana();

}

animationId =
requestAnimationFrame(
moveBanana
);

}

function moveMonkey(direction){

if(!gameRunning) return;

if(direction === "left"){

monkeyX -= 35;

}

if(direction === "right"){

monkeyX += 35;

}

monkeyX = Math.max(
0,
Math.min(
monkeyX,
gameContainer.clientWidth - 100
));

monkey.style.left =
monkeyX + "px";

}

document.addEventListener(
"keydown",(e)=>{

if(e.key === "ArrowLeft"){

moveMonkey(
"left"
);

}

if(e.key === "ArrowRight"){

moveMonkey(
"right"
);

}

});

leftBtn.addEventListener(
"touchstart",()=>{

moveMonkey(
"left"
);

});

rightBtn.addEventListener(
"touchstart",()=>{

moveMonkey(
"right"
);

});

pauseBtn.addEventListener(
"click",()=>{

paused = !paused;

if(paused){

gameRunning = false;

cancelAnimationFrame(
animationId
);

pauseBtn.innerText =
"▶ Resume";

createPopup(
"PAUSED",
300,
200
);

}else{

gameRunning = true;

moveBanana();

pauseBtn.innerText =
"⏸ Pause";

createPopup(
"RESUMED",
300,
200
);

}

});

function endGame(){

gameRunning = false;

cancelAnimationFrame(
animationId
);

clearInterval(
rockInterval
);

finalText.innerHTML = `
Final Score:
${score}
`;

gameOverScreen.style.display =
"flex";

}

function startGame(){

startScreen.style.display =
"none";

gameRunning = true;

randomBanana();

moveBanana();

clearInterval(
rockInterval
);

rockInterval =
setInterval(()=>{

if(gameRunning){

createRock();

}

},3000);

}

nextLevelBtn.addEventListener(
"click",()=>{

winScreen.style.display =
"none";

level++;

if(!missions[level]){

winText.innerHTML =
"YOU FINISHED ALL LEVELS!";

winScreen.style.display =
"flex";

return;

}

missionDone = false;

levelEl.textContent =
level;

missionEl.innerText =
missions[level].text;

bananaSpeed += 1;

gameRunning = true;

randomBanana();

moveBanana();

clearInterval(
rockInterval
);

rockInterval =
setInterval(()=>{

if(gameRunning){

createRock();

}

},3000);

});

startBtn.addEventListener(
"click",
startGame);


