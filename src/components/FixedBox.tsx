import React, { useRef, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Interactive } from '@react-three/xr';
import { Box, Text } from '@react-three/drei';

const NewBox = ({ position }: { position: any }) => {

  const [color, setColor] = useState<any>('blue')

  const meshRef = useRef<any>();
  const decimal = 3
  const { camera } = useThree()
  const [pos, setPos] = useState({
    x: parseFloat(camera.position.x.toFixed(decimal)),
    y: parseFloat(camera.position.y.toFixed(decimal)),
    z: parseFloat(camera.position.z.toFixed(decimal)),
  });

  useFrame(() => {
    // x and z is flapped, don't know why
    if (meshRef.current) {
      const meshPosition = meshRef.current.position;
      const distanceX = camera.position.x - meshPosition.x;
      const distanceY = camera.position.y - meshPosition.y;
      const distanceZ = camera.position.z - meshPosition.z;

      setPos({
        x: parseFloat(distanceX.toFixed(decimal)),
        y: parseFloat(distanceY.toFixed(decimal)),
        z: parseFloat(distanceZ.toFixed(decimal)),
      });

      if (distanceX > 0.2) {
        meshRef.current.position.x = meshRef.current.position.x + 0.01
        setColor("yellow")
      }
      else setColor("blue")
    }
  });


  return (
    <group position={position} ref={meshRef}>
      <Interactive
        onSelect={() => setColor((Math.random() * 0xffffff) | 0)}>
        {/* z, y ,x */}
        <Box args={[0.1, 0.1, 0.1]} position={[0.5, 0, 0]} >
          <meshPhongMaterial color={color} />
        </Box>
        <Text
          position={[0.5, 0.07, 0]} rotation={[0, -1.5, 0]} fontSize={0.02} color="#fff" anchorX="center" anchorY="middle">
          z: {pos.x}
        </Text>
        <Text
          position={[0.5, 0.09, 0]} rotation={[0, -1.5, 0]} fontSize={0.02} color="#fff" anchorX="center" anchorY="middle">
          y:{pos.y}
        </Text>
        <Text
          position={[0.5, 0.11, 0]} rotation={[0, -1.5, 0]} fontSize={0.02} color="#fff" anchorX="center" anchorY="middle">
          x:{pos.z}
        </Text>
      </Interactive>
    </group >
  )
}

export default NewBox;
