//super uzdevums

const gameCards = ['a','b','c','d','a','b','c','d']
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
    card.setAttribute('name', `${randomCardArr[i]}`)
    cardField.appendChild(card) 
    //back face     
    let cardFaceBack = document.createElement("div");
    cardFaceBack.classList.add("card__face");
    cardFaceBack.classList.add("card__face--back");
    cardFaceBack.innerHTML = `${randomCardArr[i]}`;
    card.appendChild(cardFaceBack)

    card.addEventListener('click', (e) => { 
        card.classList.add('is-flipped');
        checkCards(e);
    })
}
//----------------game logic
let winningPairs = 0;
let moves = 0;
let flippedCardCount = 0;
const checkCards = (e: any) => {
    
    const clickedCard = e.target
    clickedCard.classList.add('is-clicked');    
    const flippedCards = document.querySelectorAll('.is-flipped')
    console.log(flippedCards)
    moves+=1
    
    if(flippedCards.length === 2){

        if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
            winningPairs +=2            
            console.log('pareizi')
            console.log('pairs ' + winningPairs)
            flippedCards[0].classList.add('stays-flipped')
            flippedCards[1].classList.add('stays-flipped')
            setTimeout(()=>{
                flippedCards[0].classList.add('stays-on-side')
                flippedCards[1].classList.add('stays-on-side')
            }, 500)
            flippedCards.forEach((x) => x.classList.remove('is-flipped'))  

        } else if (flippedCards[0].getAttribute('name') !== flippedCards[1].getAttribute('name')) {
            setTimeout(() => {
                flippedCards.forEach(card => {
                card.classList.remove('is-clicked')                
                card.classList.remove('is-flipped')
                })
            }, 1000);
            console.log('nav')//test  
        } 
    } else if (flippedCards.length >= 2){
        flippedCards.forEach(card => {
            card.classList.remove('is-flipped')
            card.classList.remove('is-clicked')
        })
    }
//----------------win condition
    if (winningPairs === randomCardArr.length) {
        clearInterval(int);
        setTimeout(() => { 
            console.log('Chicken dinner')//tests;
            cardField.classList.remove('card__field--visible');
            scoreBoard.classList.remove('score__board--invisible')
            scoreTitle.textContent = 'Winner winner chicken dinner!';
            scoreInfo.textContent = `You did it in ${moves} turns`;
            scoreTime.textContent = `it took ${timer.textContent}`;
            giveUpButton.classList.add('button__give-up--hidden');
        }, 2000)
    }
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
let [seconds,minutes,hours] = [0,0,0];
let int: NodeJS.Timer | null = null;
startButton.addEventListener('click', ()=>{
    if(int!==null){
        clearInterval(int);
    }
    int = setInterval(displayTimer,1000);
})

tryAgainButton.addEventListener('click', ()=>{
    clearInterval(int);
    [seconds,minutes,hours] = [0,0,0];
    timer.innerHTML = '00 : 00 : 00 ';
})
const displayTimer = () => {
    seconds+=1;

    if(seconds == 60){
        seconds = 0;
        minutes++;
        if(minutes == 60){
                minutes = 0;
                hours++;
        }
    }
    
    let h = hours < 10 ? '0' + hours : hours;
    let m = minutes < 10 ? '0' + minutes : minutes;
    let s = seconds < 10 ? '0' + seconds : seconds;
    timer.innerHTML = ` ${h} : ${m} : ${s} `;
}

//----------------give up
giveUpButton.addEventListener("click", () => {
    timer.classList.add('timer--hidden')
    clearInterval(int);
    setTimeout(() => {
        cardField.classList.remove('card__field--visible');
        scoreBoard.classList.remove('score__board--invisible');
        scoreTitle.textContent = 'At least You tried!';
        scoreInfo.textContent = `You done ${moves} turns`;
        scoreTime.textContent = `it took ${timer.textContent}`;
        giveUpButton.classList.add('button__give-up--hidden');
    }, 100)
}); 

//----------------restart game
tryAgainButton.addEventListener("click", () => {
    window.location.reload()
});