let playerMoves = 0;
let curentlySeletcet = [];
let gameIsRunning = 'Yes';
let gameCards: string[][] = [
    ['a','b','c','d','e','f'],
    ['a','b','c','d','e','f']
];
let selectedCard = 'a';



let cardField = document.querySelector('.js-card-field');

for (let i = 0; i < 6; i++) {
    let card = document.createElement("div");
    card.innerHTML = `Card element ${i+1}`;
    card.classList.add("card");
    cardField.appendChild(card)    
}




//----------------Game Start
const startButton = document.querySelector(".js-start-button");


startButton.addEventListener("click", () => {
    startButton.classList.add("button__start-game--hidden");
    cardField.classList.add('card__field--visible');
});

