import React from 'react'
import { XR, Controllers } from '@react-three/xr'
import { Canvas } from '@react-three/fiber'
import PlayerPlane from './PlayerPlane'
import UserInterface from './UserInterface'

export function Scene() {

  return (
    <>
      <Canvas
        camera={{ fov: 70, near: 0.1, far: 1000 }}
      >
        <XR referenceSpace="local">
          <ambientLight color={"000000"} />
          <pointLight position={[10, 10, 10]} />
          <PlayerPlane
            position={[0, 0, -0.3]}
          />
          <UserInterface />
        </XR>
      </Canvas>
    </>
  )
}

export default Scene
