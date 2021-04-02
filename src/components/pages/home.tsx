import React from 'react'
import * as THREE from 'three'
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'

type Props = any

class Homepage extends React.Component<Props, {}> {
    el: any

    sceneSetup = () => {
        // get container dimensions and use them for scene sizing
        const width = this.el.clientWidth
        const height = this.el.clientHeight

        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(
            75, // fov = field of view
            width / height, // aspect ratio
            0.1, // near plane
            1000 // far plane
        )

        // set some distance from a cube that is located at z = 0
        this.camera.position.z = 5

        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(width, height)
        this.el.appendChild(this.renderer.domElement) // mount using React ref
    }

    addCustomSceneObjects = () => {}
    startAnimationLoop = () => {}

    scene: THREE.Scene = new Scene()
    camera: THREE.PerspectiveCamera = new PerspectiveCamera()
    renderer: THREE.WebGLRenderer = new WebGLRenderer()

    componentDidMount() {
        this.sceneSetup()
        this.addCustomSceneObjects()
        this.startAnimationLoop()
    }

    render() {
        return <div ref={(ref) => (this.el = ref)}>home</div>
    }
}

export default Homepage
