import { registerAction, dispatch } from './utils/state';

registerAction('increaseScore', (state, scoreIncrease) => {
  state.score += scoreIncrease;
});

registerAction('vrDisplay', (state, payload) => {
  state.vrDisplay = payload;
});
