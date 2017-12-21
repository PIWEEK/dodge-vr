import { getState, state, dispatch } from '../utils/state';

AFRAME.registerComponent('player', {
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

    this.orientationEvent();
  },
  orientationEvent: function() {
    this.el.querySelector('.controller-left').addEventListener('ybuttondown', (evt) => {
      let orientation = state.orientation + 90;

      if (orientation === 360) {
        orientation = 0;
      }

      dispatch('setOrientation', orientation);
    });
  }
});
