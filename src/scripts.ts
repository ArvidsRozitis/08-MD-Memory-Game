//super uzdevums

const gameCards = ['a','b','c','a','b','c']
const randomCardArr = [...gameCards].sort(() => Math.random() - 0.5);
const scoreBoard = document.querySelector(".js-score-board");
const cardField = document.querySelector('.js-card-field');
const startButton = document.querySelector(".js-start-button");
const tryAgainButton = document.querySelector(".js-try-again-button");
const scoreTitle = document.querySelector(".js-score-title");
const scoreInfo = document.querySelector(".js-score-info");

//----------------makes card field(noskatījos no Jāņa parauga)

for (let i = 0; i < randomCardArr.length; i++) {
    let card = document.createElement("button");
    card.innerHTML = `Card element ${randomCardArr[i]}`;
    card.classList.add("card");
    card.classList.add("js-single-card");
    cardField.appendChild(card)    
}

//----------------Game Start(easy)

startButton.addEventListener("click", () => {
    startButton.classList.add("button--hidden");
    cardField.classList.add('card__field--visible');
});

console.log(randomCardArr)//tests

//----------------card click
//mēģināju ar JsQuery, kaut kas nesanāca, šo man openAi kā dabūt indexu izvēlētam elementam

let indexOfSelectedCard: number;
//izvēlētās kārtis
let selectedCards: number[] = [];
let roundTurn: number = 0;
let guessedCards = 0;

const allCards = document.querySelectorAll(".js-single-card");
//loop cauri visām kārtīm
for (let i = 0; i < allCards.length; i++) {
    //klausamies vai uzspiež un kad uzpiež pefiksējam kuru
    allCards[i].addEventListener("click", (event) => {
    let clickedButton = event.target;
    //dabūnam, kurš indeks nospiests
    let index = Array.prototype.indexOf.call(allCards, clickedButton);
    //bez ši varēja iztikt, likās ka noderēs
    indexOfSelectedCard = index;
    roundTurn++

    selectedCards.push(indexOfSelectedCard)
    allCards[indexOfSelectedCard].classList.add('bg-green')
    allCards[indexOfSelectedCard].setAttribute('disabled','disabled'); 
    
    //pārbaudam vai ir pareizā kombinācija vai nē un rīkojamies  
    
    if ((selectedCards.length === 2) && (randomCardArr[selectedCards[0]] === randomCardArr[selectedCards[1]])) {
        guessedCards+=2
        selectedCards = []        
        console.log('pareizi')//tests;
    } else if ((selectedCards.length == 2) && (randomCardArr[selectedCards[0]] !== randomCardArr[selectedCards[1]])) {
        allCards[selectedCards[0]].removeAttribute('disabled');
        allCards[selectedCards[1]].removeAttribute('disabled');
        allCards[selectedCards[0]].classList.remove('bg-green');
        allCards[selectedCards[1]].classList.remove('bg-green');
        console.log('nav trāpīts')//tests
        selectedCards = []  
    }

    console.log(roundTurn)//tests;
    console.log(selectedCards)//tests;
    
    //win condition
    if (guessedCards === randomCardArr.length) {
        console.log('Chicken dinner')//tests;
        cardField.classList.remove('card__field--visible');
        scoreBoard.classList.remove('score__board--invisible')
        scoreTitle.textContent = 'Winner winner chicken dinner!'
        scoreInfo.textContent = `You did it in ${roundTurn} turns`
    }

  });
}
//----------------restart game
tryAgainButton.addEventListener("click", () => {
    window.location.reload()
});








