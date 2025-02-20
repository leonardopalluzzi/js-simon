// recupero elementi da html
const formEl = document.getElementById('answers-form')
const numbersListEl = document.getElementById('numbers-list');
const answerFormEl = document.getElementById('answers-form');
const userInput = document.querySelectorAll('.form-control');
const buttonEl = document.querySelector('.btn');

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

// salvare i numeri generati in un array fisso e inserirli in pagina
const generatedNumbers = numbersGenerator();
numbersListEl.innerHTML = generatedNumbers;
console.log(generatedNumbers);

// tenere i numeri a schermo per 30 secondi
setTimeout(() => {
    numbersListEl.classList.add('d-none');
    answerFormEl.classList.remove('d-none');
}, 3000);

// trigger creazione array utente su submit
formEl.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log(getUserNumbers(userInput));

    // confronto tra array e stampa risultato
    console.log(getResults(getUserNumbers(userInput), generatedNumbers));
});




