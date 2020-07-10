import * as THREE from 'three'
import React, { useRef, useMemo  } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import Effects from './Effects'

export default function AnimatedHero(){

    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", function (event) {
            onMove([event.beta, event.gamma, event.alpha]);
        }, true);
    } else if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', function (event) {
            onMove([event.acceleration.x * 2, event.acceleration.y * 2, 0]);
        }, true);
    } else {
        window.addEventListener("MozOrientation", function (event) {
            onMove([event.orientation.x * 50, event.orientation.y * 50, 0]);
        }, true);
    }

    const tempObject = new THREE.Object3D()
    const tempColor = new THREE.Color()
    
    const onMove = (ar) =>
    {
        rotateX = (ar[0] + ar[1])/30
        rotateY = (ar[2] + ar[1])/30
    }

    let rotateX = 0
    let rotateY = 0

    let width = 7
    let height = 6
    let depth = 10

    let total = width*2*height*2*depth
    
    const colorFromCoord = (x,y,z) =>
    {
        return `rgb(${Math.floor(Math.abs(x)/width*255)},${Math.floor(Math.abs(y)/height*255)},${Math.floor(Math.abs(z)/depth*255)})`
    }
    
    const colors = []
    
    for (let x = -width; x < width; x++){
        for (let y = -height; y < height; y++){
            for (let z = 0; z < depth; z++) {
                colors.push(colorFromCoord(x,y,z))
            }
        }
    }

    function handleMouseMove(e)
    {
        rotateX = (-window.innerWidth/2 + e.screenX)/window.innerWidth;
        rotateY = (-window.innerHeight/2 + e.screenY)/window.innerHeight
    }

    function Boxes() {

        const colorArray = useMemo(() => Float32Array.from(new Array(total).fill().flatMap((_, i) => tempColor.set(colors[i]).toArray())), [])

        const ref = useRef()
        const light = useRef()


        useFrame(state => {
            const time = state.clock.getElapsedTime()
            ref.current.rotation.x = rotateY*0.1
            ref.current.rotation.y = rotateX*0.1+Math.sin(time/20)/5
            ref.current.position.x = Math.sin(time/10)
            ref.current.position.y = Math.sin(time/13)
            ref.current.position.z = Math.sin(time/20)

            let i = 0
            
            light.current.position.set(rotateX*10, -rotateY*10, ref.current.position.z*10-10)
            light.current.scale.set(0.2,0.2,0.2)
            
            for (let x = -width; x < width; x++){
                for (let y = -height; y < height; y++){
                    for (let z = 0; z < depth; z++) {

                        const id = i++

                        tempObject.position.set(x/1.5+z*x*0.1, y/1.5+z*y*0.1, -z*2+(0.2*(x*x+y*y)))
                        tempObject.rotation.x = -rotateY*0.2*z*y
                        tempObject.rotation.y = -rotateX*0.2*z*x
                        tempObject.rotation.z = (Math.sin(x / 4 + time/10) + Math.sin(y / 4 + time/10) + Math.sin(z / 4 + time/10))

                        const scale = 1*z*0.05*tempObject.rotation.z
                        tempObject.scale.set(scale, scale, scale)
                        tempObject.updateMatrix()
                        ref.current.setMatrixAt(id, tempObject.matrix)
                     }
                }
            }
            ref.current.instanceMatrix.needsUpdate = true
        })

        return (
            <>
                <instancedMesh ref={ref} args={[null, null, total]} >
                <boxBufferGeometry attach="geometry" args={[0.8, 0.8, 0.8]}>
                    <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
                </boxBufferGeometry>
                <meshPhongMaterial attach="material" vertexColors={THREE.VertexColors} />
                </instancedMesh>
                <pointLight ref={light} distance={40} intensity={2} color="lightblue">
                </pointLight>
            </>
        )
    }

    return (
    <Canvas
        gl={{ antialias: false, alpha: false }}
        camera={{ position: [0, 0, 2], near: 0.1, far: 20 }}
        onCreated={({ gl }) => gl.setClearColor('#111121')}
        onPointerMove={handleMouseMove}
        >
        <fog attach="fog" args={['#121344', 4, 20]} />
        <ambientLight />
        <pointLight position={[150, 150, 150]} intensity={0.7} />
        <Boxes />
        <Effects/>
    </Canvas>
    )
}