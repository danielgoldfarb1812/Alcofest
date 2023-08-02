function Reset() { // function to refresh  the page
    location.reload();
}
//* function to build the table
function CreateTable() {

    form.style.display = "none";
    invalidInputContainer.children[0].innerHTML = "Strikes left: " + 15
    var tableSize = document.querySelector('input[name="size"]:checked').value; // size of table input from radio buttons
    randomsArr = new Array(tableSize);
    var counterArr = new Array(81);
    for (let i = 0; i < 81; i++) {
        counterArr[i] = 0;
    }
    for (var i = 0; i < tableSize; i++) {
        randomsArr[i] = new Array(tableSize);
        var tr = document.createElement('tr'); // create row each round of i 
        for (var j = 0; j < tableSize; j++) {
            var td = document.createElement('td'); // create cell each round of j
            var theRandomNumber = Math.floor(Math.random() * 9) + 1;
            while (counterArr[theRandomNumber] != 0) {
                theRandomNumber = Math.floor(Math.random() * 9) + 1;
            }
            counterArr[theRandomNumber]++;
            randomsArr[i][j] = theRandomNumber;
            td.value = theRandomNumber;
            tr.appendChild(td);// append cell to row
            td.innerHTML = td.value;
            td.classList.add('td')
        }
        playerTable.appendChild(tr); // append row to table
    }
    playerTable.classList.remove('hide') // make table visibale
    drawNumberBtn.classList.remove('hide')
    goBtn.classList.remove('hide')
    invalidInputContainer.classList.remove('hide')
    cell.classList.remove('hide')
    inputContainer.classList.remove('hide')
    letsPlay.classList.add('hide')
    return randomsArr;
}
//* function to get random number
function GenerateRandomNumber() {
    randomNum = Math.floor(Math.random() * 9) + 1;
    cell.innerText = randomNum;
}
//* when the user click on "בום" button, 
//* function will check if the lottery number is exists at the table
function CheckIfNumberExists() {

    var flag = false;
    var length = randomsArr[0].length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {

            if (randomsArr[i][j] === randomNum) {

                playerTable.children[i].children[j].style.backgroundColor = "green";
                var indexI = Number(i);
                var indexJ = Number(j);
                CheckIfFinished(indexI, indexJ);
                clearAudio.play();
                return
            }
        }
    }
    flag = true;
    if (flag == true) {
        wrongNumberCounter++;

        var text = document.getElementById('invalid_input')
        text.style.border = "4px red solid";
        setTimeout(function () {
            text.style.border = "#0c3005 4px solid"
        }, 200);

        invalidInputContainer.children[0].innerHTML = "Strikes left:" + (15 - wrongNumberCounter)

    }
    if (wrongNumberCounter == 15) {
        GameLoss();
    }
    failAudio.play();
}

//* function to hide the unecessary content, and show the title with the game over
function GameLoss() {
    booSound.play();
    playerTable.style.display = "none";
    gameover.classList.remove('hide');
    var body = document.getElementById('body');
    body.classList.add('losing_background');
    HideElements();
    document.getElementById(`exit_div`).classList.remove(`hide`)
    return
}
//*function to check if the user has finished the game, and if it by row or column*//
function CheckIfFinished(indexI, indexJ) {
    var length = randomsArr[0].length;
    var flagindexI = true;
    var flagindexJ = true;
    var indexJText = "indexJ";
    var indexIText = "indexI";
    for (let i = 0; i < length; i++) {
        if (playerTable.children[indexI].children[i].style.backgroundColor != "green") {
            flagindexI = false;
        }
        if (playerTable.children[i].children[indexJ].style.backgroundColor != "green") {
            flagindexJ = false;
        }
    }
    if (flagindexI == true) {
        GameWin(indexI, indexIText)
    }
    else if (flagindexJ == true) {
        GameWin(indexJ, indexJText)
    }
}
//* function thats get the static index that won, 
//*and a text with the index,
//* to recognize which row or column to mark
function GameWin(index, indextext) {
    var length = randomsArr[0].length;
    if (indextext == "indexJ") {
        clappingAudio.play();
        var body = document.getElementById('body');
        body.classList.add('winning_background');
        playerTable.classList.add('hide');
        HideElements();
        var winningSequence = document.getElementById('winning_sequence');
        var numbers = document.getElementById('numbers');
        var winningTitle = document.getElementById('congratulations_win');
        winningTitle.classList.remove('hide');
        winningSequence.classList.remove('hide');
        numbers.classList.remove('hide');
        winningTitle.classList.add('winningTitleStyle');
        winningSequence.innerHTML += "column";
        for (let i = 0; i < length; i++) {

            setTimeout(function () {
                numbers.innerHTML += playerTable.children[i].children[index].value;
                document.getElementById(`exit_div`).classList.remove(`hide`)
            }, 2000);
        }
    }
    else if (indextext == "indexI") {
        clappingAudio.play();
        playerTable.classList.add('hide');
        var body = document.getElementById('body')
        body.classList.add('winning_background')
        HideElements()
        var winningSequence = document.getElementById('winning_sequence');
        var numbers = document.getElementById('numbers');
        var winningTitle = document.getElementById('congratulations_win');
        winningTitle.classList.remove('hide');
        winningSequence.classList.remove('hide');
        numbers.classList.remove('hide');
        winningTitle.classList.add('winningTitleStyle');
        winningSequence.innerHTML += "row";
        for (let i = 0; i < length; i++) {

            setTimeout(function () {
                numbers.innerHTML += playerTable.children[index].children[i].value;
                document.getElementById(`exit_div`).classList.remove(`hide`)
            }, 2000);
        }
    }

}
function HideElements() {
    drawNumberBtn.classList.add('hide');
    cell.classList.add('hide');
    inputContainer.classList.add('hide');
    goBtn.classList.add('hide');
    invalidInputContainer.classList.add('hide');
}













