let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Moon 
const texture = new THREE.TextureLoader().load('texture/moon/moonmap2k.jpg');
let geometry = new THREE.SphereGeometry( 13, 32, 32 );
const material = new THREE.MeshBasicMaterial({ map: texture });
let moonMesh = new THREE.Mesh( geometry, material );
material.bumpMap = THREE.ImageUtils.loadTexture('texture/moon/moonbump2k.jpg')
material.bumpScale = 0.05
scene.add( moonMesh );

camera.position.z = 50;

let animate = function () {
    requestAnimationFrame( animate );

    moonMesh.rotation.y += 0.0025;

    renderer.render( scene, camera );
};

animate();