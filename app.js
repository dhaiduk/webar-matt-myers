AFRAME.registerComponent('rotation-reader', {
  tick: function () {
    // `this.el` is the element.
    // `object3D` is the three.js object.

    // `rotation` is a three.js Euler using radians. `quaternion` also available.
    console.log("x: " + radians_to_degrees(this.el.object3D.rotation.x)+ " y: " + radians_to_degrees(this.el.object3D.rotation.y)+" z: " + radians_to_degrees(this.el.object3D.rotation.z));

    // `position` is a three.js Vector3.
    //console.log(this.el.object3D.position);
    var imageId= document.getElementById('imageid');

    if (radians_to_degrees(this.el.object3D.rotation.z)<-7.5) imageId.setAttribute('src', 'AR_MATRIX_CODE_6x6/0000000001.png');
    if (radians_to_degrees(this.el.object3D.rotation.z)>-7.5) imageId.setAttribute('src', 'AR_MATRIX_CODE_6x6/0000000000.png');
    function radians_to_degrees(radians) {
      var pi = Math.PI;
      return radians * (180 / pi);
    }
  }
});

  // <a-entity camera look-controls rotation-reader>

