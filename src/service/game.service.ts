
export const generateRandomNumberArray = () => {
    const randomNumberArray = [];
    for (let i = 0; i < 5; i++) {
        const randomNumber = Math.floor(Math.random() * 9) + 1;
        randomNumberArray.push(randomNumber);
    }
    return randomNumberArray;
};


const randomNumberArray = generateRandomNumberArray();

let attempts = 1;

export const checkGuessedNumber = (guessedNumber:string) => {
    const guessedNumberArray = Array.from(guessedNumber, Number);
    const answersArray = [];
    const correctAnswers = ["ok", "ok", "ok", "ok", "ok"];

    for (let i = 0; i < 5; i++) {
        if (guessedNumberArray[i] === randomNumberArray[i]) {
            answersArray.push("ok");
        } else if (guessedNumberArray[i] > randomNumberArray[i]) {
            answersArray.push("za dużo");
        } else if (guessedNumberArray[i] < randomNumberArray[i]) {
            answersArray.push("za mało");
        }
    }

    for (let i = 0; i < correctAnswers.length; i++) {
        if (answersArray[i] !== correctAnswers[i]) {
            attempts++;
            return answersArray;
        }
    }

    return true;
};





