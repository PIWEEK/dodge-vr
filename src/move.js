AFRAME.registerComponent('move', {
    schema: {
      speed: {type: 'number'}
    },
    init: function () {
      this.directionVec3 = new THREE.Vector3();
    },
    tick: function (time, timeDelta) {
      var directionVec3 = this.directionVec3;
      var currentPosition = this.el.object3D.position;

      var factor = this.data.speed;

      // factor = 0;

      directionVec3['z'] = factor * (timeDelta / 1000);

      this.el.setAttribute('position', {
        x: currentPosition.x,
        y: currentPosition.y,
        z: currentPosition.z + directionVec3.z
      });
    }
  });
