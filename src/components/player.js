import { getState, state, dispatch } from '../utils/state';

AFRAME.registerComponent('player', {
    init: function() {
      getState()
        .map((state) => state.isVr)
        .distinctUntilChanged()
        .subscribe((isVr) => {
          const cursor = document.querySelector('a-cursor');

          if (!isVr) {
            const hands = document.querySelectorAll('[hand-controls]');

            for (let hand of hands) {
              hand.parentNode.removeChild(hand);
            }

            cursor.setAttribute('visible', true);
          } else {
            cursor.setAttribute('visible', false);
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

      getState()
      .map((state) => state.selectionMode)
      .distinctUntilChanged()
      .subscribe((selectionMode) => {
        const laser = this.el.querySelector('.laser');
        if (selectionMode) {
          laser.setAttribute('visible', true);
          laser.setAttribute('raycaster', 'objects', selectionMode);
        } else {
          laser.setAttribute('visible', false);
        }
      });
    
      // rotacion del escenario
      getState()
      .map((state) => state.orientation)
      .distinctUntilChanged()
      .subscribe((orientation) => {
        document.querySelector('.scene-orientation').setAttribute('rotation', `0 ${orientation} 0`);
      });  
      
      this.el.querySelector('.controller-left').addEventListener('ybuttondown', (evt) => {
        let orientation = state.orientation + 90;

        if (orientation === 360) {
          orientation = 0;
        }

        dispatch('setOrientation', orientation);
      });      
    }
  });
