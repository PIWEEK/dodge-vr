import { dispatch, state } from '../utils/state';
import { systemEmmiter } from '../utils/system';
import { startLevel, generateRandomLevel, generateRandomBlock, generateTemplateBlock } from '../generateLevelObjects';

const phases = [
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
      ----
      ---x
      --xx
      -xxx
    `,
    options: {
      delay: 1000
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
      delay: 800
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
      delay: 800
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
      delay: 800
    }
  },
  {
    template: `
      ----
      --p-
      ----
      ----
    `,
    options: {
      delay: 400
    }
  },
  {
    template: `
      ---p
      ----
      ----
      ----
    `,
    options: {
      delay: 400
    }
  },
  {
    template: `
      ----
      ---p
      ----
      ----
    `,
    options: {
      delay: 400
    }
  },
  {
    template: `
      ----
      ----
      ---p
      ----
    `,
    options: {
      delay: 400
    }
  },
  {
    template: `
      ----
      ----
      ----
      -p--
    `,
    options: {
      delay: 400
    }
  },
  {
    template: `
      ----
      -p--
      ----
      ----
    `,
    options: {
      delay: 1000
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
      delay: 800
    }
  },
  {
    template: `
      x-xx
      x-xx
      x-xx
      x-xx
    `,
    options: {
      delay: 1100
    }
  },
  {
    template: `
      -xxx
      -xxx
      -xxx
      -xxx
    `,
    options: {
      delay: 900
    }
  },
  {
    template: `
      ----
      --p-
      --p-
      ----
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
      delay: 800
    }
  },
  {
    template: `
      x-x-
      x-x-
      x-x-
      x-x-
    `,
    options: {
      delay: 1000
    }
  },
  {
    template: `
      -x-x
      -x-x
      -x-x
      -x-x
    `,
    options: {
      delay: 1500
    }
  },
  {
    template: `
      xxxxx
      x---x
      x---x
      x---x
      x---x
      xxxxx
    `,
    options: {
      delay: 500,
      depth: 17,
      opacity: 1
    }
  },
  {
    template: `
      x---x
      x---x
      x---x
      xxxxx
      xxxxx
      xxxxx
    `,
    options: {
      delay: 500,
      depth: 15,
      opacity: 1
      
    }
  },
  {
    template: `
      xx---
      xx---
      xx---
      xxxxx
      xxxxx
      xxxxx
    `,
    options: {
      delay: 500,
      depth: 17
    }
  },
  {
    template: `
      xxxxx
      xx---
      xx---
      xx---
      xx---
      xxxxx
    `,
    options: {
      delay: 700,
      depth: 17
    }
  },
  {
    template: `
      xxxxx
      x---x
      x---x
      x---x
      x---x
      x---x
      xxxxx
    `,
    options: {
      delay: 700,
      depth: 17
    }
  },
  {
    template: `
      xxxxx
      x--xx
      x--xx
      x--xx
      x--xx
      xxxxx
    `,
    options: {
      delay: 500,
      depth: 17
    }
  },
  {
    template: `
      xxxxx
      x---x
      x---x
      x---x
      x---x
      xxxxx
    `,
    options: {
      delay: 500,
      depth: 17
    }
  },
  {
    template: `
      x---x
      x---x
      x---x
      xxxxx
      xxxxx
      xxxxx
    `,
    options: {
      delay: 500,
      depth: 15
    }
  },
  {
    template: `
      xxxxx
      x---x
      x---x
      x---x
      xxxxx
      xxxxx
    `,
    options: {
      delay: 100,
      depth: 5
    }
  },
  {
    template: `
      xxxxx
      xxxxx
      x---x
      x---x
      x---x
      x---x
      x---x
      x---x
      xxxxx
    `,
    options: {
      delay: 100,
      depth: 5
    }
  },
  {
    template: `
      x--x
      ----
      ----
      x--x
    `,
    options: {
      delay: 200
    }
  },
  {
    template: `
      x--x
      ----
      ----
      x--x
    `,
    options: {
      delay: 200
    }
  },
  {
    template: `
      x--x
      ----
      ----
      x--x
    `,
    options: {
      delay: 200
    }
  },
  {
    template: `
      x--x
      ----
      ----
      x--x
    `,
    options: {
      delay: 200
    }
  },
  {
    template: `
      x--x
      ----
      ----
      x--x
    `,
    options: {
      delay: 200
    }
  },
  {
    template: `
      x--x
      ----
      ----
      x--x
    `,
    options: {
      delay: 200
    }
  },
  {
    template: `
      x--x
      ----
      ----
      x--x
    `,
    options: {
      delay: 200
    }
  },
  {
    template: `
      x--x
      ----
      ----
      x--x
    `,
    options: {
      delay: 200
    }
  },
  {
    template: `
      x--x
      ----
      ----
      x--x
    `,
    options: {
      delay: 200
    }
  },
  {
    template: `
      x--x
      ----
      ----
      x--x
    `,
    options: {
      delay: 200
    }
  },
  {
    template: `
      x--x
      ----
      ----
      x--x
    `,
    options: {
      delay: 200
    }
  },
  {
    template: `
      x--x
      ----
      ----
      x--x
    `,
    options: {
      delay: 200
    }
  },
  {
    template: `
      x--x
      ----
      ----
      x--x
    `,
    options: {
      delay: 200
    }
  },
]

AFRAME.registerComponent('level-one', {
  init: function() {
    dispatch('setLives', 300);
    dispatch('setSound', {
        src: '#song',
        autoplay: true
    });

    document.querySelector('#ground')
    .setAttribute('width', state.vrDisplay.stageParameters.sizeX);

    this.scene = document.querySelector('a-scene');
    this.level = this.scene.querySelector('.level');

    startLevel(this.level, phases, {
      delay: 1000,
      creationPosition: -50,
      dur: 3000,
      depth: 2,
      playArea: {
        width: state.vrDisplay.stageParameters.sizeX,
        height: 2
      },
    }).then(() => {
      dispatch('setShowScore', true);
    })
  }
});
