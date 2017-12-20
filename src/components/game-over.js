import { getState, state, dispatch } from '../utils/state';
import { loadScene } from '../utils/sceneManipulation';

AFRAME.registerComponent('game-over', {
    init: function() {
      this.el.setAttribute('visible', false);

      getState()
        .map((state) => state.gameOver)
        .distinctUntilChanged()
        .subscribe((gameOver) => {
          if (gameOver) {
            setTimeout(() => {
              this.el.setAttribute('visible', true);
            }, 1000);

            dispatch('setSelectionMode', '.game-over-action');
            loadScene('/levels/game-over.html');
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
        loadScene('/levels/test.html');
      });

      quit.addEventListener('click', (e) => {
        loadScene('/levels/main-menu.html');
      });
    }
  });
