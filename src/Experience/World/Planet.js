import * as THREE from 'three'
import Time from '../Utils/Time'
import Orbit from "./Orbit";

export default class Planet {
    constructor(data, _options) {
        this.experience = window.experience
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.objectToTest = this.experience.raycaster.objectToTest
        this.data = data
        this.time = new Time()

        this.setPlanets()
        this.setHover()
        if(this.data.ring){
            this.setRing()
        }
        this.setMoon()
        this.setOrbit()

    }

    setPlanets() {
        this.planetGroup = new THREE.Group();
        this.scene.add(this.planetGroup)
        this.geometry = new THREE.SphereGeometry(1, 32, 32, 1)
        this.material = new THREE.MeshPhongMaterial({})

        const textureMap = this.data.astreName.toLowerCase() + 'Map'
        this.material.map = this.resources.items[textureMap]
        if(this.data.textureHeight) {
            this.textureHeight = this.data.astreName.toLowerCase() + 'Height'
            this.material.displacementMap = this.resources.items[this.textureHeight]
            this.material.displacementScale = 0.05
        }

        this.astreMesh = new THREE.Mesh( this.geometry, this.material);
        this.astreMesh.geometry.setAttribute('uv2', new THREE.BufferAttribute(this.astreMesh.geometry.attributes.uv.array, 2))
        this.astreMesh.name = this.data.astreName
        this.astreMesh.scale.set(this.data.size, this.data.size, this.data.size);
        this.planetGroup.position.set(this.data.Xposition,this.data.Yposition,this.data.Zposition)
        if(this.astreMesh.name === 'Saturn' || this.astreMesh.name === 'Earth' || this.astreMesh.name === 'Neptune' || this.astreMesh.name === 'Uranus') {
            this.planetGroup.rotateX(Math.PI / 10)
        }

        this.planetGroup.add(this.astreMesh)
        this.objectToTest.push(this.astreMesh)
    }

    setHover() {
        this.raduis = Math.sqrt((this.data.size)**2.5 + (this.data.size)**2.5)
        this.curveOrbit = new THREE.EllipseCurve(
            0,  0,            // ax, aY
            this.raduis, this.raduis,           // xRadius, yRadius
            0,  2 * Math.PI,  // aStartAngle, aEndAngle
            false,            // aClockwise
            0                 // aRotation
        );
        this.pointsOrbit = this.curveOrbit.getPoints( 50 );
        this.geometryOrbit = new THREE.BufferGeometry().setFromPoints( this.pointsOrbit );
        this.materialOrbit = new THREE.LineBasicMaterial( {
            color : new THREE.Color( 0xFFB525 )
        });

        this.orbit = new THREE.Line( this.geometryOrbit,this.materialOrbit );
        this.orbit.rotateX(Math.PI / 8)
        this.orbit.visible = false
        this.time.on('tick', () => {
            this.orbit.rotateX(Math.PI / 2)
        })
        this.planetGroup.add(this.orbit)
    }

    setRing() {
        this.geometry = new THREE.RingGeometry(3, 5, 64, )
        this.material = new THREE.MeshPhongMaterial({})

        this.textureRing = this.data.astreName.toLowerCase() + 'Ring'
        this.texture = this.resources.items[this.textureRing]
        this.pos = this.geometry.attributes.position;
        this.v3 = new THREE.Vector3();
        for (let i = 0; i < this.pos.count; i++){
            this.v3.fromBufferAttribute(this.pos, i);
            this.geometry.attributes.uv.setXY(i, this.v3.length() < 4 ? 0 : 1, 1);
        }
        this.material.map = this.texture
        this.material.side = THREE.DoubleSide

        this.ring = new THREE.Mesh( this.geometry, this.material);
        this.ring.name = this.data.astreName + 'ring'
        this.ring.rotation.x = Math.PI / 2
        this.ring.scale.set(this.data.size / 2 ,this.data.size / 2,this.data.size / 2);
        this.planetGroup.add(this.ring)
    }

    setOrbit() {
        new Orbit(this.scene, 1, this.data.Xposition, this.data.Zposition, this.data.color)
    }

    setMoon() {
        if(this.data.moons.length > 0){
            this.moonMaterial = this.material.clone()
            const moonTextureMap = this.data.moons[0].name.toLowerCase() + 'Map'
            this.moonMaterial.map = this.resources.items[moonTextureMap]
            this.moon = new THREE.Mesh( this.geometry, this.moonMaterial);
            this.moon.scale.set(this.data.moons[0].size, this.data.moons[0].size, this.data.moons[0].size);
            this.moon.position.set(this.data.moons[0].Xposition, this.data.moons[0].Yposition, this.data.moons[0].Zposition)
            this.planetGroup.add(this.moon)
            this.objectToTest.push(this.moon)
        }
    }

    resize() {
    }

    update() {
    }

    destroy() {
    }
}


