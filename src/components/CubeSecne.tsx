import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { Vector3 } from 'three';

interface CubeSceneProps {
  arEnabled: boolean;
}

const CubeScene: React.FC<CubeSceneProps> = ({ arEnabled }) => {
  const cubeRef = useRef<any>();

  useFrame(({ clock }) => {
    const rotationSpeed = 0.5;
    if (cubeRef.current) {
      cubeRef.current.rotation.x = Math.sin(clock.getElapsedTime() * rotationSpeed);
      cubeRef.current.rotation.y = Math.cos(clock.getElapsedTime() * rotationSpeed);
    }
  });

  return (
    <>
      <group>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box ref={cubeRef} position={[0, 0, -0.005]}>
          <meshStandardMaterial attach="material" color="orange" />
        </Box>
      </group>
    </>
  );
};

export default CubeScene;
