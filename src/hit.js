import { dispatch } from './utils/state';
import { getState } from './utils/state';

AFRAME.registerComponent('hit', {
    init: function() {
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

      if (!hitEl.classList.contains('hit') && !hitEl.classList.contains('bonus') ) {
        // decrease player's life when a new collision is detected
        document.querySelector('a-text').setAttribute('visible', true);

        hitEl.classList.add('hit');
        var lifes = document.querySelector('#lifes');
        var oneLessLife = parseInt(lifes.getAttribute('value'))-1;
        lifes.setAttribute('value',(oneLessLife));

      } else if (hitEl.classList.contains('bonus') && !hitEl.classList.contains('hit')) {
        // the collision is a bonus, so, increase the score accordingly
        hitEl.classList.add('hit');
        dispatch('increaseScore', 100);
        }
      }
  });
