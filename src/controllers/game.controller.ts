import { Request, Response } from 'express';
import { Action } from '../framework/type';
import { getUserById, updateUser } from '../service/users.service';
import { checkGuessedNumber, generateRandomNumberArray } from "../service/game.service";

const startGame: Action = {
    method: 'post',
    path: '/game',
    action: (request: Request, response: Response) => {
        const userId = request.header('user_id');

        if (!userId) {
            return response.json("Missing user ID in headers");
        }

        const user = getUserById(userId);

        if (!user) {
            return response.json("User doesn't exist");
        }

        if (user.isPlaying) {
            return response.json("User is already in a game");
        }

        user.isPlaying = true;
        updateUser(user);
        generateRandomNumberArray();
        response.json("Game has begun");
    }
};

let attempts = 1;

const guessNumber: Action = {
    path: '/game/:number',
    method: 'post',
    action: (request: Request, response: Response) => {
        const userId = request.header("user_id");

        if (!userId) {
            return response.json("missing user ID in headers");
        }

        const user = getUserById(userId);

        if (!user) {
            return response.json("user doesn't exist");
        }

        if (!user.isPlaying) {
            return response.json("the game has not started yet");
        }

        const guessedNumber = request.params.number;

        if (attempts >= 20) {
            user.isPlaying = false;
            updateUser(user);
            attempts = 1;
            return response.json("you lost");
        }

        if (checkGuessedNumber(guessedNumber)) {
            user.isPlaying = false;
            updateUser(user);
            return response.json(`you won! attempts: ` + attempts);
        }

        attempts++;
        response.json("wrong guess");
    }
};

export default [startGame, guessNumber];