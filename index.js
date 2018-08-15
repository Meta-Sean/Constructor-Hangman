//Require the Word Constructor
var Word = require('./Word.js');
//Require Inquirer
var inquirer = require('inquirer');
// Array for the word bank.
var wordBank = ['brazil', 'germany', 'italy', 'argentina','spain','england','france','netherlands','urguguay','sweden'];
//Pick a random word from the word bank
var word = wordBank[Math.floor(Math.random() * wordBank.length)];
// Randomly Selects a word and uses the Word constructor to store it
var constructWord = new Word (word);
//Filtered array for hold correct guess objects
var correctObjectArray = [];
//Array for wrong guesses
var wrongLetters = [];
//Variable for the number of guesses left
var guessesLeft = 9;
// We create a function that will pick a new word
function newWord() {
        word = wordBank[Math.floor(Math.random() * wordBank.length)];
        // Randomly Selects a word and uses the Word constructor to store it
        constructWord = new Word (word); 
}
// Prompts the user for each guess and keeps track of the user's remaining guesses
// Use inquirer to take user input until the word is correctly guessed
function makeGuess(){
inquirer
    .prompt([
        {
            type: 'input',
            message: 'Guess a letter between A-Z',
            name: 'userguess'
        }
    ]).then(function(response){
        var character = response.userguess.toLowerCase();
        if(word.indexOf(character) === -1 || character === ''){
        //Log an incorrect with red text
        console.log('\x1b[41m%s\x1b[0m', 'INCORRECT');
        //Decrease guesses left
        guessesLeft--;
        //push to wrong letters array
        wrongLetters.push(character);
        
        }else{
            console.log('\x1b[42m%s\x1b[0m', 'CORRECT');
        }
        // if the user input is null or larger has a length larger than one ask them to enter a proper argument.
        if(response.userguess === '' || response.userguess.length > 1){
            console.log('Please return one letter betwen A-Z')
            console.log('You lose a life.')
        }
         // Run the guessWord method which will change the object value to true if it is guessed
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        constructWord.guessWord(character);
        constructWord.buildWord();
        console.log('Guesses Left: ' + guessesLeft);
        console.log('Wrong Guesses:')
        console.log(wrongLetters);
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        // If the guess equals a character in the objectArray 
        //Filter the letter object array and create array where letter check value is true.
        correctObjectArray = constructWord.letterObjArray.filter(function(arr){
            //console.log(arr);
            return arr.letterCheck === true;
        });
       // console.log(correctObjectArray);
       //Win Condition
        if(correctObjectArray.length === constructWord.letterObjArray.length){
            console.log('You win! Congratulations')
            console.log('The word was: '+word);
            newGame();
            return
        }
        //Loss Condition
        if(guessesLeft <= 0){
            console.log('You lose');
            console.log('The word was: '+word);
            newGame();
            return
        }
        makeGuess();

    });
}
makeGuess();


// After the win or loss condition is met prompt the User to play again or exit with a list using inquirer
//Inquier Play again
function newGame(){
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Would you like to play again?',
                choices: ['Yes, Play Again','Quit Game'],
                name: 'newgame'
            }
        ]).then(function(response){
            if(response.newgame === 'Yes, Play Again'){
                guessesLeft = 9;
                wrongLetters = [];
                correctObjectArray = [];
                newWord();
                makeGuess();
            } else if (response.newgame === 'Quit Game'){
                return 
            }

        })
}