// Funkcja generująca tablicę pięciu losowych liczb całkowitych od 1 do 9
export const generateRandomNumberArray = () => {
    const randomNumberArray = [];

    for (let i = 0; i < 5; i++) {
        const randomNumber = Math.floor(Math.random() * 9) + 1;
        randomNumberArray.push(randomNumber);
    }

    return randomNumberArray;
};

// Tworzenie tablicy z losowymi liczbami i zmienna przechowująca liczbę prób
const randomNumberArray = generateRandomNumberArray();
let triesNumber = 1;

// Funkcja sprawdzająca, czy podana liczba zgadza się z wylosowanymi liczbami
export const checkGuessedNumber = (guessedNumber: string) => {
    const playersNumberArray = Array.from(guessedNumber, Number);
    let answersArray: any[];
    answersArray = [];
    const correctAnswers = ["ok", "ok", "ok", "ok", "ok"];

    playersNumberArray.forEach((playerNumber, i) => {
        if (playerNumber === randomNumberArray[i]) {
            answersArray.push("ok");
        } else if (playerNumber > randomNumberArray[i]) {
            answersArray.push("za dużo");
        } else if (playerNumber < randomNumberArray[i]) {
            answersArray.push("za mało");
        }
    });

    if (answersArray.join("") !== correctAnswers.join("")) {
        triesNumber++;
        return answersArray;
    }

    return true;
};