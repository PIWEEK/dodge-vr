import { registerAction, dispatch } from './utils/state';

registerAction('increaseScore', (state, scoreIncrease) => {
  state.score += scoreIncrease;
});

registerAction('decreaseLives', (state, livesLost) => {
  state.lives -= livesLost;

  // Show game over
  if (state.lives <= 0) {
    document.querySelector('a-text').setAttribute('visible', true);
  }
});

registerAction('vrDisplay', (state, payload) => {
  state.vrDisplay = payload;
});
