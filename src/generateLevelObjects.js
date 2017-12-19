function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

export const generateRandomLevel = () => {
  const entity = document.createElement('a-entity');

  entity.setAttribute('move', 'speed', 20);

  const objects = randomIntFromInterval(30, 50);

  for (let i = 0; i < objects; i++) {
    const element = document.createElement('a-box');
    
    const a = randomIntFromInterval(25, 80) / 100;
    const b = randomIntFromInterval(25, 80) / 100;
    const c = randomIntFromInterval(100, 200) / 100;
    const d = a + ' ' + b + ' ' + c;
    console.log(d);
    element.setAttribute('scale', d);
    element.setAttribute('material', 'src: #cubeBlue; repeat: 3 3');

    const w = randomIntFromInterval(-100, 100);
    const h = randomIntFromInterval(0, 200);
    const z = randomIntFromInterval(-110, -400);
    element.setAttribute('position', `${w / 100} ${h / 100} ${z}`); // w, h, z

    // random color
    const min = {x: 0, y: 0, z: 0};
    const max = {x: 1, y: 1, z: 1};

    entity.appendChild(element);
  }

  return entity;

  // <a-box color="red" position="1 1 0" scale="1 1  1"></a-box>

};
