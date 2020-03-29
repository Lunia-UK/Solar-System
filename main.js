let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// Mercury 
const textureMercury = new THREE.TextureLoader().load('texture/mercury/mercurymap.jpg');
let geometryMercury = new THREE.SphereGeometry( 13, 32, 32 );
const materialMercury = new THREE.MeshBasicMaterial({ map: textureMercury });
let mercuryMesh = new THREE.Mesh( geometryMercury, materialMercury );
materialMercury.bumpMap = THREE.ImageUtils.loadTexture('texture/mercury/mercurybump.jpg')
materialMercury.bumpScale = 0.05
scene.add( mercuryMesh );

// Moon 
const textureMoon = new THREE.TextureLoader().load('texture/moon/moonmap2k.jpg');
let geometryMoon = new THREE.SphereGeometry( 13, 32, 32 );
const materialMoon = new THREE.MeshBasicMaterial({ map: textureMoon });
let moonMesh = new THREE.Mesh( geometryMoon, materialMoon );
materialMoon.bumpMap = THREE.ImageUtils.loadTexture('texture/moon/moonbump2k.jpg')
materialMoon.bumpScale = 0.05


camera.position.z = 50;

const btnMoon = document.querySelector('#moon')
const btnMercury = document.querySelector('#mercury')
btnMoon.addEventListener('click', function displayMoon(){
    scene.add( moonMesh )
    scene.remove( mercuryMesh )
})
btnMercury.addEventListener('click', function displayMercury(){
    scene.add( mercuryMesh )
    scene.remove( moonMesh )
})

let animate = function () {
    requestAnimationFrame( animate );

    moonMesh.rotation.y += 0.0025;
    mercuryMesh.rotation.y += 0.0025;

    renderer.render( scene, camera );
};

animate();