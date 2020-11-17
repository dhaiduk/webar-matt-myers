
var currentImage;

AFRAME.registerComponent('rotation-reader81', {
  tick: function () {
    var x = radians_to_degrees(this.el.object3D.rotation.x) - 90;
    var z = radians_to_degrees(this.el.object3D.rotation.z);
    var imageId = document.getElementById('imageid');
    imageId.setAttribute('src', 'assets/images/00000000' + calc(x, z) + '.png');
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
    imageId.setAttribute('src', 'assets/images/0000000' + calc(x, z) + '.png');
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
      if (tempIndex < 0) imageIndex = '000';
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

AFRAME.registerComponent('next-button1', {
  init: function () {
    const nextButton1 = document.getElementById('nextbutton1')
    const aMarker = document.getElementById('amarker');
    const nextButton1Click = (EO) => {
      if (aMarker.getAttribute('rotation-reader121')) {
        aMarker.removeAttribute('rotation-reader121');
        aMarker.setAttribute('rotation-reader81', '');
      }

    };
    nextButton1.onclick = nextButton1Click;
  }
})

AFRAME.registerComponent('next-button2', {
  init: function () {
    const nextButton2 = document.getElementById('nextbutton2')
    const aMarker = document.getElementById('amarker');
    const nextButton2Click = (EO) => {
      if (aMarker.getAttribute('rotation-reader81')) {
        aMarker.removeAttribute('rotation-reader81');
        aMarker.setAttribute('rotation-reader121', '');
      }
    };
    nextButton2.onclick = nextButton2Click;
  }
})



AFRAME.registerComponent('mesh-acces', {
  init: function () {
    // instantiate a loader
    const scene = this.el.sceneEl.object3D;
    //const mesh = this.el.sceneEl.object3D.children['0'].children['1'].children['0'].children['0'].children['0'].children['0'];
    const mesh = this.el.sceneEl.object3D.children['0'];
    console.log(scene);
    console.log(mesh);
    //console.log(mesh.name.indexOf("01"));

    const loader = new THREE.TextureLoader();

    /*
    loader.load(
      // resource URL
      'Land_ocean_ice_cloud_hires.jpg',

      // onLoad callback
      function (texture) {
        texture.flipY = false;
        console.log(texture);
        // in this example we create the material when the texture is loaded
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide
        });

        mesh.traverse((o) => {
          if (o.isMesh) {
            // note: for a multi-material mesh, `o.material` may be an array,
            // in which case you'd need to set `.map` on each value.
            o.material.map = texture;
          }
        })
        },

          // onProgress callback currently not supported
          undefined,

          // onError callback
          function (err) {
            console.error('An error happened.');
          }
        );
          */

      },
})


AFRAME.registerComponent('do-something', {
  init: function () {
    var textureLoader = new THREE.TextureLoader();
    var texture = textureLoader.load('assets/images/start.png');
    texture.flipY = false;
    const scene = document.getElementById('amarker').el;
    console.log(scene)
    var loader = new THREE.GLTFLoader();
    loader.load('panel.glb', (gltf) => {
      var model = gltf.scene;

      model.traverse((o) => {
        if (o.isMesh) {
          // note: for a multi-material mesh, `o.material` may be an array,
          // in which case you'd need to set `.map` on each value.
          o.material.map = texture;
        }
      });
      //scene.add( model );
    });
  }
});


AFRAME.registerComponent('cube-env-map', {
  schema: {
    path: { default: '' },
    extension: { default: 'jpg' },
    format: { default: 'RGBFormat' },
    enableBackground: { default: false }
  },

  init: function () {
    const data = this.data;

    this.texture = new THREE.CubeTextureLoader().load([
      data.path + 'posx.' + data.extension, data.path + 'negx.' + data.extension,
      data.path + 'posy.' + data.extension, data.path + 'negy.' + data.extension,
      data.path + 'posz.' + data.extension, data.path + 'negz.' + data.extension
    ]);
    this.texture.format = THREE[data.format];

    if (data.enableBackground) {
      this.el.sceneEl.object3D.background = this.texture;
    }

    this.applyEnvMap();
    this.el.addEventListener('object3dset', this.applyEnvMap.bind(this));
  },

  applyEnvMap: function () {
    const mesh = this.el.getObject3D('mesh');
    const envMap = this.texture;

    if (!mesh) return;

    mesh.traverse(function (node) {
      if (node.material && 'envMap' in node.material) {
        node.material.envMap = envMap;
        node.material.needsUpdate = true;
      }
    });
  }
});