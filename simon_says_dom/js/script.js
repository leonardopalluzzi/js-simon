// gestione generazione numeri, tenerli a schermo per 30 secondi e salvataggio in un array
// recupero elementi da html
// lista per generare items
const numbersListEl = document.getElementById('numbers-list');
const answerFormEl = document.getElementById('answers-form');
const userInput = document.querySelectorAll('.form-control');
const buttonEl = document.querySelector('.btn');

// generare numeri
function numbersGenerator() {
    const numbersList = [];
    for(let i = 0; i < 5; i++){
        let thisNumber = Math.floor(Math.random() * 50);
        numbersList[i] = thisNumber;
    }
    return numbersList;
}

numbersListEl.innerHTML = numbersGenerator();

// tenere i numeri a schermo per 30 secondi
setTimeout(() => {
    numbersListEl.classList.add('d-none');
    answerFormEl.classList.remove('d-none');
}, 3000);
        

// gestine inserimento utente e salvtaggio in array
userInput.addEventListener('input', function () {
    console.log(userInput.value);
});



// confronto tra array e stampa risultato