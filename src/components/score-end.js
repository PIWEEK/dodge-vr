import { getState, state, dispatch } from '../utils/state';
import { loadScene } from '../utils/sceneManipulation';

AFRAME.registerComponent('score-end', {
    init: function() {
      this.el.setAttribute('visible', false);

      getState()
        .map((state) => state.showScore)
        .distinctUntilChanged()
        .subscribe((showScore) => {
          if (showScore) {
            this.el.querySelector('.score-text').setAttribute('value', `Your score: ${state.score}`)
            this.el.setAttribute('visible', true);

            dispatch('setSelectionMode', '.score-end-action');
          } else {
            this.el.setAttribute('visible', false);
          }
        });

      const retry = this.el.querySelector('.retry');
      const quit = this.el.querySelector('.quit');

      [retry, quit].forEach((action) => {
        action.addEventListener('mouseenter', (e) => {
          action.querySelector('a-text').setAttribute('color', 'red');
        });

        action.addEventListener('mouseleave', (e) => {
          action.querySelector('a-text').setAttribute('color', 'white');
        });
      });

      retry.addEventListener('click', (e) => {
        loadScene(state.level);
        dispatch('setShowScore', false);
      });

      quit.addEventListener('click', (e) => {
        dispatch('setLevel', 'main-menu');
        dispatch('setShowScore', false);
      });
    }
  });