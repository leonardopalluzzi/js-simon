// gestione generazione numeri, tenerli a schermo per 30 secondi e salvataggio in un array
// recupero elementi da html
// lista per generare items
const numbersListEl = document.getElementById('numbers-list');
const answerFormEl = document.getElementById('answers-form');

// generare numeri
numbersListEl.innerHTML = 'ciao;'

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


// confronto tra array e stampa risultato