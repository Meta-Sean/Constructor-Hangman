//Require the letter function
var Letter = require('./Letter.js');
// Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:
var Word = function(word) {
// An array of new Letter objects representing the letters of the underlying word
this.letterObjArray = [];
// A function that returns a string representing the word. This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
for (var i = 0; i < word.length; i++){
    var letter = new Letter(word[i]);
    this.letterObjArray.push(letter);
}
this.buildWord = function(){
    
    var representingString = '';
    for (var i = 0; i < this.letterObjArray.length; i++){
        
        representingString = representingString + ' ' + this.letterObjArray[i].toString();
        
    }
    console.log(representingString);
}
// A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js)
this.guessWord = function(character){
    for (var i = 0; i < this.letterObjArray.length; i++){
        this.letterObjArray[i].letterGuess(character);
    }
}
}

//Test constructor
// var words = new Word('catsefefe');
// words.buildWord();
// words.guessWord('e');
// words.buildWord();
//console.log(words);

//Export this function
module.exports = Word;