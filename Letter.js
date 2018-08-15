// Contains a constructor, Letter. This constructor should be able to either display an underlying character or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter. That means the constructor should define:

function Letter(character){
    // A string value to store the underlying character for the letter
    this.character = character.toLowerCase();
    // A boolean value that stores whether that letter has been guessed yet
    // We initally store false because we as
    this.letterCheck = false;
    // A function that returns the underlying character if the letter has been guessed, or a placeholder (like an underscore) if the letter has not been guessed
    this.toString = function(){
        if(this.letterCheck){
            return this.character;
        }else{
            return ('_');
        }
    }
    // A function that takes a character as an argument and checks it against the underlying character, updating the stored boolean value to true if it was guessed correctly
    this.letterGuess = function(char){
        if(this.character === char){
            // If the character arument equals the underlying character we set letterCheck to true.
            this.letterCheck = true;
            //console.log(this.letterCheck);
        }
    }
}


// Creating a test Constructor to test the Letter Constructor Functionality.
// var testConstructor = new Letter('A');
// testConstructor.toString();
// testConstructor.letterBool('a');
// console.log(testConstructor);
// Export the Letter constructor for use in additional files.
module.exports = Letter;
