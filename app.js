/*
 * Create a list that holds all of your cards
 */
var cards = [
    'fa-diamond','fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor','fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube','fa-cube',
    'fa-leaf','fa-leaf',
    'fa-bicycle','fa-bicycle',
    'fa-bomb','fa-bomb',
    ];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//returns fa and then the card
function generateCard(card){
    return `<li class="card"><i class = "fa ${card}"></i></li>`;
}
//successfully shuffles all cards
function initGame(){
    var deck = document.querySelector(".deck");
    var cardHTML = shuffle(cards).map(function(card){
        console.log("shuffling");
        return generateCard(card);
        

    });

    deck.innerHTML = cardHTML.join('');
    
}

//calls functions to shuffle and play
initGame();
playGame();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function playGame(){
    var OpenCard=[]
    var game_score = 0;
    const everyCard = document.querySelectorAll('.card'); 
    var timePassed = 0;
    
    //listens for a click to add to the list of cards
    everyCard.forEach(function(card){
            
        card.addEventListener('click', function(c){
            if  (isSameCard(this)) {
                console.log(isSameCard(this)); 
                return;
            }
        
            OpenCard.push(card);
            card.classList.add('show', 'open');
                
            //checks for two open cards
            if ((OpenCard.length == 2) ){
                const CardType1 = OpenCard[0].querySelector('i').classList.item(1)
                const CardType2 = OpenCard[1].querySelector('i').classList.item(1)
                console.log(CardType1, CardType2);
                movespassed();
                check_stars();
                
                    
                //compares two cards and checks for a match
                if (CardType1 == CardType2){
                    OpenCard.forEach(function(card){ 
                        card.classList.add('match')
                    });
                    OpenCard = []
                    game_score++;
                }
                //if cards don't match close them
                else{
                    console.log("i'm here")
                    setTimeout(function(){
                        OpenCard.forEach(function(card){ 
                            card.classList.remove('show', 'open')
                        })
                        OpenCard = []
                    },200);
                }
            }
                
                //once you win modal shows up
                if(game_score == 8){
                    console.log("you won");
                    clearInterval(time);
                    modal.style.display = "block";
                }
                 
        });
    });

let moves = document.querySelector(".moves");
//assign # of moves
let movey = 0;

//track time
const timeGone = function(){
    time = setInterval(function(){
        timePassed++;
        document.getElementById("getTime").innerHTML = timePassed;
        document.querySelector(".numberTime").innerHTML = " "+timePassed;
        },1000);
        
}
timeGone();

// Return true if the item is already opened and false if not
function isSameCard(item) {
    const isSame = (item.className === `card show open`) ? true : false;
    return isSame;
}

//get amount of moves passed and update HTML
const movespassed = function(){
    movey++;
    moves.innerHTML = ""+movey;

}
//declaring variables for all types of stars
let stars = document.querySelector(".stars");
let stars2 = document.querySelector(".stars2");
let stars1 = document.querySelector(".stars1");
let checking_stars = 3;
//track moves to change amount of stars
const check_stars = function(){
    if(movey === 15){
        stars.style.display = 'none';
        stars2.style.display = 'inline-block';
        checking_stars = 2;
    
    }
    if(movey === 20){
        stars2.style.display = 'none';
        stars1.style.display = 'inline-block';
        checking_stars= 1;
    }
    document.getElementById("getStars").innerHTML = checking_stars;
    document.getElementById("getMoves").innerHTML = movey;
    
}    
//restart function restart game
let restart = document.querySelector(".restart");
let restartl = document.querySelector(".restartl");
const restart_game = function(){
        movey = 0;
        timePassed= 0;
        stars1.style.display = 'none';
        stars2.style.display = 'none';
        stars.style.display = 'inline-block';
        console.log("restarted");
        everyCard.forEach(function(card){
        card.classList.remove('show', 'open', 'match')
    });
    initGame();
    playGame();    
}

//click restart run restart function    
restart.addEventListener('click', restart_game);
restartl.addEventListener('click', restart_game);
}
//get modal from HTML
var modal = document.getElementById("myModal");

//get span tag from HTML
var span = document.getElementsByClassName("close")[0];

//click on span close modal
span.onclick = function() {
  modal.style.display = "none";
}

//out of modal click=> close modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


