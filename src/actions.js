import { registerAction, dispatch } from './utils/state';

registerAction('increaseScore', (state, scoreIncrease) => {
  state.score += scoreIncrease;
});
