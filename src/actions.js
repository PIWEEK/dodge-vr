import { registerAction, dispatch } from './utils/state';

registerAction('setLives', (state, lives) => {
  state.lives = lives;
  state.gameOver = false;
});

registerAction('increaseScore', (state, scoreIncrease) => {
  state.score += scoreIncrease;
});

registerAction('decreaseLives', (state, livesLost) => {
  state.lives -= livesLost;

  if (state.lives <= 0) {
    state.lives = 0;
  }

  state.gameOver = state.lives === 0;
});

registerAction('setGameover', (state, gameover) => {
  state.gameOver = gameover;
});

registerAction('vrDisplay', (state, payload) => {
  state.vrDisplay = payload;
});
