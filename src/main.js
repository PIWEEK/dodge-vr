import './aabb-collider';
import './hit';
import './move-test';
import './custom-reload';

import { createState } from './utils/state';
createState();

import './actions';

import { loadScene } from './utils/sceneManipulation';

loadScene('/levels/test.html', '/players/default.html');
// loadScene('/levels/main-menu.html', '/players/default.html');
