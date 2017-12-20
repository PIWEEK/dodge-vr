import { loadScene } from '../utils/sceneManipulation';

AFRAME.registerComponent('main-menu-level', {
    init: function() {
        const laser = document.querySelector('.laser');
        laser.setAttribute('visible', true);

        setTimeout(() => {
            const controller = document.querySelector('.controller-left');
            laser.setAttribute('raycaster', 'objects', '.begin-action');

            const beginBuntton = document.querySelector('.begin-action');
            const beginBunttonText = beginBuntton.querySelector('a-entity');

            beginBuntton.addEventListener('mouseenter', (e) => {
                beginBunttonText.setAttribute('material', 'color', 'red');
            });

            beginBuntton.addEventListener('mouseleave', (e) => {
                beginBunttonText.setAttribute('material', 'color', '#1fd7d5');
            });

            beginBuntton.addEventListener('click', (e) => {
              document.querySelector('#menu1').setAttribute('visible', false);
                // loadScene('/levels/test.html');
            });
        }, 1000); // TODO WHY?
    }
  });
