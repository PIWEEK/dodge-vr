AFRAME.registerComponent('custom-reload', {
  play: function() {
    if (this.el) {
      this.el.addEventListener('xbuttondown', (evt) => {
        window.location.reload();
      });
    }
  }
});
