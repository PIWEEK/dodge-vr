import { systemEmmiter } from './utils/system';
import { dispatch } from './utils/state';

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

const createEntity = (options) => {
  const entity = document.createElement('a-entity');
  // entity.setAttribute('entity-phase', true);
  entity.classList.add('entity-phase');
  // entity.setAttribute('depth', options.depth);
  // entity.setAttribute('color', 'yellow')
  // entity.setAttribute('material', 'opacity: 0');
  // entity.setAttribute('width', '0.005'); // TODO invisible collision
  // entity.setAttribute('height', '0.005');

  return entity;
}

export function startLevel(level, phases, options) {
  return new Promise((resolve) => {
    let currentLevel = 0;

    options.delay = options.delay || 1000;
    options.creationPosition = options.creationPosition || -50;
    options.dur = options.dur || 3000;
    options.depth = options.depth || 1;
    options.opacity = options.opacity || 1;

    const depths = phases
      .filter((o) => o.options && o.options.depth)
      .map((o) => o.options.depth);

    let maxDepth = options.depth;

    if (depths.length) {
      maxDepth = Math.max(...depths);
    }

    // const bornBox = document.createElement('a-box');
    // bornBox.classList.add('born-box')
    // bornBox.setAttribute('position', `0 0 ${options.creationPosition - 0.05}`);
    // bornBox.setAttribute('material', 'opacity', '0');
    // bornBox.setAttribute('height', 100);
    // bornBox.setAttribute('width', 10);
    // bornBox.setAttribute('depth', 0.1);
    // bornBox.setAttribute('color', 'red');

    // level.appendChild(bornBox);

    const levels = [];

    for (let phase of phases) {
      const delay = phase.options.delay !== undefined ? phase.options.delay : options.delay;
      const depth = phase.options.depth || options.depth;
      const creationPosition = options.creationPosition;
      const dur = phase.options.dur || options.dur;
      const animations = phase.options.animations || [];
      const height = phase.options.height || options.playArea.height;
      const opacity = phase.options.opacity !== undefined ? phase.options.opacity : options.opacity;
      const element = phase.options.element || options.element || 'a-box';
      const material = phase.options.material || options.material || 'src: #cubeBlue; repeat: 1 1';
      const elementAttributes = phase.options.elementAttributes || options.elementAttributes || {};

      const levelOptions = {
        dur: dur,
        depth: depth,
        creationPosition: creationPosition,
        playArea: options.playArea,
        height: height,
        template: phase.template,
        maxDepth: maxDepth,
        animations: animations,
        opacity: opacity,
        element: element,
        material: material,
        elementAttributes: elementAttributes
      };

      const levelEntity = generateTemplateBlock(levelOptions);

      levels.push({
        phase: levelEntity,
        options: levelOptions,
        animations: levelEntity.querySelectorAll('a-animation')
      });
    }


    const generateLevel = () => {
      dispatch('setPhase', currentLevel);
      const levelEntity = levels[currentLevel].phase;
      const options = levels[currentLevel].options;
      const animations = levels[currentLevel].animations;

      const exit = () => {
        if (currentLevel + 1 < phases.length) {
          currentLevel++;

          setTimeout(generateLevel, options.delay);
        } else {
          setTimeout(resolve, options.dur);
        }
      }

      const to = options.maxDepth + options.playArea.width - (options.depth / 2);
      const from = options.creationPosition - (options.depth / 2);
      const distance = to - from;
      const speed = options.dur * options.depth / distance;

      setTimeout(exit, speed);

      requestAnimationFrame(() => {
        level.appendChild(levelEntity);
        systemEmmiter.emit('reloadCollisions');

        setTimeout(() => {
          for (let animation of animations) {
            animation.stop();
          }

          level.removeChild(levelEntity);
        }, options.dur);
      });

      // const debugEnd = document.createElement('a-box');
      // debugEnd.setAttribute('width', 20)
      // debugEnd.setAttribute('height', 20)
      // debugEnd.setAttribute('depth', 20)
      // debugEnd.setAttribute('color', 'blue')
      // debugEnd.setAttribute('position', '0 0 20')
      // debugEnd.setAttribute('material', 'opacity: 0.2');
      // level.appendChild(debugEnd);
    }

    generateLevel();
  });
}

export const generateTemplateBlock = (options) => {
  const entity = createEntity(options);
  const elements = generateTemplate(options);
  for (let element of elements) {
    entity.appendChild(element);
  }

  const animation = document.createElement('a-animation');

  animation.setAttribute('attribute', 'position');
  animation.setAttribute('from', `0 ${options.playArea.height / 2} ${options.creationPosition - (options.depth / 2)}`);
  animation.setAttribute('to', `0 ${options.playArea.height / 2} ${options.maxDepth + options.playArea.width - (options.depth / 2)}`);
  animation.setAttribute('dur', options.dur);
  animation.setAttribute('easing', 'linear');

  entity.appendChild(animation);

  for (let animation of options.animations) {
    const aanimation = document.createElement('a-animation');

    for (let key of Object.keys(animation)) {
      aanimation.setAttribute(key, animation[key]);
    }

    entity.appendChild(aanimation);
  }

  return entity;
};

export const getObj = (type, options) => {
  let element;

  if (type === 'collision') {
    element = document.createElement(options.element);
    element.setAttribute('material', options.material);
    element.setAttribute('opacity', options.opacity);

    for (let key of Object.keys(options.elementAttributes)) {
      element.setAttribute(key, options.elementAttributes[key]);
    }

    element.className = 'block';
  } else if (type === 'sphere') {
    element = document.createElement('a-sphere');
    element.setAttribute('material', 'src: #ballTexture; repeat: 10 10');
    element.setAttribute('scale', '0.2 0.2 0.2');
    element.className = 'bonus';

    // const light = document.createElement('a-light');

    // light.setAttribute('type', 'ambient');
    // light.setAttribute('color', '#13c490');
    // light.setAttribute('intensity', '0.25');
    // light.setAttribute('distance', '0.05');

    // element.appendChild(light);
  }

  element.classList.add('gamecollision');

  return element;
}

export const generateTemplate = (options) => {
  const elements = [];
  const types = {
    'x': 'collision',
    'p': 'sphere'
  };

  const width = options.playArea.width;
  const height = options.height;
  const breakLine = /(\r\n|\n|\r)/gm;

  const template = options.template
    .split(breakLine)
    .map((it) => it.replace(/(\r\n|\n|\r)/gm, ''))
    .map((it) => it.replace(/ /g,''))
    .filter((it) => it.length)
    .map((it) => it.split(''));

  for (let row = 0; row < template.length; row++) {
    for (let column = 0; column < template[row].length; column++) {
      const char = template[row][column];

      if (char !== '-') {
        const element = getObj(types[char], options);

        // size
        const ew = width / template[row].length;
        const eh = height / template.length;

        const ed = randomIntFromInterval(500, 1000) / 100;

        element.setAttribute('width', ew);
        element.setAttribute('height', eh);
        element.setAttribute('depth', options.depth);

        const pw = (column * ew) - (width / 2 - (ew / 2));
        const ph = (height / 2 - (eh / 2)) - (row * eh);
        const pz = 0;

        element.setAttribute('position', `${pw} ${ph} 0`);

        elements.push(element);
      }
    }
  }

  return elements;
};
