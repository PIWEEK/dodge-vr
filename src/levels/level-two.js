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
    xxxx
    x--x
    x--x
    xxxx
    `,
    options: {
      delay: 2400,
      depth: 40,
      animations: [
        {
          attribute: 'rotation',
          dur: 7000,
          fill: 'forwards',
          to: "0 0 360",
          repeat: "indefinite"
        }
      ]
    }
  },
  {
    template: `
    xxxxxxx
    xxxxxxx
    xxx---x
    xxx---x
    xxx---x
    xxxxxxx
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
    xxxxxxx
    x---xxx
    x---xxx
    x---xxx
    xxxxxxx
    xxxxxxx
    `,
    options: {
      delay: 2400,
      depth: 40
    }
  },
  {
    template: `
    xxxxxxxx
    x----xxx
    x----xxx
    x----xxx
    xxxxxxxx
    `,
    options: {
      delay: 2400,
      depth: 20,
      animations: [
        {
          attribute: 'rotation',
          dur: 10000,
          fill: 'forwards',
          to: "0 0 360",
          repeat: "indefinite"
        }
      ]
    }
  },
  {
    template: `
    p-----x
    -------
    -------
    x-----p
    `,
    options: {
      delay: 900,
      depth: 2,
      animations: [
        {
          attribute: 'rotation',
          dur: 6000,
          fill: 'forwards',
          to: "0 0 360",
          repeat: "indefinite"
        }
      ]
    }
  },
  {
    template: `
    p----xx
    ------x
    x------
    xx----p
    `,
    options: {
      delay: 900,
      depth: 2,
      animations: [
        {
          attribute: 'rotation',
          dur: 6000,
          fill: 'forwards',
          to: "0 0 360",
          repeat: "indefinite"
        }
      ]
    }
  },
  {
    template: `
    ----xxx
    x-p--xx
    xx--p-x
    xxx----
    `,
    options: {
      delay: 900,
      depth: 2,
      opacity: 0.5,
      animations: [
        {
          attribute: 'rotation',
          dur: 6000,
          fill: 'forwards',
          to: "0 0 360",
          repeat: "indefinite"
        }
      ]
    }
  },
  {
    template: `
    --p--xxx
    x-----xx
    xx-----x
    xxx--p--
    `,
    options: {
      delay: 900,
      depth: 2,
      opacity: 0.5,
      animations: [
        {
          attribute: 'rotation',
          dur: 6000,
          fill: 'forwards',
          to: "0 0 360",
          repeat: "indefinite"
        }
      ]
    }
  },
  {
    template: `
    xx------
    xxx---p-
    xxxx----
    xxxxx---
    `,
    options: {
      delay: 900,
      depth: 2,
      opacity: 0.5,
      animations: [
        {
          attribute: 'rotation',
          dur: 6000,
          fill: 'forwards',
          to: "0 0 360",
          repeat: "indefinite"
        }
      ]
    }
  },
  {
    template: `
    xxxx----
    xxx-----
    xxxx--p-
    xxxxx---
    `,
    options: {
      delay: 900,
      depth: 2,
      opacity: 0.5,
      animations: [
        {
          attribute: 'rotation',
          dur: 6000,
          fill: 'forwards',
          to: "0 0 360",
          repeat: "indefinite"
        }
      ]
    }
  },
  {
    template: `
    xxxxxxx--
    xxx------
    xx-----p-
    xxx------
    xxxxxxx--
    `,
    options: {
      delay: 900,
      depth: 2,
      opacity: 0.5,
      animations: [
        {
          attribute: 'rotation',
          dur: 5500,
          fill: 'forwards',
          to: "0 0 360",
          repeat: "indefinite"
        }
      ]
    }
  },
  {
    template: `
    ---
    -p-
    ---
    `,
    options: {
      delay: 900,
      depth: 2,
      opacity: 0.5
    }
  }, 
  {
    template: `
    --xxxxxx
    -----xxx
    -p----xx
    -----xxx
    --xxxxxx
    `,
    options: {
      delay: 900,
      depth: 20,
      opacity: 0.5,
      animations: [
        {
          attribute: 'rotation',
          dur: 3000,
          ease: 'linear',
          fill: 'forwards',
          to: "0 0 90",
          repeat: "0"
        }
      ]
    }
  }
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
      opacity: 1,
      playArea: {
        width: state.vrDisplay.stageParameters.sizeX,
        height: 2
      },
    }).then(() => {
      dispatch('setShowScore', true);
    })
  }
});
