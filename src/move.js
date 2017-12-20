AFRAME.registerComponent('move', {
    schema: {
      active: {type: 'boolean'}, 
      speed: {type: 'number'},
      depth: {type: 'number'}
    },
    init: function () {
      this.directionVec3 = new THREE.Vector3();
    },
    tick: function (time, timeDelta) {
      if (this.data.active) {
        if (this.el.object3D.position.z + this.directionVec3.z > this.data.depth + 1) {
          this.el.parentNode.removeChild(this.el);
        } else {
          this.directionVec3['z'] = this.data.speed * (timeDelta / 1000);

          this.el.setAttribute('position', {
            x: this.el.object3D.position.x,
            y: this.el.object3D.position.y,
            z: this.el.object3D.position.z + this.directionVec3.z
          });
        }
      }
    }
  });
