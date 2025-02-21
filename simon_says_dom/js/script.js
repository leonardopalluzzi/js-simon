// data recover from HTML
const formEl = document.getElementById('answers-form')
const numbersListEl = document.getElementById('numbers-list');
const answerFormEl = document.getElementById('answers-form');
const userInput = document.querySelectorAll('.form-control');
const buttonEl = document.querySelector('.btn');
const mainText = document.getElementById('instructions');
const inputBox = document.getElementById('input-group');
const startBtn = document.querySelector('.start_game');
const startForm = document.querySelector('.start_form');
const timeValue = document.querySelector('.form-select');
const timeSelector = document.querySelector('.select');
const progressBarEl = document.querySelector('.progress-bar');
const porogressContainer = document.querySelector('.progress_bar_container');



/**
 * time assignement function
 * @param {object} timeChoice 
 * @returns {number} time for interval and timeout set
 */
function time(timeChoice) {
    const currentTime = Number(timeChoice.value * 1000);
    //console.log(currentTime); // log for develop check

    return currentTime;
}


/**
 * time select required attribute check funciton
 * @param {object} timeSelect 
 * @returns  {boolean} check if the required attribute has been canceled from html
 */
function timeSelectCheck(timeSelect) {
    let flag = true;
    if (!timeSelect.hasAttribute('required')) {
        flag = false
    }
    return flag;
}


/**
 * numbers generator function
 * @returns {array} list of random generated unequal numbers
 */
function numbersGenerator() {
    const numberList = [];

    for (let i = 0; i < 5; i++) {
        let thisNumber;
        let uniqueFlag = true;

        // check for double values in the array
        do {
            thisNumber = Math.floor(Math.random() * 50);

            for (let j = 0; j < numberList.length; j++) {
                if (numberList[j] == thisNumber) {
                    uniqueFlag = false;
                    break;
                } else {
                    uniqueFlag = true;
                }
            }

        // repeat as long as uniqueFlag = false
        } while (uniqueFlag == false); 

        // push number in the array if there are no doubles
        numberList[i] = thisNumber; 
    }
    //console.log(euqalNumbers); // log for develop check

    return numberList;
}


/**
 * create array function from user inputs
 * @param {NodeList} arr 
 * @returns {array} returns an array with the user values starting from the input nodelist
 */
function getUserNumbers(arr) {
    const userNumberList = [];
    for (let i = 0; i < userInput.length; i++) {
        const thisNumber = arr[i].value;
        userNumberList[i] = Number(thisNumber);
    }
    return userNumberList;
}



/**
 * input check function and form hacking check
 * @param {array} userNumbers 
 * @param {NodeList} userArray 
 * @returns {number} return a code from 0 to 3 based on the error capted by the function
 */
function inputCheck(userNumbers, userArray) {
    let errorFlag = 0;
    for (let i = 0; i < userNumbers.length; i++) {
        let inputElement = userArray[i];
        let currentNumber = userNumbers[i];

        // double value check
        for (let j = i + 1; j < userNumbers.length; j++) {
            if (currentNumber == userNumbers[j]) {
                errorFlag = 3;
            }
        }

        // type value check
        if (isNaN(currentNumber)) {
            errorFlag = 1;

        // required attribute on form check
        } else if (!inputElement.hasAttribute('required')) {
            errorFlag = 2;
        }
    }
    return errorFlag;
}


/**
 * array confront and result calc
 * @param {array} userArr 
 * @param {object} initialArr 
 * @returns {number} returns the value of right guesses made by the user after array confront
 */
function getResults(userArr, initialArr) {
    let rightCounter = 0
    for (let i = 0; i < userArr.length; i++) {
        let userNumber = userArr[i];
        for (let j = 0; j < initialArr.length; j++) {
            let initialNumber = initialArr[j];
            if (userNumber == initialNumber) {
                rightCounter++;
            }
        }
    }
    return rightCounter;
}


//FUNCTION RECALL

// hide main text
mainText.classList.add('d-none')

// start button
startForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    // hacking check on time select
    if (timeSelectCheck(timeValue) == false) {
        alert('per favore non hackerare il form');
        location.reload();
        location.reload();
    }
    let barWidth = 100;
    let timer;

    // time bar
    porogressContainer.classList.remove('d-none');
    timer = setInterval(() => {
        if (barWidth == 0) {
            progressBarEl.classList.add('bg-danger');
            clearInterval(timer);
        } else {
            barWidth--;
            progressBarEl.style.width = `${barWidth}%`;
        }

    }, (time(timeValue) / 115));

    // page layout adjust
    startBtn.classList.add('d-none');
    timeSelector.classList.add('d-none');
    mainText.classList.remove('d-none');

    // push generated number into an array and show them in page
    const generatedNumbers = numbersGenerator();
    
    numbersListEl.innerHTML = generatedNumbers;
    //console.log(generatedNumbers); // log for develop check

    // keep number on screen for selected amount of time
    setTimeout(() => {
        numbersListEl.classList.add('d-none');
        answerFormEl.classList.remove('d-none');
        mainText.innerHTML = 'inserici i numeri che hai visto poco fa';
        porogressContainer.classList.add('d-none');


    }, time(timeValue));
})


// array creation triger on submit input (funciton recall)
formEl.addEventListener('submit', function handler(e) {
    e.preventDefault();
    //console.log(getUserNumbers(userInput)); // log for develop check

    // array confront function recall, input check function recall and result print

    //console.log(getResults(getUserNumbers(userInput), generatedNumbers)); // log for develop check
    if (inputCheck(getUserNumbers(userInput), userInput) == 1) {
        alert('per favore, non mi hackerare il form ed inserisci solo numeri');
        location.reload();
        location.reload();
    } else if (inputCheck(getUserNumbers(userInput), userInput) == 2) {
        alert('per favore non mi hackerare il form');
        location.reload();
        location.reload();
    } else if (inputCheck(getUserNumbers(userInput), userInput) == 3) {
        alert('non inserire due valori uguali');
        location.reload();
        location.reload();
    }

    //console.log(inputCheck(getUserNumbers(userInput), userInput)); // log for develop check
    mainText.innerHTML = `hai indovinato ${getResults(getUserNumbers(userInput), generatedNumbers)} numeri`
    buttonEl.innerHTML = 'Gioca di nuovo';
    inputBox.classList.add('d-none');
    formEl.removeEventListener('submit', handler);
});