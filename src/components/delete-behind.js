AFRAME.registerComponent('delete-behind', {
  tick: function() {
    if (this.el.getAttribute('position').z > 100) {
       this.el.parentNode.removeChild(this.el);
    }
  }
});
