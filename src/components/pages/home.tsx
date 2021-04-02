import React from 'react'
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

type Props = any

class Element extends React.Component<Props, {}> {
    requestID: number | undefined

    el: any
    scene!: THREE.Scene
    camera!: THREE.PerspectiveCamera
    renderer!: THREE.WebGLRenderer
    cube!: THREE.Mesh<THREE.BoxGeometry, THREE.MeshPhongMaterial>
    controls: any

    componentDidMount() {
        this.sceneSetup()
        this.addCustomSceneObjects()
        this.startAnimationLoop()
        window.addEventListener('resize', this.handleWindowResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize)
        this.requestID && window.cancelAnimationFrame(this.requestID)
        this.controls.dispose()
    }

    // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
    // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
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
        this.camera.position.z = 5 // is used here to set some distance from a cube that is located at z = 0
        // OrbitControls allow a camera to orbit around the object
        // https://threejs.org/docs/#examples/controls/OrbitControls
        this.controls = new OrbitControls(this.camera, this.el)
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(width, height)
        this.el.appendChild(this.renderer.domElement) // mount using React ref
    }

    // Here should come custom code.
    // Code below is taken from Three.js BoxGeometry example
    // https://threejs.org/docs/#api/en/geometries/BoxGeometry
    addCustomSceneObjects = () => {
        const geometry = new THREE.BoxGeometry(2, 2, 2)
        const material = new THREE.MeshPhongMaterial({
            color: 0x156289,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            flatShading: true,
        })
        this.cube = new THREE.Mesh(geometry, material)
        this.scene.add(this.cube)

        const lights = []
        lights[0] = new THREE.PointLight(0xffffff, 1, 0)
        lights[1] = new THREE.PointLight(0xffffff, 1, 0)
        lights[2] = new THREE.PointLight(0xffffff, 1, 0)

        lights[0].position.set(0, 200, 0)
        lights[1].position.set(100, 200, 100)
        lights[2].position.set(-100, -200, -100)

        this.scene.add(lights[0])
        this.scene.add(lights[1])
        this.scene.add(lights[2])
    }

    startAnimationLoop = () => {
        this.cube.rotation.x += 0.01
        this.cube.rotation.y += 0.01

        this.renderer.render(this.scene, this.camera)

        // The window.requestAnimationFrame() method tells the browser that you wish to perform
        // an animation and requests that the browser call a specified function
        // to update an animation before the next repaint
        this.requestID = window.requestAnimationFrame(this.startAnimationLoop)
    }

    handleWindowResize = () => {
        const width = this.el.clientWidth
        const height = this.el.clientHeight

        this.renderer.setSize(width, height)
        this.camera.aspect = width / height

        // Note that after making changes to most of camera properties you have to call
        // .updateProjectionMatrix for the changes to take effect.
        this.camera.updateProjectionMatrix()
    }

    render() {
        const style = {
            height: 700, // we can control scene size by setting container dimensions
        }

        return <div style={style} ref={(ref) => (this.el = ref)} />
    }
}

type State = {
    isMounted: boolean
}

type PropsH = any

class Homepage extends React.Component<PropsH, State> {
    state = { isMounted: true }

    render() {
        const { isMounted = true } = this.state
        return (
            <>
                <button
                    onClick={() =>
                        this.setState((state) => ({
                            isMounted: !state.isMounted,
                        }))
                    }
                >
                    {isMounted ? 'Unmount' : 'Mount'}
                </button>
                {isMounted && <Element />}
                {isMounted && <div>Scroll to zoom, drag to rotate</div>}
            </>
        )
    }
}

export default Homepage
