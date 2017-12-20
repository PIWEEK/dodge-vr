import { getState } from '../utils/state';

AFRAME.registerComponent('score-lives', {
    init: function() {
      getState()
        .map((state) => state.lives)
        .distinctUntilChanged()
        .subscribe((lives) => {
          var livesEl = document.querySelector('#lives');

          if (livesEl) {
            livesEl.setAttribute('value', lives);
          }
        });

      getState()
        .map((state) => state.score)
        .distinctUntilChanged()
        .subscribe((score) => {
          var scoreEl = document.querySelector('#score');

          if (scoreEl) {
            scoreEl.setAttribute('value', score);
          }
        });
    }
  });
