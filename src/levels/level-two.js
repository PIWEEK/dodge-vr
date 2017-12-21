import { dispatch, state } from '../utils/state';
import { systemEmmiter } from '../utils/system';
import { startLevel, generateRandomLevel, generateRandomBlock, generateTemplateBlock } from '../generateLevelObjects';


const phases = [
  {
    template: `
      x-----xxx
      x-----xxx
      x-----xxx
      x-----xxx
    `,
    options: {
      delay: 445,
      depth: 10
    }
  },
  {
    template: `
      x----xxxx
      x----xxxx
      x----xxxx
      x-p--xxxx
    `,
    options: {
      delay: 445,
      depth: 10
    }
  },
  {
    template: `
      x-p-xxxxx
      x---xxxxx
      x---xxxxx
      x---xxxxx
    `,
    options: {
      delay: 445,
      depth: 10
    }
  },
  {
    template: `
      x----xxxx
      x----xxxx
      x----xxxx
      x----xxxx
    `,
    options: {
      delay: 445,
      depth: 10
    }
  },
  {
    template: `
      xx---xxxx
      xx---xxxx
      xx---xxxx
      xx---xxxx
    `,
    options: {
      delay: 445,
      depth: 10
    }
  },
  {
    template: `
      xx---xxxx
      xx---xxxx
      xx---xxxx
      xx---xxxx
    `,
    options: {
      delay: 445,
      depth: 10
    }
  },
  {
    template: `
      xxxxxxxxx
      xx---xxxx
      xx-p-xxxx
      xx---xxxx
      xx---xxxx
      xx---xxxx
      xx---xxxx
      xx---xxxx
    `,
    options: {
      delay: 445,
      depth: 10
    }
  },
  {
    template: `
      xxxxxxxxx
      xxxxxxxxx
      xx---xxxx
      xx---xxxx
      xx---xxxx
      xx---xxxx
      xx---xxxx
      xx---xxxx
    `,
    options: {
      delay: 445,
      depth: 10
    }
  },
  {
    template: `
      xxxxxxxxx
      xxxxxxxxx
      xxxxxxxxx
      xx---xxxx
      xx---xxxx
      xx---xxxx
      xx-p-xxxx
      xx---xxxx
    `,
    options: {
      delay: 445,
      depth: 10
    }
  },
  {
    template: `
      xxxxxxxxx
      xxxxxxxxx
      xxx----xx
      xx-----xx
      xx-----xx
      xx----xxx
      xx----xxx
      xx----xxx
      xx---xxxx
      xx---xxxx
    `,
    options: {
      delay: 445,
      depth: 10
    }
  },
  {
    template: `
      xxxxxxxxx
      xxxxx---x
      xxx----xx
      xxx----xx
      xxx----xx
      xx-----xx
      xx-----xx
      xx----xxx
      xx----xxx
      xxxxxxxxx
    `,
    options: {
      delay: 445,
      depth: 10
    }
  },
  {
    template: `
      xxxxxxxxx
      xxx-----x
      xxx-----x
      xxx-----x
      xxx-----x
      xxx-----x
      xxxxxxxxx
      xxxxxxxxx
    `,
    options: {
      delay: 445,
      depth: 10
    }
  },
  {
    template: `
      ----
      ----
      ----
      ----
    `,
    options: {
      delay: 1000
    }
  },
  {
    template: `
      -xxxx
      ----x
      ----x
      p----
    `,
    options: {
      delay: 900,
      depth: 10
      
    }
  },
  {
    template: `
      ----p
      x----
      x----
      xxxxx
    `,
    options: {
      delay: 1350,
      depth: 10
      
    }
  },
  {
    template: `
      xxxxxxx
      xx---xx
      xx---xx
      xxxxxxx
    `,
    options: {
      delay: 2400,
      depth: 40
    }
  },
  {
    template: `
    xxxxxxx
    xxx---x
    xxx---x
    xxxxxxx
    `,
    options: {
      delay: 2400,
      depth: 40
      
    }
  },
  {
    template: `
    xxxxxxx
    x---xxx
    x---xxx
    xxxxxxx
    `,
    options: {
      delay: 2400,
      depth: 40
      
    }
  },
]

AFRAME.registerComponent('level-two', {
  init: function() {
    dispatch('setLives', 300);

    document.querySelector('#ground')
    .setAttribute('width', state.vrDisplay.stageParameters.sizeX);

    this.scene = document.querySelector('a-scene');
    this.level = this.scene.querySelector('.level');

    startLevel(this.level, phases, {
      delay: 1000,
      creationPosition: -50,
      dur: 5000,
      playArea: {
        width: state.vrDisplay.stageParameters.sizeX,
        height: 2
      },
    }).then(() => {
      dispatch('setShowScore', true);
    })
  }
});
