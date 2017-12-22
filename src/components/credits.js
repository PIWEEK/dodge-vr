import { dispatch } from '../utils/state';

AFRAME.registerComponent('credits', {
    init: function() {
      setTimeout(() => {
        const animations = document.querySelectorAll('a-animation');

        for (let animation of animations) {
          animation.stop();
        }

        dispatch('setSelectionMode', null);

        requestAnimationFrame(() => {
          dispatch('setLevel', 'main-menu');
        });
      }, 11000);
    }
  });
