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

      if (!this.hitInProgress) {
        this.el.setAttribute('material', 'color: white')

        if (this.el.getAttribute('id') === 'head') {
          const blood = document.querySelector('.player-blood');
          blood.setAttribute('visible', false);
        }
      }

      if (!hitEl) {
        // disable the sound component, in order to reuse it again after a new collision
        dispatch('setSound', null);
        return;
      }

      const parentClass = hitEl.parentNode.classList;

      if (parentClass.contains('entity-phase')) {
        if (!hitEl.parentNode.classList.contains('enable-hit')) return;
      }


      if (this.hitInProgress) {
        this.el.setAttribute('material', 'color: red');

        if (this.el.getAttribute('id') === 'head' && hitEl.classList.contains('block')) {
          const blood = document.querySelector('.player-blood');

          blood.setAttribute('visible', true);
        }
      }

      if (hitEl.classList.contains('block') &&
        !hitEl.parentNode.classList.contains('entityhit') &&
        !hitEl.classList.contains('hit')) {

        // decrease player's lives when a new collision is detected
        hitEl.classList.add('hit');
        hitEl.parentNode.classList.add('entityhit')
        dispatch('decreaseLives', 1);

        // and play a hit sound
        dispatch('setSound', {
          src: '#hit',
          autoplay: true,
          loop: false});

      } else if (hitEl.classList.contains('bonus') && !hitEl.classList.contains('hit')) {
        // the collision is with a bonus block, so, increase the score accordingly
        hitEl.setAttribute('visible', false);
        hitEl.classList.add('hit');
        dispatch('increaseScore', 100);

        // and play the bonus sound
        dispatch('setSound', {
        src: '#bonus',
        autoplay: true,
        loop: false});
      }
    }
  });
