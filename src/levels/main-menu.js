import { loadScene } from '../utils/sceneManipulation';
import { dispatch } from '../utils/state';

AFRAME.registerComponent('main-menu-level', {
    init: function() {
        dispatch('setGameover', false);
        
        setTimeout(() => {
          const controller = document.querySelector('.controller-left');
          dispatch('setSelectionMode', '.begin-action');

          const beginButton = document.querySelector('.begin-action');
          const beginButtonText = beginButton.querySelector('a-entity');

          beginButton.addEventListener('mouseenter', (e) => {
              beginButtonText.setAttribute('material', 'color', 'red');
          });

          beginButton.addEventListener('mouseleave', (e) => {
              beginButtonText.setAttribute('material', 'color', '#1fd7d5');
          });

          beginButton.addEventListener('click', (e) => {
            document.querySelector('#menu1').setAttribute('visible', false);

            document.querySelector('#menu2').setAttribute('visible', true);

            dispatch('setSelectionMode', '.level-action');
          });

          const levelsButton = document.querySelectorAll('.level-action');

          for (let level of levelsButton) {
            let button = level.querySelector('.text');

            level.addEventListener('mouseenter', (e) => {
              button.setAttribute('material', 'color', 'red');
            });

            level.addEventListener('mouseleave', (e) => {
              button.setAttribute('material', 'color', 'white');
            });

            level.addEventListener('click', (e) => {
              dispatch('setSelectionMode', null);
              loadScene('/levels/test.html');
              
            });
          }

        }, 1000); // TODO WHY?
    }
  });
