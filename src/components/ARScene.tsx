import { useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { XRController, useXR } from '@react-three/xr';
import { PerspectiveCamera } from '@react-three/drei';

const ARScene = () => {
  const camera = useRef();

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
     
    </div>
  );
};

export default ARScene;
