import { dispatch, state } from '../utils/state';
import { systemEmmiter } from '../utils/system';
import { startLevel, generateRandomLevel, generateRandomBlock, generateTemplateBlock } from '../generateLevelObjects';

const phases = [
  {
    template: `
      ----
      ----
      ----
      ----
      `,
    options: {
      delay: 2000,
    }
  },
  {
    template: `
      xxxx
      xxxx
      xx--
      xx--
      `,
    options: {
      delay: 1000,
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
      delay: 1000,
    }
  },
  {
    template: `
      --xx
      --xx
      xx--
      xx-p
      `,
    options: {
      delay: 1000,
    }
  },
  {
    template: `
      --xx
      --xx
      xxxx
      xxxx
      xxxx
      `,
    options: {
      delay: 1000,
      depth: 10
    }
  },
  {
    template: `
      xxxx
      --xx
      --xx
      xxxx
      xxxx
      `,
    options: {
      delay: 1000,
      depth: 10,
    }
  },
  {
    template: `
      xxxx
      x--x
      x--x
      xxxx
      xxxx
      `,
    options: {
      delay: 1000,
      depth: 10,
    }
  },
  {
    template: `
      xx-xx
      x---x
      -----
      x--px
      xx-xx
      `,
    options: {
      delay: 1000,
      depth: 45,
    }
  },
  {
    template: `
      xx-xxxx
      xx---xx
      x-p---x
      xx---xx
      xx-xxxx
      `,
    options: {
      delay: 1000,
      depth: 45,
    }
  },
  {
    template: `
      xxxxxxx
      xx--xxx
      ----p-x
      xx---xx
      xxx-xxx
      `,
    options: {
      delay: 1000,
      depth: 45,
    }
  },
  {
    template: `
      xxxxxxx
      xxx--xx
      -----xx
      x----xx
      x--p-xx
      `,
    options: {
      delay: 1000,
      depth: 45,
    }
  },
  {
    template: `
      xxxxxxx
      xxx--xx
      xx---xx
      xxx----
      xxx--p-
      `,
    options: {
      delay: 1000,
      depth: 45,
    }
  },
  {
    template: `
      xxxxxxx
      xx-p-xx
      xx----x
      xxx---x
      xxxxxxx
      `,
    options: {
      delay: 1000,
      depth: 45,
    }
  },
  {
    template: `
      xxxxxxxx
      xx----xx
      xx----xx
      xx----xx
      xxxxxxxx
      `,
    options: {
      delay: 220,
      depth: 10,
    }
  },
  {
    template: `
      xxxxxxxx
      xx----xx
      xx----xx
      xx----xx
      xxxxxxxx
      `,
    options: {
      delay: 220,
      depth: 10,
    }
  },
  {
    template: `
      xxxxxxxx
      xx----xx
      xx----xx
      xx----xx
      xxxxxxxx
      `,
    options: {
      delay: 220,
      depth: 10,
    }
  },
  {
    template: `
      xxxxxxxx
      xx----xx
      xx----xx
      xx----xx
      xxxxxxxx
      `,
    options: {
      delay: 220,
      depth: 10,
    }
  },
  {
    template: `
      xxxxxxxx
      xxx--xxx
      xx----xx
      xxx--xxx
      xxxxxxxx
      `,
    options: {
      delay: 800,
      depth: 10,
    }
  },
  {
    template: `
      ---
      -p-
      ---
      `,
    options: {
      delay: 220,
      depth: 10,
    }
  },
  {
    template: `
      xxxxxxxx
      xxxx--xx
      xxx----x
      xxxx--xx
      xxxxxxxx
      `,
    options: {
      delay: 220,
      depth: 10,
    }
  },
  {
    template: `
      xxxxxxxx
      xxxx--xx
      xxx----x
      xxxx--xx
      xxxxxxxx
      `,
    options: {
      delay: 1000,
      depth: 10,
    }
  },
  {
    template: `
      xxxxxxxx
      xxxxxxxx
      xx--xxxx
      x----xxx
      xx--xxxx
      `,
    options: {
      delay: 220,
      depth: 10,
    }
  },
  {
    template: `
      xxxxxxxx
      xxxxxxxx
      xx--xxxx
      x----xxx
      xx--xxxx
      `,
    options: {
      delay: 1000,
      depth: 10,
    }
  },
  {
    template: `
      xxxxxxxx
      xxxx--xx
      xxx----x
      xxxx--xx
      xxxxxxxx
      `,
    options: {
      delay: 1000,
      depth: 10,
    }
  },
  {
    template: `
      xxxx
      x--x
      x--x
      xxxx
      `,
    options: {
      delay: 800,
      depth: 15,
    }
  },
  {
    template: `
      xxxx
      xx--
      xx--
      xxxx
      `,
    options: {
      delay: 800,
      depth: 15,
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
      delay: 800,
      depth: 15,
    }
  },
  {
    template: `
      x--x
      x--x
      xxxx
      xxxx
      `,
    options: {
      delay: 800,
      depth: 15,
    }
  },
  {
    template: `
      xxxx
      xx--
      xx--
      xxxx
      `,
    options: {
      delay: 800,
      depth: 15,
    }
  },
  {
    template: `
      xxxx
      xxxx
      xx--
      xx--
      `,
    options: {
      delay: 240,
      depth: 15,
    }
  },
  {
    template: `
      xxxx
      xxxx
      xx--
      xx--
      `,
    options: {
      delay: 240,
      depth: 15,
    }
  },
  {
    template: `
      xxxx
      xxxx
      xx--
      xx--
      `,
    options: {
      delay: 800,
      depth: 15,
    }
  },
  {
    template: `
      xxxx
      xxxx
      x--x
      x--x
      `,
    options: {
      delay: 800,
      depth: 15,
    }
  },
  {
    template: `
      xxxx
      xxxx
      --xx
      --xx
      `,
    options: {
      delay: 1200,
      depth: 15,
    }
  },
  {
    template: `
      xx-xx
      x---x
      ----p
      x---x
      xx-xx
      `,
    options: {
      delay: 240,
      depth: 45,
    }
  },
  {
    template: `
      xx-xx
      x---x
      p----
      x---x
      xx-xx
      `,
    options: {
      delay: 1000,
      depth: 45,
    }
  },
  {
    template: `
      ----
      --x-
      ----
      x---
      `,
    options: {
      delay: 500,
      depth: 20,
    }
  },
  {
    template: `
      ---p
      x---
      ----
      ---x
      `,
    options: {
      delay: 500,
      depth: 20,
    }
  },
  {
    template: `
      ---x
      ----
      ----
      --x-
      `,
    options: {
      delay: 500,
      depth: 20,
    }
  },
  {
    template: `
      -x--
      ----
      x--x
      ----
      `,
    options: {
      delay: 500,
      depth: 20,
    }
  },
  {
    template: `
      ----
      ---x
      ---x
      --x-
      `,
    options: {
      delay: 500,
      depth: 20,
    }
  },
  {
    template: `
      -xx-
      ---x
      ---x
      ----
      `,
    options: {
      delay: 500,
      depth: 20,
    }
  },
  {
    template: `
      ---x
      x---
      x---
      ---x
      `,
    options: {
      delay: 500,
      depth: 20,
    }
  },
  {
    template: `
      -----x-
      --x--x-
      -x---x-
      -x--x--
      -x-----
      -------
      `,
    options: {
      delay: 1200,
      depth: 20,
    }
  },
  {
    template: `
      -------
      --xxx--
      ---x---
      ---x---
      --xxx--
      -------
      `,
    options: {
      delay: 900,
      depth: 20,
    }
  },
  {
    template: `
      ------------
      -x--------x-
      -x--------x-
      -x--------x-
      -x--------x-
      ------------
      ------------
      -x--------x-
      -x--------x-
      -x--------x-
      -x--------x-
      ------------
      `,
    options: {
      delay: 500,
      depth: 20,
    }
  },
  {
    template: `
      ------------
      -xx------xx-
      -xx------xx-
      -xx------xx-
      -xx------xx-
      -----xx-----
      -----xx-----
      -xx------xx-
      -xx------xx-
      -xx------xx-
      -xx------xx-
      ------------
      `,
    options: {
      delay: 600,
      depth: 20,
    }
  },
]

AFRAME.registerComponent('level-three', {
  init: function() {
    dispatch('setLives', 300);

    document.querySelector('#ground')
    .setAttribute('width', state.vrDisplay.stageParameters.sizeX);

    this.scene = document.querySelector('a-scene');
    this.level = this.scene.querySelector('.level');

    startLevel(this.level, phases, {
      delay: 1000,
      creationPosition: -50,
      dur: 2000,
      depth: 5,
      opacity: 1,      
      playArea: {
        width: state.vrDisplay.stageParameters.sizeX,
        height: 2,
      },
    }).then(() => {
      dispatch('setShowScore', true);
    })
  }
});
