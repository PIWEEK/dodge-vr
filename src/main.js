import './aabb-collider';
import './hit';
import './move';
import './custom-reload';
import './actions';
import './components/score-lives';
import './components/game-over';
import './components/player';
import './components/score-end';
import './components/sound-manager';
import './components/entity-phase';

import './levels/test-level';
import './levels/level-one';
import './levels/level-two';
import './levels/level-three';
import './levels/level-four';
import './levels/main-menu';

import { loadScene } from './utils/sceneManipulation';

import { createState, dispatch, getState } from './utils/state';
createState();

navigator.getVRDisplays().then((vrdisplay) => {
  dispatch('vrDisplay', vrdisplay[0] || {
    stageParameters: {
      sizeX: 2,
      sizeY: 2,
      sizeZ: 2
    }
  });

  dispatch('setIsVr', !!vrdisplay[0]);

  // loadScene('/levels/main-menu.html');
  //loadScene('/levels/level-one.html');
  loadScene('/levels/level-two.html');
  // loadScene('/levels/level-three.html');
  // loadScene('/levels/level-four.html');
  // loadScene('/levels/test.html');
  // loadScene('/levels/game-over.html');
});

setTimeout(() => {
  // document.querySelector('.rs-base.a-hidden').classList.remove('a-hidden');
}, 2000);
