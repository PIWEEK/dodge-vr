function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

export const generateBlock = (options) => {
/*   const entity = document.createElement('a-entity');

  entity.setAttribute('move', 'speed', options.speed);
  entity.setAttribute('delete-behind', true);
  entity.setAttribute('geometry', 'primitive', 'box');
  entity.setAttribute('geometry', 'width', '4');
  entity.setAttribute('geometry', 'height', '2');

  const elements = generateTemplate();

  for (let element of elements) {
    entity.appendChild(element);
  }

  entity.setAttribute('position', `-1 1 -50`); */

  const entity = document.createElement('a-entity');

  entity.setAttribute('move', 'speed', options.speed);
  entity.setAttribute('delete-behind', true);

  for (let i = 0; i < options.size; i++) {
    const element = document.createElement('a-box');

    const ew = randomIntFromInterval(25, 80) / 100;
    const eh = randomIntFromInterval(25, 80) / 100;
    const ez = randomIntFromInterval(500, 1000) / 100;

    element.setAttribute('scale', `${ew} ${eh} ${ez}`);

    element.setAttribute('material', 'src: #cubeBlue; repeat: 3 3');

    const pw = randomIntFromInterval(-100, 100);
    const ph = randomIntFromInterval(0, 200);
    const pz = options.creationPosition;
    element.setAttribute('position', `${pw / 100} ${ph / 100} ${pz}`); // w, h, z

    entity.appendChild(element);
  }

  return entity;
};

export const generateRandomLevel = () => {
  const entity = document.createElement('a-entity');

  entity.setAttribute('move', 'speed', 20);
  entity.setAttribute('delete-behind', true);

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

export const generateTemplate = () => {
  const elements = [];
  const rowSize = 4;
  const columnSize = 4;

  const width = 4;
  const height = 4;

  const template = `
    xxxx
    x---
    x---
    x---
  `
  .replace(/(\r\n|\n|\r)/gm,'') // remove break lines
  .replace(/ /g,''); // remove white spaces

  console.log('--------------');
  for (let row = 0; row < rowSize; row++) {
    for (let column = 0; column < columnSize; column++) {
      const char = (row * rowSize) + column;

      if (char !== '-') {
        const element = document.createElement('a-box');

        // size
        const ew = width / rowSize;
        const eh = height / columnSize;
        const ez = randomIntFromInterval(500, 1000) / 100;
        element.setAttribute('scale', `${ew} ${eh} ${ez}`);

        element.setAttribute('material', 'src: #cubeBlue; repeat: 3 3');


        const pw = (width / columnSize) * column;
        const ph = (height / rowSize) * row;
        const pz = 0;

        console.log(pw, ph);
        //element.setAttribute('position', `${pw / 100} ${ph / 100} ${pz}`); // w, h, z

        element.setAttribute('position', `0 0 0`);

        elements.push(element);
      }
    }
  }

  return elements;
};
