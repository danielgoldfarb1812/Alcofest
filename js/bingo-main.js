//functions
var createButton = document.getElementById('create');// create button
var resetButton = document.getElementById('reset'); // reset button
const form = document.getElementById(`form`);
const failAudio = new Audio();
failAudio.src = "../Bingo_sounds/mixkit-game-show-buzz-in-3090.wav";
const clearAudio = new Audio();
clearAudio.src = "../Bingo_sounds/mixkit-achievement-bell-600.wav";
const clappingAudio = new Audio();
clappingAudio.src = "../Bingo_sounds/mixkit-audience-light-applause-354.wav";
const booSound = new Audio();
booSound.src = "../Bingo_sounds/Booing-B3-www.fesliyanstudios.com.mp3";
var playerTable = document.getElementById('player_table'); // table element
var invalidInputContainer = document.getElementById('invalid_input_container')
var inputContainer = document.getElementById('input_container')
var gameover = document.getElementById('loss')
var letsPlay = document.getElementById('lets_play')
var container = document.getElementsByClassName('.container')
//buttons Event Listener

var wrongNumberCounter = 0;
var randomsArr = [];
createButton.addEventListener("click",CreateTable)
resetButton.addEventListener('click',Reset);
var exitBtn = document.getElementById(`exit_btn`);
exitBtn.addEventListener(`click`, Reset)
var drawNumberBtn = document.getElementById('draw_number');
var cell = document.getElementById("cell")
var randomNum = 0;
drawNumberBtn.addEventListener("click", GenerateRandomNumber);
var goBtn = document.getElementById("go");
goBtn.addEventListener('click', CheckIfNumberExists);

