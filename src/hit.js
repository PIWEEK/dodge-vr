import { dispatch } from './utils/state';
import { getState } from './utils/state';

AFRAME.registerComponent('hit', {
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
    },
    play: function () {
      var el = this.el;
      setTimeout(() => {
          el.addEventListener('hit', this.onHit);
      }, 500);
    },

    pause: function () {
      var el = this.el;
      el.removeEventListener('hit', this.onHit);
    },

    onHit: function (evt) {
      var hitEl = evt.detail.el;
      if (!hitEl) return;

      if (hitEl.classList.contains('block') && !hitEl.classList.contains('hit')) {
        // decrease player's lives when a new collision is detected
        hitEl.classList.add('hit');
        dispatch('decreaseLives', 1);

      } else if (hitEl.classList.contains('bonus') && !hitEl.classList.contains('hit')) {
        // the collision is with a bonus block, so, increase the score accordingly
        hitEl.classList.add('hit');
        dispatch('increaseScore', 100);
      }
    }
  });
