
var currentImage = 'assets/images/0000000000.png';

AFRAME.registerComponent('rotation-reader81', {
  tick: function () {
    var x = radians_to_degrees(this.el.object3D.rotation.x) - 90;
    var z = radians_to_degrees(this.el.object3D.rotation.z);
    var imageId = document.getElementById('imageid');
    imageId.setAttribute('src', 'assets/images/00000000' + calc(x, z) + '.png');
    currentImage = 'assets/images/00000000' + calc(x, z) + '.png';
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
    currentImage = 'assets/images/0000000' + calc(x, z) + '.png';
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
        selectingButtoms(EO.target.id)
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
        selectingButtoms(EO.target.id)
      }
    };
    nextButton2.onclick = nextButton2Click;
  }
})



AFRAME.registerComponent('next-button3', {
  init: function () {
    const nextButton3 = document.getElementById('nextbutton3')
    const imageidDOM = document.getElementById('imageid');
    const cubeDOM = document.getElementById('cube');
    const nextButton3Click = (EO) => {
      imageidDOM.setAttribute('visible', 'true');
      cubeDOM.setAttribute('visible', 'false');
      selectingButtoms(EO.target.id)
    };
    nextButton3.onclick = nextButton3Click;
  }
})


AFRAME.registerComponent('next-button4', {
  init: function () {
    const nextButton4 = document.getElementById('nextbutton4')
    const imageidDOM = document.getElementById('imageid');
    const cubeDOM = document.getElementById('cube');
    const nextButton4Click = (EO) => {
      imageidDOM.setAttribute('visible', 'false');
      cubeDOM.setAttribute('visible', 'true');
      selectingButtoms(EO.target.id)
    };
    nextButton4.onclick = nextButton4Click;
  }
})




AFRAME.registerComponent('mesh-acces', {
  tick: function () {
    // instantiate a loader
    const scene = this.el.sceneEl.object3D;
    //const mesh = this.el.sceneEl.object3D.children['0'].children['1'].children['0'].children['0'].children['0'].children['0'].children['0'];
    const mesh = this.el.sceneEl.object3D.children['0'].children['1'].children['0'].children['0'];
    /*console.log("scene");
    console.log(scene);
    console.log("mesh");
    console.log(mesh);*/



    //for (var i = 0; i <= this.el.sceneEl.object3D.lenght; i++) console.log(this.el.sceneEl.object3D.children[i]);
    //console.log(mesh.name.indexOf("Rectangle062"));

    const loader = new THREE.TextureLoader();
    loader.load(
      // resource URL
      currentImage,

      // onLoad callback
      function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(2, 2);
        texture.center.set(1, 1);
        texture.offset.set(0.1, 0.1);
        texture.flipY = false;
        //console.log('texture');
        //console.log(texture);
        // in this example we create the material when the texture is loaded
        /*const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide
        });*/
        //const material = new THREE.MeshPhongMaterial( { map: texture, opacity:1, transparent: true} );
        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, })
        mesh.traverse((o) => {
          if (o.isMesh) {
            o.material = material;
          }
        });
      },

      // onProgress callback currently not supported
      undefined,

      // onError callback
      function (err) {
        console.error('An error happened.');
      }
    );


  },

})


AFRAME.registerComponent('do-something', {
  init: function () {
    var textureLoader = new THREE.TextureLoader();
    var texture = textureLoader.load('assets/images/0000000000.png');
    texture.flipY = false;
    const scene = document.getElementById('amarker').el;
    //console.log(scene)
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



function selectingButtoms(id) {
  const button1 = document.getElementById('nextbutton1');
  const button2 = document.getElementById('nextbutton2');
  const button3 = document.getElementById('nextbutton3');
  const button4 = document.getElementById('nextbutton4');

  switch (id) {
    case 'nextbutton1':
      button1.style.border = '4px solid red';
      button2.style.border = 'none';
      break;

    case 'nextbutton2':
      button2.style.border = '4px solid red';
      button1.style.border = 'none';
      break;

    case 'nextbutton3':
      button3.style.border = '4px solid red';
      button4.style.border = 'none';
      break;

    case 'nextbutton4':
      button4.style.border = '4px solid red';
      button3.style.border = 'none';
      break;

    default:
      button1.style.left = '20px';
      button2.style.left = '10px';
      button3.style.left = '20px';
      button4.style.left = '10px';
      break;
  }


}