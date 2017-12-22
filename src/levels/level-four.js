import { dispatch, state } from '../utils/state';
import { systemEmmiter } from '../utils/system';
import { startLevel, generateRandomLevel, generateRandomBlock, generateTemplateBlock } from '../generateLevelObjects';

const phases = [
  {
    template: `
      --
      --
    `,
    options: {
      delay: 2500,
      depth: 20
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
      delay: 900,
      depth: 10
    }
  },
  {
    template: `
      x--x
      x--x
      x--x
      x--x
    `,
    options: {
      delay: 1000,
      depth: 20
    }
  },
  {
    template: `
      xx--
      xx--
      xx--
      xx--
    `,
    options: {
      delay: 1000,
      depth: 15
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
      delay: 1000,
      depth: 20
    }
  },
  {
    template: `
      x---
      x---
      x---
      x---
    `,
    options: {
      delay: 1000,
      depth: 30
    }
  },
  {
    template: `
      x---
      x---
      x---
      x---
    `,
    options: {
      delay: 3400,
      depth: 35
    }
  },
  {
    template: `
      x---
      x---
      x---
      x---
    `,
    options: {
      delay: 850,
      depth: 35
    }
  },
  {
    template: `
    --x-
    ----
    ----
    ----
    `,
    options: {
      delay: 1250,
      depth: 10
    }
  },
  {
    template: `
      x---
      ----
      ----
      ----
    `,
    options: {
      delay: 1000,
      depth: 20
    }
  },
  {
    template: `
      ---x
      ----
      ----
      ----
    `,
    options: {
      delay: 1000,
      depth: 15
    }
  },
  {
    template: `
      x---
      ----
      ----
      ----
    `,
    options: {
      delay: 1000,
      depth: 20
    }
  },
  {
    template: `
      ---x
      ----
      ----
      ----
    `,
    options: {
      delay: 1000,
      depth: 15
    }
  },
  // 2000 desde aqui
  {
    template: `
      ------
      ------
      ------
      ------
    `,
    options: {
      delay: 500,
      depth: 10
    }
  },
  {
    template: `
      -x---x
      ----x-
      --x---
      x---x-
    `,
    options: {
      delay: 500,
      depth: 10
    }
  },
  {
    template: `
      ----x-
      x----x
      -x---x
      -x----
    `,
    options: {
      delay: 500,
      depth: 10
    }
  },
  {
    template: `
      x--x-
      ----x-
      -x----
      --x---
    `,
    options: {
      delay: 600,
      depth: 10
    }
  },
  // crazy end
  {
    template: `
    --x-
    ----
    ----
    ----
    `,
    options: {
      delay: 1250,
      depth: 10
    }
  },
  {
    template: `
      x---
      ----
      ----
      ----
    `,
    options: {
      delay: 1000,
      depth: 20
    }
  },
  {
    template: `
      ---x
      ----
      ----
      ----
    `,
    options: {
      delay: 1000,
      depth: 15
    }
  },
  {
    template: `
      x---
      ----
      ----
      ----
    `,
    options: {
      delay: 1000,
      depth: 20
    }
  },
  {
    template: `
      ---x
      ----
      ----
      ----
    `,
    options: {
      delay: 1000,
      depth: 15
    }
  },
  {
    template: `
    --x-
    ----
    ----
    ----
    `,
    options: {
      delay: 1250,
      depth: 10
    }
  },
  {
    template: `
      x---
      ----
      ----
      ----
    `,
    options: {
      delay: 1000,
      depth: 20
    }
  },
  {
    template: `
      ---x
      ----
      ----
      ----
    `,
    options: {
      delay: 1000,
      depth: 15
    }
  },
  {
    template: `
      x---
      ----
      ----
      ----
    `,
    options: {
      delay: 1000,
      depth: 20
    }
  },
  {
    template: `
      ---x
      ----
      ----
      ----
    `,
    options: {
      delay: 1000,
      depth: 15
    }
  },
  {
    template: `
    --x-
    ----
    ----
    ----
    `,
    options: {
      delay: 1250,
      depth: 10
    }
  },
  {
    template: `
      x---
      ----
      ----
      ----
    `,
    options: {
      delay: 1000,
      depth: 20
    }
  },
  {
    template: `
      ---x
      ----
      ----
      ----
    `,
    options: {
      delay: 1000,
      depth: 15
    }
  },
  {
    template: `
      x---
      ----
      ----
      ----
    `,
    options: {
      delay: 1000,
      depth: 20
    }
  },
  // Crazyness de aqui en adelante
  {
    template: `
      x--x-
      ----x-
      -x----
      --x---
    `,
    options: {
      delay: 500,
      depth: 10
    }
  },
  {
    template: `
      x--x-
      ----x-
      -x----
      --x---
    `,
    options: {
      delay: 500,
      depth: 10
    }
  },
  {
    template: `
      x--x-
      ----x-
      -x----
      --x---
    `,
    options: {
      delay: 500,
      depth: 10
    }
  },
  {
    template: `
      x--x-
      ----x-
      -x----
      --x---
    `,
    options: {
      delay: 500,
      depth: 10
    }
  },
  {
    template: `
      x--x-
      ----x-
      -x----
      --x---
    `,
    options: {
      delay: 500,
      depth: 10
    }
  },

]

AFRAME.registerComponent('level-four', {
  init: function() {
    dispatch('setLives', 300);
    dispatch('setSound', {
      src: '#song_last',
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
      playArea: {
        width: state.vrDisplay.stageParameters.sizeX,
        height: 2
      },
    }).then(() => {
      dispatch('setShowScore', true);
    })
  }
});
