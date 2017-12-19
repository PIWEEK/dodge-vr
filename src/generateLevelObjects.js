function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

export const generateRandomLevel = () => {
  const entity = document.createElement('a-entity');

  entity.setAttribute('move', 'speed', 4);

  const objects = randomIntFromInterval(100, 150);

  for (let i = 0; i < objects; i++) {
    const element = document.createElement('a-box');

    element.setAttribute('scale', '0.25 0.25 0.25');

    const w = randomIntFromInterval(-100, 100);
    const h = randomIntFromInterval(0, 200);
    const z = randomIntFromInterval(-10, -100);
    element.setAttribute('position', `${w / 100} ${h / 100} ${z}`); // w, h, z
    element.setAttribute('color', 'red');

    // random color
    const min = {x: 0, y: 0, z: 0};
    const max = {x: 1, y: 1, z: 1};

    element.setAttribute('material', 'color', '#' + new THREE.Color(
      Math.random() * max.x + min.x,
      Math.random() * max.y + min.y,
      Math.random() * max.z + min.z
    ).getHexString());

    entity.appendChild(element);
  }

  return entity;

  // <a-box color="red" position="1 1 0" scale="1 1  1"></a-box>

};
