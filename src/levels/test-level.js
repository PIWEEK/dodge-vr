import { dispatch } from '../utils/state';
import { systemEmmiter } from '../utils/system';
import { generateRandomLevel, generateRandomBlock, generateTemplateBlock } from '../generateLevelObjects';

const templates = [
  `
    x--x
    -x-x
    ----
    ---x
  `,
  `
    x--x
    xxxx
    ----
    ---x
  `,  
  `
    xxxx
    xxxx
    -x--
    ---x
  `, 
  `
    xxxx
    xxxx
    xx--
    ---x
  `, 
  `
    x--x
    x-xx
    xx-x
    x--x
  `,    
  `
    -x-x
    xx-x
    -x-x
    -x-x
  `,   
  `
    -xx-
    xxx-
    -xxx
    -xx-
  `,    
  `
    xxxx
    xxxx
    ----
    ----
  `,    
  `
    xxxx
    xxxx
    xxxx
    ----
  `,  
  `
    xxxx
    xxxx
    -xxx
    xxxx
  `,        
]

AFRAME.registerComponent('test-level', {
  levelOptions: {
    creationPosition: -50,
    phases: 10,
    speed: [20, 30],
    size: [2, 10],
    interval: [3000, 300]
  },
  generateLevel: function() {
    /*
    const levelEntity = generateRandomBlock({
      speed: this.currentLevelOptions.speed,
      size: this.currentLevelOptions.size,
      creationPosition: this.levelOptions.creationPosition
    });
    */
    const levelEntity = generateTemplateBlock({
      speed: this.currentLevelOptions.speed,
      size: this.currentLevelOptions.size,
      creationPosition: this.levelOptions.creationPosition,
      rowSize: 4,
      columnSize: 4,
      playArea: {
        width: 4,
        height: 4
      },
      template: templates[this.currentLevelOptions.phase - 1]
    });    

    this.level.appendChild(levelEntity);

    systemEmmiter.emit('reloadCollisions');

    if (this.currentLevelOptions.phase < this.levelOptions.phases) {
      setTimeout(
        this.generateLevel.bind(this),this.currentLevelOptions.interval
      );

      this.increaseDificulty();
    }
  },
  init: function() {
    this.scene = document.querySelector('a-scene');
    this.level = this.scene.querySelector('.level');

    this.setInitialDificulty();
    this.generateLevel();
  },
  increaseDificulty: function() {
    this.currentLevelOptions.phase++;

    if (Array.isArray(this.levelOptions.speed)) {
      const diff = this.levelOptions.speed[0] - this.levelOptions.speed[1];
      const phaseInc = diff / this.levelOptions.phases;

      this.currentLevelOptions.speed = Math.round(this.levelOptions.speed[0] + (this.currentLevelOptions.phase * phaseInc));
    }

    if (Array.isArray(this.levelOptions.size)) {
      const diff = this.levelOptions.size[1] - this.levelOptions.size[0];
      const phaseInc = diff / this.levelOptions.phases;

      this.currentLevelOptions.size = Math.round(this.levelOptions.size[0] + (this.currentLevelOptions.phase * phaseInc));
    }

    if (Array.isArray(this.levelOptions.interval)) {
      const diff = this.levelOptions.interval[1] - this.levelOptions.interval[0];

      const phaseInc = diff / this.levelOptions.phases;

      this.currentLevelOptions.interval = Math.round(this.levelOptions.interval[0] + (this.currentLevelOptions.phase * phaseInc));
    }
  },
  setInitialDificulty: function() {
    let speed = null;
    let size = null;
    let interval = null;

    if (Array.isArray(this.levelOptions.speed)) {
      speed = this.levelOptions.speed[0];
    } else {
      speed = this.levelOptions.speed;
    }

    if (Array.isArray(this.levelOptions.size)) {
      size = this.levelOptions.size[0];
    } else {
      size = this.levelOptions.size;
    }

    if (Array.isArray(this.levelOptions.interval)) {
      interval = this.levelOptions.interval[0];
    } else {
      interval = this.levelOptions.interval;
    }

    this.currentLevelOptions = {
      phase: 1,
      speed: speed,
      size: size,
      interval: interval
    };
  }
});
