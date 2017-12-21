import { getState } from '../utils/state';

AFRAME.registerComponent('song-manager', {
    init: function() {
      getState()
        .map((state) => state.song)
        .distinctUntilChanged()
        .subscribe((song) => {
          if (!song) {
            this.el.removeAttribute('sound');
          } else {
            for (let key of Object.keys(song)) {
              this.el.setAttribute('sound', key, song[key]);
            }
          }
        });
    }
  });

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
