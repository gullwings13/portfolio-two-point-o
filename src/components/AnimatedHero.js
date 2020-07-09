import * as THREE from 'three'
import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import Effects from './Effects'
import { random } from 'lodash'


export default function AnimatedHero(){
    // const niceColors = 
    const niceColors = [
        [ "#B15E6C", "#a7dbd8", "#e0e4cc", "#f38630", "#fa6900" ],
        [ "#424b54","#93a8ac","#ffffff","#e2b4bd","#9b6a6c"]
    ]

    let pallette = random(niceColors.length-1)

    console.log(pallette)
    console.log(niceColors[pallette])

    const tempObject = new THREE.Object3D()
    const tempColor = new THREE.Color()
    

    let rotateX = 0
    let rotateY = 0

    let width = 7
    let height = 6
    let depth = 6

    let total = width*2*height*2*depth
    
    const colorFromCoord = (x,y,z) =>
    {
        return `rgb(${Math.floor(Math.abs(x)/width*255)},${Math.floor(Math.abs(y)/height*255)},${Math.floor(Math.abs(z)/depth*255)})`
    }
    
    //const colors = new Array(total).fill().map(() => niceColors[pallette][Math.floor(Math.random() * 5)])
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
        // const [hovered, setHovered] = useState()

        const colorArray = useMemo(() => Float32Array.from(new Array(total).fill().flatMap((_, i) => tempColor.set(colors[i]).toArray())), [])

        const ref = useRef()
    
        // const previous = useRef()
        // useEffect(() => void (previous.current = hovered), [hovered])

        useFrame(state => {
            const time = state.clock.getElapsedTime()
            ref.current.rotation.x = rotateY*0.1
            ref.current.rotation.y = rotateX*0.1
            ref.current.position.x = Math.sin(time/10)
            ref.current.position.y = Math.sin(time/13)
            ref.current.position.z = Math.sin(time/20)

            let i = 0
            
            //console.log(hovered)

            for (let x = -width; x < width; x++){
                for (let y = -height; y < height; y++){
                    for (let z = 0; z < depth; z++) {

                        const id = i++

                        tempObject.position.set(x/1.5, y/1.5, -z+(0.1*(x*x+y*y)))
                        tempObject.rotation.x = -rotateY*2
                        tempObject.rotation.y = -rotateX*2
                        tempObject.rotation.z = (Math.sin(x / 4 + time/10) + Math.sin(y / 4 + time/10) + Math.sin(z / 4 + time/10))

                        // if (hovered !== previous.current) {
                        //     tempColor.set(id === hovered ? 'white' : colors[id]).toArray(colorArray, id * 3)
                        //     ref.current.geometry.attributes.color.needsUpdate = true
                        // }
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
            <instancedMesh ref={ref} args={[null, null, total]} 
            // onPointerMove={e => setHovered(e.instanceId)} onPointerOut={e => setHovered(undefined)}
            >
            <boxBufferGeometry attach="geometry" args={[0.8, 0.8, 0.8]}>
                <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
            </boxBufferGeometry>
            <meshPhongMaterial attach="material" vertexColors={THREE.VertexColors} />
            </instancedMesh>
        )
    }

    return (
    <Canvas
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [0, 0, 4], near: 1, far: 20 }}
        onCreated={({ gl }) => gl.setClearColor('#223344')}
        onPointerMove={handleMouseMove}
        >
        <ambientLight />
        <pointLight position={[150, 150, 150]} intensity={0.5} />
        <Boxes />
        <Effects/>
    </Canvas>
    )
}