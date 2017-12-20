function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

const createEntity = (options) => {
  const entity = document.createElement('a-entity');

  entity.setAttribute('move', 'speed', options.speed);
  entity.setAttribute('delete-behind', true);

  return entity;
}

export const generateTemplateBlock = (options) => {
  const entity = createEntity(options);
  const elements = generateTemplate(options);

  for (let element of elements) {
    entity.appendChild(element);
  }

  // position height is geometry height / 2
  entity.setAttribute('position', `0 ${options.playArea.height / 2} ${options.creationPosition}`);

  return entity;
};

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

  const width = options.playArea.width;
  const height = options.playArea.height;

  const template = options.template
  .replace(/(\r\n|\n|\r)/gm,'') // remove break lines
  .replace(/ /g,''); // remove white spaces

  for (let row = 0; row < rowSize; row++) {
    for (let column = 0; column < columnSize; column++) {
      const char = template[(row * columnSize)  + column];

      if (char !== '-') {
        const element = document.createElement('a-box');

        // size
        const ew = width / columnSize;
        const eh = height / rowSize;

        const ed = randomIntFromInterval(500, 1000) / 100;

        element.setAttribute('width', ew);
        element.setAttribute('height', eh);
        element.setAttribute('depth', 1);

        element.setAttribute('material', 'src: #cubeBlue; repeat: 3 3');

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
