import React from 'react';
import { useXR } from '@react-three/xr';

const UserInterface = () => {
  const { isPresenting, controllers } = useXR();
  const controller: any = controllers[0]; // Assuming we only have one controller

  // Get the controller position from the `matrix` property
  const positionX = controller?.xrInput.gamepad.pose.transform.matrix[12];
  const positionY = controller?.xrInput.gamepad.pose.transform.matrix[13];
  const positionZ = controller?.xrInput.gamepad.pose.transform.matrix[14];

  return (
    <div style={{ position: 'absolute', top: 10, left: 10 }}>
      <div>
        Mesh Position:
        <br />
        X: {controller?.position.x.toFixed(2)}
        <br />
        Y: {controller?.position.y.toFixed(2)}
        <br />
        Z: {controller?.position.z.toFixed(2)}
      </div>
      <div style={{ marginTop: 20 }}>
        Viewer Position:
        <br />
        X: {positionX?.toFixed(2)}
        <br />
        Y: {positionY?.toFixed(2)}
        <br />
        Z: {positionZ?.toFixed(2)}
      </div>
    </div>
  );
};

export default UserInterface;