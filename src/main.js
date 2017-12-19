import './aabb-collider';
import './hit';
import './move';
import './custom-reload';
import './actions';
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

  loadScene('/levels/test.html', '/players/default.html');
  // loadScene('/levels/main-menu.html', '/players/default.html');
});


