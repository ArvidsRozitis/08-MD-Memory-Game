//super uzdevums

const gameCards = ['a','b','c','a','b','c']
const randomCardArr = [...gameCards].sort(() => Math.random() - 0.5);
const scoreBoard = document.querySelector(".js-score-board");
const cardField = document.querySelector('.js-card-field');
const startButton = document.querySelector(".js-start-button");
const tryAgainButton = document.querySelector(".js-try-again-button");
const scoreTitle = document.querySelector(".js-score-title");
const scoreInfo = document.querySelector(".js-score-info");
const scoreTime = document.querySelector(".js-score-time");
const giveUpButton = document.querySelector(".js-button-give-up");
const timer = document.querySelector(".js-timer");

//----------------makes card field(noskatījos no Jāņa parauga)

for (let i = 0; i < randomCardArr.length; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("js-single-card");
    cardField.appendChild(card) 
    //back face     
    let cardFaceBack = document.createElement("div");
    cardFaceBack.classList.add("card__face");
    cardFaceBack.classList.add("card__face--back");
    card.appendChild(cardFaceBack)
    cardFaceBack.innerHTML = `${randomCardArr[i]}`;
}

//----------------Game Start

startButton.addEventListener("click", () => {
    startButton.classList.add("button--hidden");
    cardField.classList.add('card__field--visible');
    giveUpButton.classList.remove('button__give-up--hidden');
    timer.classList.remove('timer--hidden')
});

console.log(randomCardArr)//tests

//----------------timer
let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
let int: NodeJS.Timer | null = null;
startButton.addEventListener('click', ()=>{
    if(int!==null){
        clearInterval(int);
    }
    int = setInterval(displayTimer,10);
});

tryAgainButton.addEventListener('click', ()=>{
    clearInterval(int);
    [milliseconds,seconds,minutes,hours] = [0,0,0,0];
    timer.innerHTML = '00 : 00 : 00 : 000 ';
});
const displayTimer = () => {
    milliseconds+=10;
    if(milliseconds == 1000){
        milliseconds = 0;
        seconds++;
        if(seconds == 60){
            seconds = 0;
            minutes++;
            if(minutes == 60){
                minutes = 0;
                hours++;
            }
        }
    }
 let h = hours < 10 ? '0' + hours : hours;
 let m = minutes < 10 ? '0' + minutes : minutes;
 let s = seconds < 10 ? '0' + seconds : seconds;
 
 timer.innerHTML = ` ${h} : ${m} : ${s} `;
}


//----------------card click
//mēģināju ar JsQuery, kaut kas nesanāca, šo man openAi kā dabūt indexu izvēlētam elementam


//izvēlētās kārtis
let selectedCards: number[] = [];
let roundTurn: number = 0;
let guessedCards = 0;
let gameIsWon = false;

const allCards = document.querySelectorAll(".js-single-card");
//loop cauri visām kārtīm
for (let i = 0; i < allCards.length; i++) {
    //klausamies vai uzspiež un kad uzpiež pefiksējam kuru
    allCards[i].addEventListener("click", (event) => {
        let clickedButton = event.target;
        //dabūnam, kurš indeks nospiests
        let indexOfSelectedCard = Array.prototype.indexOf.call(allCards, clickedButton);
        //bez ši varēja iztikt, likās ka noderēs
        
        roundTurn++
        
        selectedCards.push(indexOfSelectedCard)
        allCards[indexOfSelectedCard].setAttribute('disable','disabled') 
        allCards[indexOfSelectedCard].classList.add('is-inactive')//lai vinu un to pašu neiemestu
        allCards[indexOfSelectedCard].classList.add('is-flipped')
        //pārbaudam vai ir pareizā kombinācija, vai nē un rīkojamies  
        
    if ((selectedCards.length === 2) && (randomCardArr[selectedCards[0]] === randomCardArr[selectedCards[1]])) {
        guessedCards+=2
        selectedCards = []        
        console.log('pareizi')//tests;
    } else if ((selectedCards.length == 2) && (randomCardArr[selectedCards[0]] !== randomCardArr[selectedCards[1]])) {
        allCards.forEach(element => {
            element.classList.add('is-inactive')
        });
        setTimeout(() => {
            allCards.forEach(element => {
                element.classList.remove('is-inactive')
            });        
        allCards[selectedCards[0]].classList.remove('is-flipped');
        allCards[selectedCards[1]].classList.remove('is-flipped');
        console.log('nav trāpīts')//tests
        selectedCards = [] 
        }, 500) 
    }

    console.log(roundTurn)//tests;
    console.log(selectedCards)//tests;

    //win condition
    if (guessedCards === randomCardArr.length) {
        clearInterval(int);
        setTimeout(() => { 
            console.log('Chicken dinner')//tests;
            cardField.classList.remove('card__field--visible');
            scoreBoard.classList.remove('score__board--invisible')
            scoreTitle.textContent = 'Winner winner chicken dinner!';
            scoreInfo.textContent = `You did it in ${roundTurn} turns`;
            scoreTime.textContent = `it took ${timer.textContent}`;
            giveUpButton.classList.add('button__give-up--hidden');
        }, 2000)
    }
  })
}
//----------------restart game
tryAgainButton.addEventListener("click", () => {
    window.location.reload()
});

//----------------give up
giveUpButton.addEventListener("click", () => {
    timer.classList.add('timer--hidden')
    clearInterval(int);
    cardField.classList.remove('card__field--visible');
    scoreBoard.classList.remove('score__board--invisible');
    scoreTitle.textContent = 'At least You tried!';
    scoreInfo.textContent = `You done ${roundTurn} turns`;
    scoreTime.textContent = `it took ${timer.textContent}`;
    giveUpButton.classList.add('button__give-up--hidden');
}); 