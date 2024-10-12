'use strict';

let randomizedWord = '';
let maskedWord = '';
let guessCount = 0;

const input = document.querySelector('input');
const output = document.querySelector('output');
const guessCountSpan = document.querySelector('#guessCount');

const words = [
    "programming", "javascript", "database", "markup", "framework",
    "table", "stylesheet", "browser", "javascript", "hypertext"
];

const newGame = () => {
    const random = Math.floor(Math.random() * words.length);
    randomizedWord = words[random];
    maskedWord = "*".repeat(randomizedWord.length);
    output.innerHTML = maskedWord;
    guessCount = 0;
    guessCountSpan.innerHTML = guessCount;
    console.log(`Oikea sana on: ${randomizedWord}`);
};

const replaceFoundChars = (guess) => {
    let newString = '';
    for (let i = 0; i < randomizedWord.length; i++) {
        if (randomizedWord[i] === guess) {
            newString += guess;
        } else {
            newString += maskedWord[i];
        }
    }
    maskedWord = newString;
    output.innerHTML = maskedWord;
};

const win = () => {
    if (maskedWord === randomizedWord) {
        alert(`You have guessed right, the word is ${randomizedWord}`);
        newGame();
    }
};


input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const guess = input.value.toLowerCase();
        if (guess.length === 1 && !maskedWord.includes(guess)) {
            if (randomizedWord.includes(guess)) {
                replaceFoundChars(guess);
                if (maskedWord === randomizedWord) {
                    win();
                }
            } else {
                guessCount++;
                guessCountSpan.innerHTML = guessCount;
            }
        } else if (guess.length === randomizedWord.length && guess === randomizedWord) {
            win();
        } else {
            guessCount++;
            guessCountSpan.innerHTML = guessCount;
        }
        input.value = '';
    }
});

newGame();
