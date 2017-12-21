import { getState, state, dispatch } from '../utils/state';
import { loadScene } from '../utils/sceneManipulation';

AFRAME.registerComponent('player', {
  init: function() {
    getState()
    .map((state) => state.isVr)
    .distinctUntilChanged()
    .subscribe((isVr) => {
      const cursor = document.querySelector('a-cursor');

      if (!isVr) {
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

    getState()
      .map((state) => state.gamePaused)
      .distinctUntilChanged()
      .subscribe((gamePaused) => {
        var entityLevel = document.querySelector('.level');
        if (entityLevel) {
          gamePaused ? entityLevel.pause() : entityLevel.play();
        }
      });

    // rotacion del escenario
    getState()
    .map((state) => state.orientation)
    .distinctUntilChanged()
    .subscribe((orientation) => {
      document.querySelector('.scene-orientation').setAttribute('rotation', `0 ${orientation} 0`);
    });

    getState()
    .map((state) => state.level)
    .distinctUntilChanged()
    .subscribe((level) => {
      loadScene(`/levels/${level}.html`);
    });    

    this.orientationEvent();
    this.pauseEvent();
  },
  orientationEvent: function() {
    this.el.querySelector('.controller-left').addEventListener('ybuttondown', (evt) => {
      let orientation = state.orientation + 90;

      if (orientation === 360) {
        orientation = 0;
      }

      dispatch('setOrientation', orientation);
    });
  },
  pauseEvent: function() {
    this.el.querySelector('.controller-right').addEventListener('abuttondown', (evt) => {
      let gamePaused = state.gamePaused;
      dispatch('setGamePaused', !gamePaused);
    });
  }
});
