import * as THREE from 'three'
import gsap from "gsap";

export default class Raycaster {

    constructor() {
        this.experience = window.experience
        this.config = this.experience.config
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera
        this.controls = this.camera.modes.debug.orbitControls
        this.resources = this.experience.resources
        this.infoElements = this.experience.infoElements
        this.objectToTest = []
        this.objectFocus = false

        this.mouse()
        this.setRaycaster()
    }

    mouse() {
        this.mouse = new THREE.Vector2()
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = event.clientX / this.sizes.width * 2 - 1
            this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1
        })
    }
    setRaycaster() {
        this.raycaster = new THREE.Raycaster()
        this.time.on('tick', () => {
            this.raycaster.setFromCamera(this.mouse, this.camera.instance)
            this.intersects = this.raycaster.intersectObjects(this.objectToTest);
            for(const intersect of this.intersects) {

                if(this.intersects.length && this.objectFocus !== this.intersects[0].object) {
                    this.currentIntersect = this.intersects[0]
                    this.currentIntersect.object.parent.children[1].visible = true
                } else {
                    this.currentIntersect = null
                }
            }
            for(const object of this.objectToTest) {
                if(!this.intersects.find(intersect => intersect.object === object)) {
                    object.parent.children[1].visible = false
                    if(object !== this.objectFocus){
                    }
                }
            }

        })
        this.dblClick();

    }

    dblClick() {
        window.addEventListener(
            "dblclick",
            () => {
                if(this.currentIntersect && this.objectFocus !== this.currentIntersect.object) {
                    this.objectFocus = this.currentIntersect.object;
                    this.x = this.currentIntersect.object.parent.position.x
                    this.y = this.currentIntersect.object.parent.position.y
                    this.z = this.currentIntersect.object.parent.position.z
                    gsap.to(this.camera.modes.debug.instance.position, {
                        duration: 1,
                        x: this.x,
                        y: this.y ,
                        z: this.z + (this.currentIntersect.object.scale.x * 8 ),
                    })
                    this.objectFocusPosition = this.objectFocus.parent.position.clone()
                    this.camera.modes.debug.orbitControls.target = this.objectFocusPosition
                }
            },
            false
        )
    };
}