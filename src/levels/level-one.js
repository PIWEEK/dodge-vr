import { dispatch, state, getState } from '../utils/state';
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
      delay: 2000
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
      delay: 1000
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
      delay: 1000
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
      delay: 1000
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
      delay: 300
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
      delay: 300
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
      delay: 300
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
      delay: 300
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
      delay: 300
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
      delay: 1000
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
      delay: 1000
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
      delay: 1000
    }
  },
  {
    template: `
      xxxx
      ----
      xxxx
      ----
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
      xxxxx
      x---x
      x---x
      x---x
      x---x
      xxxxx
    `,
    options: {
      delay: 70,
      depth: 40,
      opacity: 1
    }
  },
  {
    template: `
      x---x
      x---x
      x---x
      x---x
      xxxxx
      xxxxx
    `,
    options: {
      delay: 70,
      depth: 40,
      opacity: 1,

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
      delay: 70,
      depth: 40,
      opacity: 1,

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
      delay: 70,
      depth: 40,
      opacity: 1
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
      delay: 200,
      depth: 40,
      opacity: 1
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
      delay: 200,
      depth: 40,
      opacity: 1
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
      delay: 50,
      depth: 40,
      opacity: 1
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
      delay: 50,
      depth: 40,
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
      delay: 50,
      depth: 15,
      opacity: 1
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
      depth: 5,
      opacity: 1
    }
  },
  {
    template: `
      xxxxxx
      xxxxxx
      xx--xx
      xx--xx
      xx--xx
      xx--xx
      xx--xx
      xxxxxx
      xxxxxx
    `,
    options: {
      delay: 100,
      depth: 50,
      opacity: 1
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
      delay: 25,
      deep: 2
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
      delay: 25,
      deep: 2
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
      delay: 25,
      deep: 2
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
      delay: 25,
      deep: 2
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
      delay: 25,
      deep: 2
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
      delay: 25,
      deep: 2
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
      delay: 25,
      deep: 2
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
      delay: 25,
      deep: 2
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
      delay: 25,
      deep: 2
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
      delay: 25,
      deep: 2
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
      delay: 25,
      deep: 2
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
      delay: 25,
      deep: 2
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
      delay: 50,
      deep: 2
    }
  },{
    template: `
      x--x
      ----
      ----
      x--x
    `,
    options: {
      delay: 50,
      deep: 2
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
      delay: 50,
      deep: 2
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
      delay: 50,
      deep: 2
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
      delay: 50,
      deep: 2
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
      delay: 50,
      deep: 2
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
      delay: 50,
      deep: 2
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
      delay: 75,
      deep: 2
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
      delay: 75,
      deep: 2
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
      delay: 75,
      deep: 2
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

    document.querySelector('#floor')
    .setAttribute('width', state.vrDisplay.stageParameters.sizeX);


    getState()
      .map((state) => state.phase)
      .distinctUntilChanged()
      .subscribe((phase) => {
        // when the phase appears
        // console.log(phase);
      });

    this.scene = document.querySelector('a-scene');
    this.level = this.scene.querySelector('.level');

    startLevel(this.level, phases, {
      delay: 1000,
      creationPosition: -100,
      dur: 3200,
      depth: 3,
      playArea: {
        width: state.vrDisplay.stageParameters.sizeX,
        height: 2
      },
    }).then(() => {
      dispatch('setShowScore', true);
    })
  }
});
