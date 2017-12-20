import './aabb-collider';
import './hit';
import './move';
import './custom-reload';
import './actions';
import './components/delete-behind';

import './levels/test-level';
import './levels/main-menu';

import { loadScene } from './utils/sceneManipulation';

import { createState, dispatch } from './utils/state';

require('aframe-physics-system');
createState();

navigator.getVRDisplays().then((vrdisplay) => {
  dispatch('vrDisplay', vrdisplay[0] || {
    stageParameters: {
      sizeX: 2,
      sizeY: 2,
      sizeZ: 2
    }
  });

  loadScene('/levels/test2.html');
  // loadScene('/levels/main-menu.html');
});


