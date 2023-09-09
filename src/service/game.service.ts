export class GameService {
    private games: { [gameId: string]: Game } = {};

    createGame(gameId: string, playerOne: string, playerTwo: string) {
        this.games[gameId] = new Game(playerOne, playerTwo);
    }

    getGame(gameId: string) {
        return this.games[gameId];
    }
}

class Game {
    private playerOne: string;
    private playerTwo: string;
    private rounds: number = 0;
    private results: string[] = [];
    private tiebreak: boolean = false;

    constructor(playerOne: string, playerTwo: string) {
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
    }

    playRound(choicePlayerOne: string, choicePlayerTwo: string) {
        const result = determineRoundResult(choicePlayerOne, choicePlayerTwo);
        this.results.push(result);
        this.rounds++;

        if (this.rounds === 4 && !this.isTiebreakRound()) {
            const gameResult = determineGameResult(this.results);
            return gameResult;
        } else if (this.rounds === 4 && this.isTiebreakRound()) {

            this.tiebreak = true;
        }

        if (this.tiebreak) {
            return null;
        }

        return null;
    }

    private isTiebreakRound() {
        const tiebreakRound = this.rounds === 4 && this.results.filter((result) => result === 'tie').length === 3;
        return tiebreakRound;
    }
}

function determineRoundResult(choicePlayerOne: string, choicePlayerTwo: string) {
    // Logika gry: określenie wyniku rundy
    // Możesz dostosować tę logikę do własnych zasad gry
    if (choicePlayerOne === choicePlayerTwo) {
        return 'tie';
    } else if (
        (choicePlayerOne === 'rock' && choicePlayerTwo === 'scissors') ||
        (choicePlayerOne === 'paper' && choicePlayerTwo === 'rock') ||
        (choicePlayerOne === 'scissors' && choicePlayerTwo === 'paper')
    ) {
        return 'playerOne';
    } else {
        return 'playerTwo';
    }
}

function determineGameResult(results: string[]) {

    const playerOneWins = results.filter((result) => result === 'playerOne').length;
    const playerTwoWins = results.filter((result) => result === 'playerTwo').length;

    if (playerOneWins > playerTwoWins) {
        return 'playerOne';
    } else if (playerTwoWins > playerOneWins) {
        return 'playerTwo';
    } else {
        return 'tie';
    }
}

