import { dispatch } from './utils/state';

AFRAME.registerComponent('hit', {
    hitInProgress: false,
    play: function () {
      var el = this.el;
      setTimeout(() => {
          el.addEventListener('hit', this.onHit.bind(this));
      }, 500);
    },

    pause: function () {
      var el = this.el;
      el.removeEventListener('hit', this.onHit.bind(this));
    },

    onHit: function (evt) {
      var hitEl = evt.detail.el;

      this.hitInProgress = !!hitEl;

      if (this.hitInProgress) {
        this.el.setAttribute('material', 'color: red')
      } else {
        this.el.setAttribute('material', 'color: white')
      }

      if (this.el.getAttribute('id') === 'head') {
        const blood = document.querySelector('.player-blood');
        
        if (this.hitInProgress) {
          blood.setAttribute('visible', true);
        } else {
          blood.setAttribute('visible', false);
        }
      }

      if (!hitEl) return;

      if (
        hitEl.classList.contains('block') &&
        !hitEl.parentNode.classList.contains('entityhit') &&
        !hitEl.classList.contains('hit')) {
        // decrease player's lives when a new collision is detected
        hitEl.classList.add('hit');
        hitEl.parentNode.classList.add('entityhit')
        dispatch('decreaseLives', 1);

      } else if (hitEl.classList.contains('bonus') && !hitEl.classList.contains('hit')) {
        // the collision is with a bonus block, so, increase the score accordingly
        hitEl.classList.add('hit');
        dispatch('increaseScore', 100);
      }
    }
  });
