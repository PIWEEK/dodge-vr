import { getState, state, dispatch } from '../utils/state';
import { loadScene } from '../utils/sceneManipulation';

AFRAME.registerComponent('entity-phase', {
  init: function() {
    this.active = true;
    this.discardFirstTick = true; // why???
    this.bornBox = document.querySelector('.born-box');

    this.collisions = [];
    this.elMax = new THREE.Vector3();
    this.elMin = new THREE.Vector3();
  },
  tick: (function () {
    var boundingBox = new THREE.Box3();
    return function () {
      if (!this.active) return;

      if (this.discardFirstTick) {
        this.discardFirstTick = false;
        return;
      }      

      var collisions = [];
      var el = this.el;
      var mesh = el.getObject3D('mesh');
      var self = this;

      // No mesh, no collisions
      if (!mesh) { return; }
      // Update the bounding box to account for rotations and
      // position changes.
      updateBoundingBox();
      // Update collisions.
      if (!intersect(this.bornBox)) {
        this.active = false;
        self.el.emit('exitborn');
      }

      // AABB collision detection
      function intersect (el) {
        var intersected;
        var mesh = el.getObject3D('mesh');
        var elMin;
        var elMax;
        if (!mesh) { return; }
        boundingBox.setFromObject(mesh);
        elMin = boundingBox.min;
        elMax = boundingBox.max;

        // Bounding boxes are always aligned with the world coordinate system.
        // The collision test checks for the conditions where cubes intersect.
        // It's an extension to 3 dimensions of this approach (with the condition negated)
        // https://www.youtube.com/watch?v=ghqD3e37R7E
        intersected = (self.elMin.x <= elMax.x && self.elMax.x >= elMin.x) &&
                      (self.elMin.y <= elMax.y && self.elMax.y >= elMin.y) &&
                      (self.elMin.z <= elMax.z && self.elMax.z >= elMin.z);
        return intersected;
      }


      function updateBoundingBox () {
        boundingBox.setFromObject(mesh);
        self.elMin.copy(boundingBox.min);
        self.elMax.copy(boundingBox.max);
      }
    };
  })()
});
