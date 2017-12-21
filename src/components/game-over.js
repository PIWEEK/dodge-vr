import { getState, state, dispatch } from '../utils/state';

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

            this.oldLevel = state.level;
            dispatch('setSelectionMode', '.game-over-action');
            dispatch('setLevel', 'game-over');
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
        dispatch('setLevel', this.oldLevel);
      });

      quit.addEventListener('click', (e) => {
        dispatch('setLevel', 'main-menu');
      });
    }
  });
