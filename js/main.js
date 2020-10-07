///escape game
//hover arrow over player at beginning

import {OrbitControls} from "https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/controls/OrbitControls.js";
var walkAction;
document.addEventListener("DOMContentLoaded", function(event) { 
    var width=1000;
    var height=1000;
    var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var d = 35;
    var clock = new THREE.Clock();

var camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );
    camera.zoom=9;

    camera.updateProjectionMatrix();
camera.position.set( -382, 508, -724 ); // all components equal
 camera.lookAt( scene.position ); // or the origin
    var mixer;
var axesHelper = new THREE.AxesHelper( 10 );
//scene.add( axesHelper );
    var renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.physicallyCorrectLights = true;

    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.toneMappingExposure = 1;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;


    renderer.setClearColor(0xEEEEEE);
    var controls = new OrbitControls( camera, renderer.domElement );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    var pmremGenerator = new THREE.PMREMGenerator( renderer );
				pmremGenerator.compileEquirectangularShader();

    //______________________
    var loader = new THREE.GLTFLoader();

    var object = loader.load( 'https://github.com/Nahiiko/nahiiko.github.io/raw/master/birdo.glb', function ( gltf ) {
        gltf.scene.traverse( function( child ) {
            child.castShadow=true;
            child.receiveShadow=true;
            if (child.name=="Plane"){child.castShadow=false;}

            var animations = gltf.animations;

            mixer = new THREE.AnimationMixer( gltf.scene);
            walkAction = mixer.clipAction( animations[0] );
            walkAction.play();
            animate();

} );
        scene.add( gltf.scene );

    }, undefined, function ( error ) {

        console.error( "NIKE" );

    } );
    renderer.antialias=true;
var directionalLight = new THREE.DirectionalLight(0xffffff,.8);
directionalLight.position.set(-0.3,1,1);
//directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 4096; // default is 512
directionalLight.shadow.mapSize.height = 4096;
scene.add(directionalLight);
const ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
scene.add( ambientLight );

const pointLight = new THREE.PointLight( 0xffffff,60 );
pointLight.position.set(5,4,1);
camera.add( pointLight );
    
    //__________________
    //controls.update();
    
var vector = new THREE.Vector3(); 
    
function animate() {
    requestAnimationFrame(animate); 
    var mixerUpdateDelta = clock.getDelta();
    mixer.update( mixerUpdateDelta );
    controls.update();        
  renderer.render(scene,camera);
}
//animate();
    
    
    
});

