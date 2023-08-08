import React, { useRef, useEffect, useCallback, useState, forwardRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { XR, toggleSession, useXR } from '@react-three/xr';
import NewBox from '../components/NewBox';
import Image from 'next/image';

const Interface = forwardRef((props, ref: any) => {
  return (
    <div id="overlay-content" ref={ref}>
      <div className="dom-container">
        <div className="button-container">
          <button id="actionButton">Enter VR</button>
        </div>
      </div>
    </div>
  )
})


const Home: React.FC = () => {
  const eventSourceRef = useRef<any>(null);
  const [overlayContent, setOverlayContent] = useState<any>()

  const Scene = () => {

    const { camera, scene } = useThree();
    const { session } = useXR();

    const handleClick = async () => {
      const session = await toggleSession('immersive-ar', {
        sessionInit: {
          optionalFeatures: ["dom-overlay"],
          domOverlay: { root: overlayContent }
        }
      })

      const button = document.getElementById('actionButton');
      if (button) {
        button.innerText = session ? 'Exit VR' : 'Enter VR';
      }
    };

    useEffect(() => {
      const button = document.getElementById('actionButton');
      if (button) {
        button.addEventListener('click', handleClick);
        return () => {
          button.removeEventListener('click', handleClick);
        };
      }
    }, [handleClick, session]);


    useEffect(() => {
      camera.position.set(0, 0, 0); // x, y, z coordinates
      camera.lookAt(0, 0, 0); // x, y, z coordinates of the point the camera is looking at
      camera.updateProjectionMatrix(); // Update the camera's matrix after making changes
    }, [camera]);

    return (
      <>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <NewBox position={[0.5, 0, 0]} goodPhoto={"/images/ava_good.jpg"} badPhoto={"/ava-bad.jpg"}/>
      </>
    )
  }


  let interfaceRef = useCallback((node: any) => {
    if (node !== null) {
      setOverlayContent(node);
    }
  }, []);

  return (
    <div>
      <Image src='/ava_good.jpg' alt="pic" width={500} height={500}/>
      <Interface ref={interfaceRef} />
      <Canvas eventSource={eventSourceRef.current} >
        <XR referenceSpace="local">
          <Scene />
        </XR>
      </Canvas>
    </div>
  );
};

export default Home;
