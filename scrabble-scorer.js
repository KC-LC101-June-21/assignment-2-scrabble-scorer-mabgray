// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }//points for that letter equals that number
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some scrabble!\n");
  return userWord = input.question("Enter a word to score: ");
  
};

//let points = oldScrabbleScorer(initialPrompt()); 
//console.log(points);

function simpleScore(word) {
	return word.length;
};
let vowels = ["A", "E", "I", "O", "U"];

function vowelBonusScore(word){
  word = word.toUpperCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
    if(vowels.includes(word[i])) {
      letterPoints +=3;
    } else {
      letterPoints++;
    }
 
	}
	return letterPoints;
};



const scoringAlgorithms = [
  {name:"Simple Score",
    description: "Each letter is worth 1 point.",
    scoringFunction: simpleScore
  },
  {name:"Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scoringFunction: vowelBonusScore
  },
  {name:"Scrabble",
    description: "The traditional scoring algorithm.",
    scoringFunction: scrabbleScore
    }
];

function scorerPrompt() {

  console.log("Which scoring algorithm would you like to use?");
  console.log("\n0 - Simple: One point per character");
  console.log("1 - Vowel Bonus: Vowels are worth 3 points")
  console.log("2 - Scrabble: Uses scrabble point system");
  
  let score = input.question("Enter 0, 1, or 2: ");
  return scoringAlgorithms[score];
}

function transform(oldPointStructure) {

  let newPoints = {}
  for( let point in oldPointStructure ){//key on old value on new
    let letters = oldPointStructure[point];//indiv arrays in oldPointStructure
  
    
    for(let i = 0; i < letters.length; i++){
      let letter = letters[i]//grabbing the letter.is the key
      letter = letter.toLowerCase()
      newPoints[letter] = Number(point)// value in the oldPointStructure
  
    }

  }
  return newPoints;
};

let newPointStructure = transform(oldPointStructure);// because transform returns obj
//console.log(typeof newPointStructure);

function scrabbleScore(word) {
  word = word.toLowerCase();//to make it case insensitive
  let score = 0;
  for(let i = 0; i < word.length; i++){
  score += newPointStructure[word[i]];//this is comparing letter to key
  //console.log(word)

   
  }
  return score;
};







function runProgram() {
  word =  initialPrompt();//getting word from here
  score = scorerPrompt();//getting scorer preference
  console.log(`Score for '${word}': ${score.scoringFunction(word)}`);

}

/*console.log("Scrabble scoring values for");
console.log("letter a: ", newPointStructure.A);
console.log("letter j: ", newPointStructure.J);
console.log("letter z: ", newPointStructure["Z"]);*/
/*console.log("Letters with score '4':", oldPointStructure['4']);
console.log("3rd letter within the key '4' array:", oldPointStructure['4'][2]);

let letters = oldPointStructure['8'];
console.log("Letters with score '8':", letters);
console.log("2nd letter within the key '8' array:", letters[1]);*/

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

