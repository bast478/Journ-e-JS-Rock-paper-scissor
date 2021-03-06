// Récupération des éléments

// Opacitée fond RULES
const header = document.querySelector('header');
const main = document.querySelector('main');
const section = document.querySelector('section.extra');
// RULES Btn
const btnRules = document.querySelector('.rules-btn');

// RULES component
const rulesDiv = document.querySelector('aside');
btnRules.addEventListener('click', function(){
    rulesDiv.style.opacity = "1";
    rulesDiv.style.zIndex = "0";
    document.body.style.backgroundColor = "hsl(237, 49%, 8%)";
    header.style.opacity = "0.5";
    main.style.opacity = "0.5";
    section.style.opacity = "0.5";
});
const rulesClose = document.querySelector('.close-rules');
rulesClose.addEventListener('click', function(){
    rulesDiv.style.opacity = "0";
    rulesDiv.style.zIndex = "-1";
    document.body.style.backgroundColor = "var(--background)";
    header.style.opacity = "1";
    main.style.opacity = "1";
    section.style.opacity = "1";


});

// GAME components
const paper = document.querySelector('.paper');
const scissors = document.querySelector('.scissors');
const rock = document.querySelector('.rock');

// All components
const hands = document.querySelectorAll('.option-container');

// GAME DIV
const gameStep1 = document.querySelector('.step-1');
const gameStep2 = document.querySelector('.step-2');

const playerPick = document.querySelector('.player-pick');
const computerPick = document.querySelector('.computer-pick');
const computerLast = computerPick.lastElementChild;

const annouceDiv = document.querySelector('.annouce-winner');

// Play again btn
const btnAgain = document.querySelector('.play-again-btn');

const myArray = [paper, scissors, rock];

const score = document.getElementById('score');

annouceDiv.style.transform = "scale(0)";
annouceDiv.style.transition = "transform 350ms linear";
computerLast.style.transform = 'scale(0)';

let i = 0;
if (localStorage.getItem('score') != null){
    i = localStorage.getItem('score');
    score.innerText = i;
}

myArray.forEach(item => {
    item.addEventListener('click', function(){

        const playerLast = playerPick.lastElementChild;
        playerLast.classList.remove(playerLast.classList[1]);
        playerLast.classList.add(item.classList[1]);

        const imgAdressUser = `icon-${item.classList[1]}.svg`;
        playerLast.innerHTML = `<div class="option"><img src="${imgAdressUser}" alt="option"></div>`;
        
        var rand = Math.floor(Math.random()*myArray.length);
        var rValue = myArray[rand];
    
        computerLast.classList.remove(computerLast.classList[1]);
        computerLast.classList.add(rValue.classList[1]);
        
        const imgAdressComputer = `icon-${rValue.classList[1]}.svg`;
        computerLast.innerHTML = `<div class="option"><img src="${imgAdressComputer}" alt="option"></div>`;

        const announce = document.querySelector('.annouce-winner-text');

        if ((item == paper && rValue == scissors) || (item == scissors && rValue == rock) || (item == rock && rValue == paper)) {
            announce.innerText = "YOU LOSE";
            i--;
        } else if ((item == paper && rValue == rock) || (item == scissors && rValue == paper) || (item == rock && rValue == scissors)) {
            announce.innerText = "YOU WIN";
            i++;
        } else {
            announce.innerText = "EQUALITY";
        }

        localStorage.setItem('score', i);

        gameStep2.classList.add('step-2-minimizer');
        gameStep1.style.display ='none';

        setTimeout(afficherMainComputer, 1100);
        function afficherMainComputer() {
            computerLast.style.transform = 'scale(1.2, 1.2)';
        }
        
        setTimeout(afficherGagnant, 1800);
        function afficherGagnant() {
            annouceDiv.style.transform = "scale(1,1)";
        }

        setTimeout(afficherScore, 2200);
        function afficherScore() {
            score.innerText = i;
        }

        btnAgain.addEventListener('click', function(){
            gameStep2.classList.remove('step-2-minimizer');
            gameStep1.style.display ='block';
            annouceDiv.style.transform = "scale(0)";
            computerLast.style.transform = 'scale(0)';
        });

    });
});