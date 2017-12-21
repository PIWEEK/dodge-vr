import { getState } from '../utils/state';

AFRAME.registerComponent('sound-manager', {
    init: function() {
      getState()
        .map((state) => state.sound)
        .distinctUntilChanged()
        .subscribe((sound) => {
          if (!sound) {
            this.el.removeAttribute('sound');
          } else {
            for (let key of Object.keys(sound)) {
              this.el.setAttribute('sound', key, sound[key]);
            }
          }
        });
    }
  });
