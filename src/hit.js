AFRAME.registerComponent('hit', {
    play: function () {
      var el = this.el;
      setTimeout(() => {
          el.addEventListener('hit', this.onHit);
      }, 500);
    },

    pause: function () {
      var el = this.el;
      el.removeEventListener('hit', this.onHit);
    },

    onHit: function (evt) {
      var hitEl = evt.detail.el;
      if (hitEl) {
          document.querySelector('a-text').setAttribute('visible', true);
      }
    }
  });
