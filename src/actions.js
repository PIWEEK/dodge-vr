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

registerAction('setIsVr', (state, payload) => {
  state.isVr = payload;
});

registerAction('vrDisplay', (state, payload) => {
  state.vrDisplay = payload;
});

registerAction('setShowScore', (state, payload) => {
  state.showScore = payload;
});

registerAction('setSelectionMode', (state, payload) => {
  state.selectionMode = payload;
});

registerAction('setOrientation', (state, payload) => {
  state.orientation = payload;
});

registerAction('setGamePaused', (state, payload) => {
  state.gamePaused = payload;
});

registerAction('setSound', (state, payload) => {
  state.sound = payload;
});
