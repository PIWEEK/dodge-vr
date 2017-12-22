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
      delay: 2200,
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
      animations: [
        {
          attribute: 'rotation',
          dur: 1800,
          ease: 'linear',
          fill: 'forwards',
          to: "0 0 90",
          repeat: "0"
        }
      ]
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
      animations: [
        {
          attribute: 'rotation',
          dur: 1800,
          ease: 'linear',
          fill: 'forwards',
          to: "0 0 -90",
          repeat: "0"
        }
      ]
    }
  },
  {
    template: `
      p-xx
      --xx
      xx--
      xx--
      `,
    options: {
      delay: 1000,
      animations: [
        {
          attribute: 'rotation',
          dur: 1800,
          ease: 'linear',
          fill: 'forwards',
          to: "0 0 180",
          repeat: "0"
        }
      ]
    }
  },
  {
    template: `
      xxxx
      xxxx
      xxxx
      --xx
      --xx
      `,
    options: {
      delay: 1000,
      depth: 10,
      animations: [
        {
          attribute: 'rotation',
          dur: 1800,
          ease: 'linear',
          fill: 'forwards',
          to: "0 0 90",
          repeat: "0"
        }
      ]
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
      depth: 20,

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
      delay: 500,
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
      delay: 0,
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
      delay: 0,
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
      delay: 0,
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
      delay: 0,
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
      delay: 0,
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
      delay: 0,
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
      delay: 0,
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
      delay: 0,
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
      delay: 0,
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
      delay: 0,
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
      delay: 0,
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
      delay: 400,
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
      delay: 400,
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
      delay: 600,
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
      delay: 600,
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
      delay: 1000,
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
      delay: 1000,
      depth: 15,
      animations: [
        {
          attribute: 'rotation',
          dur: 1200,
          ease: 'linear',
          fill: 'forwards',
          to: "0 0 90",
          repeat: "0"
        }
      ]
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
      delay: 1000,
      depth: 15,
      animations: [
        {
          attribute: 'rotation',
          dur: 1200,
          ease: 'linear',
          fill: 'forwards',
          to: "0 0 90",
          repeat: "0"
        }
      ]
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
      delay: 1000,
      depth: 15,
      animations: [
        {
          attribute: 'rotation',
          dur: 1200,
          ease: 'linear',
          fill: 'forwards',
          to: "0 0 -90",
          repeat: "0"
        }
      ]
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
      delay: 1000,
      depth: 15,
      animations: [
        {
          attribute: 'rotation',
          dur: 1200,
          ease: 'linear',
          fill: 'forwards',
          to: "0 0 90",
          repeat: "0"
        }
      ]
    }
  },
  {
    template: `
      xxxxx
      xxxx-
      xxx--
      xx---
      x----
      `,
    options: {
      delay: 240,
      depth: 90,
      animations: [
        {
          attribute: 'rotation',
          dur: 12000,
          ease: 'linear',
          fill: 'forwards',
          to: "0 0 -360",
          repeat: "0"
        }
      ]
    }
  },
  {
    template: `
      ---
      ---
      -p-
      `,
    options: {
      delay: 0,
      depth: 10,
    }
  },
  {
    template: `
    xxxxx
    xxxxx
    x---x
    x---x
    -----
    `,
    options: {
      delay: 1000,
      depth: 90,
      animations: [
        {
          attribute: 'rotation',
          dur: 12000,
          ease: 'linear',
          fill: 'forwards',
          to: "0 0 -360",
          repeat: "0"
        }
      ]

    }
  },
  {
    template: `
      ---
      ---
      p--
      `,
    options: {
      delay: 0,
      depth: 10,
    }
  },
  {
    template: `
    xxxxx
    -xxxx
    --xxx
    ---xx
    ----x
      `,
    options: {
      delay: 1200,
      depth: 90,
      animations: [
        {
          attribute: 'rotation',
          dur: 12000,
          ease: 'linear',
          fill: 'forwards',
          to: "0 0 -360",
          repeat: "0"
        }
      ]
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
      delay: 500,
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
      delay: 400,
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
      delay: 400,
      depth: 20,
    }
  },
  {
    template: `
      ---x
      ----
      p---
      --x-
      `,
    options: {
      delay: 400,
      depth: 20,
    }
  },
  {
    template: `
      -x-p
      ----
      x--x
      ----
      `,
    options: {
      delay: 400,
      depth: 20,
    }
  },
  {
    template: `
      ----
      ---x
      p--x
      --x-
      `,
    options: {
      delay: 400,
      depth: 20,
    }
  },
  {
    template: `
      -xx-
      ---x
      p--x
      ----
      `,
    options: {
      delay: 400,
      depth: 20,
    }
  },
  {
    template: `
      ---x
      x--p
      x---
      ---x
      `,
    options: {
      delay: 400,
      depth: 20,
    }
  },
  {
    template: `
      p-----x-
      --x---x-
      -x----x-
      -x---x--
      -x------
      -------p
      `,
    options: {
      delay: 900,
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
      delay: 600,
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
      -p--------p-
      ------------
      -x--------x-
      -x--------x-
      -x--------x-
      -x--------x-
      ------------
      `,
    options: {
      delay: 100,
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
      ------------
      -p--------p-
      ------------
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

    document.querySelector('#floor')
    .setAttribute('width', state.vrDisplay.stageParameters.sizeX);

    this.scene = document.querySelector('a-scene');
    this.level = this.scene.querySelector('.level');

    startLevel(this.level, phases, {
      delay: 1000,
      creationPosition: -100,
      dur: 4000,
      depth: 10,
      opacity: 1,
      material: 'src: #cubeRed',
      playArea: {
        width: state.vrDisplay.stageParameters.sizeX,
        height: 2,
      },
    }).then(() => {
      dispatch('setShowScore', true);
    })
  }
});
