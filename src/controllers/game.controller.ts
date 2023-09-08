import express, { Request, Response } from 'express';
import {GameService} from "../service/game.service";
import {Action} from "../framework/type";



const gameService = new GameService();



// Rozpoczęcie nowej gry
const startGame: Action = {
    method: 'post',
    path: '/game',
    action: (request: Request, response: Response) => {
    try {
        const playerOne = request.body.playerOne;
        const playerTwo = request.body.playerTwo;
        const gameId = request.body.gameId;

        if (!playerOne || !playerTwo || !gameId) {
            response.status(200).json({message:'brakuje playerOne lub playerTwo albo game id'});
        }

        gameService.createGame(gameId, playerOne, playerTwo);
        response.status(200).json({ message: 'Game has started' });
    } catch (error) {
        response.status(400).json({ message: 'error' });
    }
    }
}



const GameMove: Action = {
    method: "patch",
    path: "/game",
    action: (request: Request, response: Response) => {
    try {
        const gameId = request.body.gameId;
        const choicePlayerOne = request.body.choicePlayerOne;
        const choicePlayerTwo = request.body.choicePlayerTwo;

        if (!gameId || !choicePlayerOne || !choicePlayerTwo) {
            response.status(200).json({ message: 'brakuje gameid, choiceplayerone albo choiceplayertwo' });
        }

        const game = gameService.getGame(gameId);

        if (!game) {
            response.status(200).json({message: 'nie znalezionogry'});
        }

        const gameResult = game.playRound(choicePlayerOne, choicePlayerTwo);

        if (gameResult) {
            response.status(200).json({ message: 'Game has ended', result: gameResult });
        } else {
            response.status(200).json({ message: 'Round result recorded' });
        }
    } catch (error) {
        response.status(400).json({ message: 'error' });
    }
}}

export default [startGame, GameMove]