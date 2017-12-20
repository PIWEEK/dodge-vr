import { dispatch, state } from '../utils/state';
import { systemEmmiter } from '../utils/system';
import { startLevel, generateRandomLevel, generateRandomBlock, generateTemplateBlock } from '../generateLevelObjects';

const phases = [
  {
    template: `
      xx--
      xx--
      xx--
      xx--
    `,
    options: {
      delay: 1000
      // speed
      // creationPosition
    }
  },
  {
    template: `
      --xx
      --xx
      --xx
      --xx
    `,
    options: {
      delay: 1000
    }
  },
  {
    template: `
      ----
      ----
      xxxx
      xxxx
    `,
    options: {
      delay: 1000
    }
  },
  {
    template: `
      xxxx
      xxxx
      ----
      ----
    `,
    options: {
      delay: 1000
    }
  },
  {
    template: `
      ---x
      --xx
      -xxx
      xxxx
    `,
    options: {
      delay: 1000
    }
  },
  {
    template: `
      xxxx
      xxx-
      xx--
      x---
    `,
    options: {
      delay: 600
    }
  },
  {
    template: `
      xxxx
      ----
      ----
      xxxx
    `,
    options: {
      delay: 600
    }
  },
  {
    template: `
      xxxx
      --xx
      --xx
      xxxx
    `,
    options: {
      delay: 600
    }
  },
  {
    template: `
      xx--
      xx--
      xxxx
      xxxx
    `,
    options: {
      delay: 500
    }
  },
  {
    template: `
      xx-x
      xx-x
      xx-x
      xx-x
    `,
    options: {
      delay: 400
    }
  }
]

AFRAME.registerComponent('test-level', {
  levelOptions: {
    creationPosition: -50,
    phases: 10,
    speed: [20, 30],
    size: [2, 10],
    interval: [3000, 300]
  },
  init: function() {
    dispatch('setLives', 3);

    document.querySelector('#ground')
    .setAttribute('width', state.vrDisplay.stageParameters.sizeX);

    this.scene = document.querySelector('a-scene');
    this.level = this.scene.querySelector('.level');

    startLevel(this.level, phases, {
      delay: 1000,
      creationPosition: -50,
      speed: 20,
      rowSize: 4,
      columnSize: 4,
      playArea: {
        width: state.vrDisplay.stageParameters.sizeX,
        height: 2
      },
    });
  }
});
