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
      delay: 1000,
      // dur
      // creationPosition
      // animations: [
      //   {
      //     attribute: 'rotation',
      //     dur: 1000,
      //     fill: 'forwards',
      //     to: "0 360 0",
      //     repeat: "indefinite"
      //   }
      // ]
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
      delay: 10000
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
      delay: 500,
      depth: 17
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
      delay: 500,
      depth: 15      
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
      delay: 500,
      depth: 17      
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
      delay: 700,
      depth: 17      
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
      delay: 700,
      depth: 17     
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
      delay: 500,
      depth: 17            
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
      delay: 500,
      depth: 17     
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
      delay: 500,
      depth: 15            
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

AFRAME.registerComponent('test-level', {
  levelOptions: {
    creationPosition: -50,
    phases: 14,
    speed: [40, 40],
    size: [2, 10],
    interval: [1400, 1900]
  },
  init: function() {
    dispatch('setLives', 300);

    document.querySelector('#ground')
    .setAttribute('width', state.vrDisplay.stageParameters.sizeX);

    this.scene = document.querySelector('a-scene');
    this.level = this.scene.querySelector('.level');

    startLevel(this.level, phases, {
      delay: 1000,
      creationPosition: -50,
      dur: 3000,
      rowSize: 4,
      columnSize: 4,
      playArea: {
        width: state.vrDisplay.stageParameters.sizeX,
        height: 2
      },
    });
  }
});
