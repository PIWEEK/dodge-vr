import './aabb-collider';
import './hit';
import './move';
import './custom-reload';
import './actions';
import './components/delete-behind';
import './components/score-lives';
import './components/game-over';

import './levels/test-level';
import './levels/main-menu';

import { loadScene } from './utils/sceneManipulation';

import { createState, dispatch } from './utils/state';
createState();

navigator.getVRDisplays().then((vrdisplay) => {
  dispatch('vrDisplay', vrdisplay[0] || {
    stageParameters: {
      sizeX: 2,
      sizeY: 2,
      sizeZ: 2
    }
  });

  // hide hands if no vr

  if (!vrdisplay[0]) {
    for (let hand of document.querySelectorAll('[hand-controls]')) {
      hand.parentNode.removeChild(hand);
    }
  }

  loadScene('/levels/main-menu.html');
  // loadScene('/levels/test.html');
  // loadScene('/levels/game-over.html');
});


