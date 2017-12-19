import { loadScene } from './utils/sceneManipulation';

AFRAME.registerComponent('custom-reload', {
  play: function() {
    if (this.el) {
      this.el.addEventListener('xbuttondown', (evt) => {
        // loadScene('/levels/test.html', '/players/default.html');
        window.location.reload();
      });
    }
  }
});
