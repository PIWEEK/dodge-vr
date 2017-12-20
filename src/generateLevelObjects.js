import { systemEmmiter } from './utils/system';

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

const createEntity = (options) => {
  const entity = document.createElement('a-entity');

  // performance 1
  // entity.setAttribute('move', 'speed', options.speed);
  // entity.setAttribute('move', 'active', true);

  return entity;
}

export function startLevel(level, phases, options) {
  let currentPhase = 0;

  options.delay = options.delay || 1000;
  options.creationPosition = options.creationPosition || -50;
  /// options.speed = options.speed | 20;
  options.dur = options.dur || 3000;
  options.depth = options.depth || 1;

  const depths = phases
    .filter((o) => o.options && o.options.depth)
    .map((o) => o.options.depth);

  const maxDepth = Math.max.apply(Math, depths) || options.depth;

  const generateLevel = () => {
    const phase = phases[currentPhase];
    const delay = phase.options.delay || options.delay;
    const depth = phase.options.depth || options.depth;
    const creationPosition = phase.options.creationPosition || options.creationPosition;
    const dur = phase.options.dur || options.dur;
    const animations = phase.options.animations || [];
    // const speed = phase.options.speed || options.speed;

    const levelEntity = generateTemplateBlock({
      // speed: speed,
      dur: dur,
      depth: depth,
      creationPosition: creationPosition,
      rowSize: options.rowSize,
      columnSize: options.columnSize,
      playArea: options.playArea,
      template: phase.template,
      maxDepth: maxDepth,
      animations: animations
    });

    // performance 1
    // levelEntity.setAttribute('move', 'depth', maxDepth);

    level.appendChild(levelEntity);
    systemEmmiter.emit('reloadCollisions');

    if (currentPhase + 1 < phases.length) {
      currentPhase++;

      setTimeout(generateLevel, delay);
    }
  }

  generateLevel();
}

export const generateTemplateBlock = (options) => {
  const entity = createEntity(options);
  const elements = generateTemplate(options);
  for (let element of elements) {
    entity.appendChild(element);
  }

  // performance 1
  // position height is geometry height / 2
  // entity.setAttribute('position', `0 ${options.playArea.height / 2} ${options.creationPosition}`);

  const animation = document.createElement('a-animation');

  animation.setAttribute('attribute', 'position');
  animation.setAttribute('from', `0 ${options.playArea.height / 2} ${options.creationPosition}`);
  animation.setAttribute('to', `0 ${options.playArea.height / 2} ${options.maxDepth + 1}`);
  animation.setAttribute('dur', options.dur);
  animation.setAttribute('easing', 'linear');

  entity.addEventListener('animationend', () => {
    entity.parentNode.removeChild(entity);
  });

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

export const getObj = (type) => {
  let element;

  if (type === 'box') {
    element = document.createElement('a-box');
    element.setAttribute('material', 'src: #cubeBlue; repeat: 1 1');
    element.setAttribute('opacity', '0.5');
    element.className = 'block';
  } else if (type === 'sphere') {
    element = document.createElement('a-sphere');
    element.setAttribute('material', 'src: #ballTexture; repeat: 10 10');
    element.setAttribute('scale', '0.2 0.2 0.2');
    element.className = 'bonus';
    
    const light = document.createElement('a-light');

    light.setAttribute('type', 'ambient');
    light.setAttribute('color', '#13c490');
    light.setAttribute('intensity', '0.25');
    light.setAttribute('distance', '0.05');

    element.appendChild(light);
  }

  element.classList.add('gamecollision');

  return element;
}

export const generateRandomBlock = (options) => {
  const entity = createEntity(options);

  for (let i = 0; i < options.size; i++) {
    const element = document.createElement('a-box');

    const ew = randomIntFromInterval(25, 80) / 100;
    const eh = randomIntFromInterval(25, 80) / 100;
    const ez = randomIntFromInterval(500, 1000) / 100;
    element.setAttribute('scale', `${ew} ${eh} ${ez}`);

    element.setAttribute('material', 'src: #cubeBlue; repeat: 3 3');

    const pw = randomIntFromInterval(-100, 100);
    const ph = randomIntFromInterval(eh, 200);
    const pz = options.creationPosition;
    element.setAttribute('position', `${pw / 100} ${ph / 100} ${pz}`); // w, h, z

    entity.appendChild(element);
  }

  return entity;
};

export const generateRandomLevel = () => {
  const entity = createEntity({speed: 20});
  const objects = randomIntFromInterval(30, 50);

  for (let i = 0; i < objects; i++) {
    const element = document.createElement('a-box');

    const a = randomIntFromInterval(25, 80) / 100;
    const b = randomIntFromInterval(25, 80) / 100;
    const c = randomIntFromInterval(100, 200) / 100;
    const d = a + ' ' + b + ' ' + c;

    element.setAttribute('scale', d);
    element.setAttribute('material', 'src: #cubeBlue; repeat: 2 2');

    const w = randomIntFromInterval(-100, 100);
    const h = randomIntFromInterval(0, 200);
    const z = randomIntFromInterval(-110, -400);
    element.setAttribute('position', `${w / 100} ${h / 100} ${z}`); // w, h, z

    entity.appendChild(element);
  }

  return entity;
};

export const generateTemplate = (options) => {
  const elements = [];
  const rowSize = options.rowSize;
  const columnSize = options.columnSize;
  const types = {
    'x': 'box',
    'p': 'sphere'
  };

  const width = options.playArea.width;
  const height = options.playArea.height;

  const template = options.template
  .replace(/(\r\n|\n|\r)/gm,'') // remove break lines
  .replace(/ /g,''); // remove white spaces

  for (let row = 0; row < rowSize; row++) {
    for (let column = 0; column < columnSize; column++) {
      const char = template[(row * columnSize)  + column];

      if (char !== '-') {
        const element = getObj(types[char]);

        // size
        const ew = width / columnSize;
        const eh = height / rowSize;

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


/*
export function startLevel(level, phases, options) {
  let currentPhase = 0;

  options.delay = options.delay | 1000;
  options.creationPosition = options.creationPosition | -50;
  options.speed = options.speed | 20;
  options.depth = options.depth | 1;

  const depths = phases
    .filter((o) => o.options && o.options.depth)
    .map((o) => o.options.depth);

  const maxDepth = Math.max.apply(Math, depths) || options.depth;

  const generateLevel = (phase) => {
    const depth = phase.options.depth || options.depth;
    const creationPosition = phase.options.creationPosition || options.creationPosition;
    const speed = phase.options.speed || options.speed;

    const levelEntity = generateTemplateBlock({
      speed: speed,
      depth: depth,
      creationPosition: creationPosition,
      rowSize: options.rowSize,
      columnSize: options.columnSize,
      playArea: options.playArea,
      template: phase.template
    });

    levelEntity.setAttribute('move', 'depth', maxDepth);
    levelEntity.setAttribute('visible', false);

    return levelEntity;
  }

  let timeout = 0;

  phases.forEach((phase, index) => {
    const delay = phase.options.delay || options.delay;  
    const levelEntity = generateLevel(phase);

    level.appendChild(levelEntity);

    timeout += delay;

    setTimeout(() => {
      levelEntity.setAttribute('visible', true);
      levelEntity.setAttribute('move', 'active', true);
    }, timeout);
  });

  systemEmmiter.emit('reloadCollisions');
}
*/