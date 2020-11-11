AFRAME.registerComponent('rotation-reader81', {
  tick: function () {
    var x = radians_to_degrees(this.el.object3D.rotation.x) - 90;
    var z = radians_to_degrees(this.el.object3D.rotation.z);
    var imageId = document.getElementById('imageid');
    imageId.setAttribute('src', 'AR_MATRIX_CODE_6x6/00000000' + calc(x, z) + '.png');
    function radians_to_degrees(radians) {
      var pi = Math.PI;
      return radians * (180 / pi);
    }
    function calc(x, z) {
      var imageIndex, tempIndex;
      tempIndex = Math.round(41 - (x / 7.5) + (z / 7.5) - 10 * (x / 7.5))
      if (tempIndex <= 81 && tempIndex >= 10) imageIndex = tempIndex;
      else if (tempIndex < 10 && tempIndex >= 0) imageIndex = '0' + tempIndex;
      if (tempIndex < 0) imageIndex = '00';
      if (tempIndex > 81) imageIndex = '81';
      return imageIndex
    }
  }
});


AFRAME.registerComponent('rotation-reader121', {
  tick: function () {
    var x = radians_to_degrees(this.el.object3D.rotation.x) - 90;
    var z = radians_to_degrees(this.el.object3D.rotation.z);
    var imageId = document.getElementById('imageid');
    imageId.setAttribute('src', 'AR_MATRIX_CODE_6x6/0000000' + calc(x, z) + '.png');
    function radians_to_degrees(radians) {
      var pi = Math.PI;
      return radians * (180 / pi);
    }
    function calc(x, z) {
      var imageIndex, tempIndex;
      tempIndex = Math.round(61 - (x / 6) + (z / 6) - 11 * (x / 6))
      if (tempIndex <= 121 && tempIndex >= 100) imageIndex = tempIndex;
      if (tempIndex < 100 && tempIndex >= 10) imageIndex = '0' + tempIndex;
      if (tempIndex < 10 && tempIndex >= 0) imageIndex = '00' + tempIndex;
      if (tempIndex < 0) imageIndex = '00';
      if (tempIndex > 121) imageIndex = '121';
      return imageIndex
    }
  }
});

AFRAME.registerComponent('hider-material', {
  init: function () {
    const mesh = this.el.getObject3D('mesh')
    mesh.material.colorWrite = false
  },
})
