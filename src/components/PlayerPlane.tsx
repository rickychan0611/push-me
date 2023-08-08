import React, { useState, useRef, useEffect } from 'react'
import { Interactive } from '@react-three/xr'
import { Text } from '@react-three/drei'
import { useFrame, Vector3 } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

type Props = {
  position: Vector3
}

const PositionMarker = ({ position }: Props) => {
  const meshRef = useRef<any>();
  const amplitude = 0.2; // The maximum distance the mesh will move from its initial position
  const frequency = 0.001; // The speed of movement, higher values make it faster
  let isMovingLeft = true
  const randomIntervalMin = 2; // Minimum time interval for random movement (in seconds)
  const randomIntervalMax = 5; // Maximum time interval for random movement (in seconds)


  const [frequencyX, setFrequencyX] = useState(0);
  const [frequencyZ, setFrequencyZ] = useState(0);
  const [amplitudeX, setAmplitudeX] = useState(0);
  const [amplitudeZ, setAmplitudeZ] = useState(0);

  // Random direction change interval between 3 and 10 seconds
  const minInterval = 3;
  const maxInterval = 10;
  const randomInterval = () => Math.random() * (maxInterval - minInterval) + minInterval;

  useFrame(({ clock, camera }) => {


  });

  return (
    <>
      <mesh position={[0, 0, -0.6]}>
        <Text position={[0, 0, 0]} fontSize={.05} color="#fff" anchorX="center" anchorY="middle">
          RICKY
        </Text>
      </mesh>
      
      {/* <mesh ref={meshRef}
        position={position}
      >
        <planeGeometry args={[0.1, 0.1]} />
        <meshBasicMaterial color={'blue'} />
        <Text position={[0, 0.07, 0]} fontSize={.05} color="#fff" anchorX="center" anchorY="middle">
          RICKY
        </Text>
      </mesh> */}
    </>
  );
};


const PlayerPlane = ({ position }: Props) => {
  const [hover, setHover] = useState(false)
  const [color, setColor] = useState<any>('blue')

  const onSelect = () => {
    setColor((Math.random() * 0xffffff) | 0)
  }

  return (
    <Interactive onHover={() => setHover(true)} onBlur={() => setHover(false)} onSelect={onSelect} >
      <PositionMarker position={position} />
    </Interactive>
  )
}

export default PlayerPlane
