
import {Request, Response} from 'express';
import {Action} from '../framework/type';
import {
    getUserById,
    updateUser
} from '../service/users.service';
  import {checkGuessedNumber, generateRandomNumberArray} from "../service/game.service";



const startGame: Action = {
    method: 'post',
    path: '/game',
    action: (request: Request, response: Response) => {
        let userId = request.header('user_id');

        if (userId) {
            const user = !getUserById(userId.toString());
            if (user) {
                response.json("user doesnt exist");
            }
        }


        if (userId) {
            const user = getUserById(userId);
            if (user.isPlaying) {
                response.json("user is already in game");
            }
        }

        if (userId) {
            const user = getUserById(userId);
            user.isPlaying = true;
            updateUser(user);

            generateRandomNumberArray();
            response.json("game has begun")

        }
    }
}
  let attempts = 1;
  const guessNumber: Action = {
      path: '/game/:number',
      method: 'post',
      action: (request: Request, response: Response) => {
          let userId = request.header("user_id");

          if (userId) {
              const user = !getUserById(userId.toString());
              if (user) {
                  response.json("user doesn't exist!");
              }
          }

          if (userId) {
              const user = getUserById(userId);
              if (!user.isPlaying) {
                  response.json("the game has not started yet");
              }
          }

          if (userId && attempts >= 20) {
              const user = getUserById(userId);
              user.isPlaying = false;
              updateUser(user);
              response.json("you lost");
              attempts = 1;
          } else {
              const guessedNumber = request.params.number;

              let attempts = 1;

              if (userId && (checkGuessedNumber(guessedNumber) == true)) {
                  const user = getUserById(userId);
                  user.isPlaying = false;
                  updateUser(user);
                  response.json("you won! attempts: " + attempts);

              } else {
                  response.json(checkGuessedNumber(guessedNumber));
                  attempts++;
              }
          }
      }
  }









export default [startGame, guessNumber];
