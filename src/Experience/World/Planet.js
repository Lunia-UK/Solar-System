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
        this.data = data
        this.time = new Time()

        this.setPlanets()
        if(this.data.ring){
            this.setRing()
        }
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
        this.astreMesh.scale.set(this.data.size,this.data.size,this.data.size);
        this.planetGroup.position.set(this.data.Xposition,this.data.Yposition,this.data.Zposition)
        this.planetGroup.add(this.astreMesh)

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
        new Orbit(this.planetGroup, 1, this.data.Xposition, this.data.Zposition, this.data.color)
    }

    resize() {
    }

    update() {
    }

    destroy() {
    }
}