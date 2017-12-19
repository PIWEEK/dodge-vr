import { registerAction, dispatch } from './utils/state';

registerAction('increaseScore', (state, payload) => {
  state.score += payload.score;
});
