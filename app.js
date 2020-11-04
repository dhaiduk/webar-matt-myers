AFRAME.registerComponent('rotation-reader', {
  tick: function () {
    // `this.el` is the element.
    // `object3D` is the three.js object.
    var x = radians_to_degrees(this.el.object3D.rotation.x) - 90;
    var y = radians_to_degrees(this.el.object3D.rotation.y);
    var z = radians_to_degrees(this.el.object3D.rotation.z);
    // `rotation` is a three.js Euler using radians. `quaternion` also available.
    console.log("x: " + x + " y: " + y + " z: " + y);

    // `position` is a three.js Vector3.
    //console.log(this.el.object3D.position);
    var imageId = document.getElementById('imageid');
    var imgIndex = (calc(x, z) <= 81 ? calc(x, z) : 81) < 10 ? "0" + calc(x, z) : calc(x, z);

    imageId.setAttribute('src', 'AR_MATRIX_CODE_6x6/00000000' + imgIndex + '.png');

    function radians_to_degrees(radians) {
      var pi = Math.PI;
      return radians * (180 / pi);
    }
    function calc(x, z) {
      return Math.round(41 - (x / 7.5) + (z / 7.5) - 10 * (x / 7.5))
    }

  }





});

  // <a-entity camera look-controls rotation-reader>

