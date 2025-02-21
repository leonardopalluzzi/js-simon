// recupero elementi da html
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


// funzione di assegnazione tempo
function time(timeChoice) {
    const currentTime = Number(timeChoice.value * 1000);
    console.log(currentTime);
    
    return currentTime;
}

// funzione per generare numeri
function numbersGenerator() {
    const numberList = [];
    let euqalNumbers = 0;
    for (let i = 0; i < 5; i++) {
        let thisNumber;
        let uniqueFlag = true;

        // previene valori uguali nell'array generato
        do {
            thisNumber = Math.floor(Math.random() * 50);

            for (let j = 0; j < numberList.length; j++) {
                if (numberList[j] == thisNumber) {
                    euqalNumbers++;
                    uniqueFlag = false;
                    break;
                } else {
                    uniqueFlag = true;
                }
            }
        } while (uniqueFlag == false);

        numberList[i] = thisNumber;
    }
    console.log(euqalNumbers);

    return numberList;
}

// funzione per prendere i valori inseriti dall'utente e crearne un array;
function getUserNumbers(arr) {
    const userNumberList = [];
    for (let i = 0; i < userInput.length; i++) {
        const thisNumber = arr[i].value;
        userNumberList[i] = Number(thisNumber);
    }
    return userNumberList;
}

function inputCheck(userNumbers, userArray) {
    let message = '';
    let errorFlag = 0;
    for (let i = 0; i < userNumbers.length; i++) {
        let inputElement = userArray[i];
        let currentNumber = userNumbers[i];
        // controlla che non ci siano due valori uguali
        for (let j = i + 1; j < userNumbers.length; j++) {
            if (currentNumber == userNumbers[j]) {
                errorFlag = 3;
            }
        }
        // controlla che venga inserito un numero e non altro input
        if (isNaN(currentNumber)) {
            errorFlag = 1;
            // controlla che il form non venga hackerato per il required
        } else if (!inputElement.hasAttribute('required')) {
            errorFlag = 2;
        }
    }
    return errorFlag;
}

// funzione per confrontare gli array e calcolare il risultato
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


mainText.classList.add('d-none')

// start button
startForm.addEventListener('submit', function (e) {
    e.preventDefault();
    startBtn.classList.add('d-none');
    timeSelector.classList.add('d-none');
    mainText.classList.remove('d-none');

    // salvare i numeri generati in un array fisso e inserirli in pagina
    const generatedNumbers = numbersGenerator();
    numbersListEl.innerHTML = generatedNumbers;
    console.log(generatedNumbers);

    // tenere i numeri a schermo per 30 secondi
    setTimeout(() => {
        numbersListEl.classList.add('d-none');
        answerFormEl.classList.remove('d-none');
        mainText.innerHTML = 'inserici i numeri che hai visto poco fa';

    }, time(timeValue));
})


// trigger creazione array utente su submit
formEl.addEventListener('submit', function handler(e) {
    e.preventDefault();
    console.log(getUserNumbers(userInput));

    // confronto tra array e stampa risultato
    console.log(getResults(getUserNumbers(userInput), generatedNumbers));
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
    console.log(inputCheck(getUserNumbers(userInput), userInput));
    mainText.innerHTML = `hai indovinato ${getResults(getUserNumbers(userInput), generatedNumbers)} numeri`
    buttonEl.innerHTML = 'Gioca di nuovo';
    inputBox.classList.add('d-none');
    formEl.removeEventListener('submit', handler);
});