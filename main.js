let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Sun
const textureSun = new THREE.TextureLoader().load('texture/sun/sunmap.jpg');
let geometrySun = new THREE.SphereGeometry( 13, 32, 32 );
const materialSun = new THREE.MeshBasicMaterial({ map: textureSun });
let sunMesh = new THREE.Mesh( geometrySun, materialSun );
scene.add( sunMesh );

// Mercury 
const textureMercury = new THREE.TextureLoader().load('texture/mercury/mercurymap.jpg');
let geometryMercury = new THREE.SphereGeometry( 13, 32, 32 );
const materialMercury = new THREE.MeshBasicMaterial({ map: textureMercury });
let mercuryMesh = new THREE.Mesh( geometryMercury, materialMercury );
materialMercury.bumpMap = THREE.ImageUtils.loadTexture('texture/mercury/mercurybump.jpg')
materialMercury.bumpScale = 0.05
scene.add( mercuryMesh );

// Venus 
const textureVenus = new THREE.TextureLoader().load('texture/Venus/venusmap.jpg');
let geometryVenus = new THREE.SphereGeometry( 13, 32, 32 );
const materialVenus = new THREE.MeshBasicMaterial({ map: textureVenus });
let venusMesh = new THREE.Mesh( geometryVenus, materialVenus );
materialVenus.bumpMap = THREE.ImageUtils.loadTexture('texture/Venus/venusbump.jpg')
materialVenus.bumpScale = 0.05
scene.add( venusMesh );

// Moon 
const textureMoon = new THREE.TextureLoader().load('texture/moon/moonmap2k.jpg');
let geometryMoon = new THREE.SphereGeometry( 13, 32, 32 );
const materialMoon = new THREE.MeshBasicMaterial({ map: textureMoon });
let moonMesh = new THREE.Mesh( geometryMoon, materialMoon );
materialMoon.bumpMap = THREE.ImageUtils.loadTexture('texture/moon/moonbump2k.jpg')
materialMoon.bumpScale = 0.05

// Mars 
const textureMars = new THREE.TextureLoader().load('texture/mars/mars_1k_color.jpg');
let geometryMars = new THREE.SphereGeometry( 13, 32, 32 );
const materialMars = new THREE.MeshBasicMaterial({ map: textureMars });
let marsMesh = new THREE.Mesh( geometryMars, materialMars );
materialMars.bumpMap = THREE.ImageUtils.loadTexture('texture/mars/marsbump1k.jpg')
materialMars.bumpScale = 0.05

// Jupitaire 
const textureJupitaire = new THREE.TextureLoader().load('texture/jupitaire/jupiter2_1k.jpg');
let geometryJupitaire = new THREE.SphereGeometry( 13, 32, 32 );
const materialJupitaire = new THREE.MeshBasicMaterial({ map: textureJupitaire });
let jupitaireMesh = new THREE.Mesh( geometryJupitaire, materialJupitaire );


camera.position.z = 50;

const btnMoon = document.querySelector('#moon')
const btnMercury = document.querySelector('#mercury')
const btnVenus = document.querySelector('#venus')
const btnMars = document.querySelector('#mars')
const btnJupitaire = document.querySelector('#jupitaire')
const btnSun = document.querySelector('#sun')
btnMoon.addEventListener('click', function displayMoon(){
    scene.add( moonMesh )
    scene.remove( venusMesh )
    scene.remove( mercuryMesh )
    scene.remove( marsMesh )
    scene.remove( jupitaireMesh )
    scene.remove( sunMesh )
})
btnMercury.addEventListener('click', function displayMercury(){
    scene.remove( moonMesh )
    scene.remove( venusMesh )
    scene.add( mercuryMesh )
    scene.remove( marsMesh )
    scene.remove( jupitaireMesh )
    scene.remove( sunMesh )
})
btnVenus.addEventListener('click', function displayMercury(){
    scene.remove( moonMesh )
    scene.add( venusMesh )
    scene.remove( mercuryMesh )
    scene.remove( marsMesh )
    scene.remove( jupitaireMesh )
    scene.remove( sunMesh )    
})

btnMars.addEventListener('click', function displayMercury(){
    scene.remove( moonMesh )
    scene.remove( venusMesh )
    scene.remove( mercuryMesh )
    scene.add( marsMesh )  
    scene.remove( jupitaireMesh )
    scene.remove( sunMesh ) 
})

btnJupitaire.addEventListener('click', function displayMercury(){
    scene.remove( moonMesh )
    scene.remove( venusMesh )
    scene.remove( mercuryMesh )
    scene.remove( marsMesh )  
    scene.add( jupitaireMesh )
    scene.remove( sunMesh ) 
})

btnSun.addEventListener('click', function displayMercury(){
    scene.remove( moonMesh )
    scene.remove( venusMesh )
    scene.remove( mercuryMesh )
    scene.remove( marsMesh )  
    scene.remove( jupitaireMesh )
    scene.add( sunMesh ) 
})

let animate = function () {
    requestAnimationFrame( animate );

    moonMesh.rotation.y += 0.0025;
    venusMesh.rotation.y += 0.0025;
    mercuryMesh.rotation.y += 0.0025;
    marsMesh.rotation.y += 0.0025;
    jupitaireMesh.rotation.y += 0.0025;
    sunMesh.rotation.y += 0.0025;

    renderer.render( scene, camera );
};

animate();