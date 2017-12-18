import 'whatwg-fetch';

export const cleanScene = () => {
  const mainEntity = document.querySelector('.main-entity');

  if (mainEntity) {
    mainEntity.parentNode.removeChild(mainEntity);
  }
};

export const createMain = (htmls) => {
  const scene = document.querySelector('a-scene');
  const entity = document.createElement('a-entity');

  entity.classList.add('main-entity');

  for (let html of htmls) {
    entity.innerHTML += html;
  }

  scene.appendChild(entity);
};

export const loadScene = function(scene, player) {
  const promises = [scene, player]
    .map(url => fetch(url).then(y => y.text()));

  Promise.all(promises)
  .then(([sceneHtml, playerHtml]) => {
    cleanScene();
    createMain([sceneHtml, playerHtml]);
  });
};
