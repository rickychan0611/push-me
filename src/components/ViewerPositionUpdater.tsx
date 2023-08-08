import { useFrame } from '@react-three/fiber';
import { Matrix4, Vector3 } from 'three';

interface ViewerPositionUpdaterProps {
  onViewerPositionChange: (position: Vector3) => void;
}

const ViewerPositionUpdater: React.FC<ViewerPositionUpdaterProps> = ({ onViewerPositionChange }) => {
  useFrame(({ gl, camera }) => {
    if (gl.xr.isPresenting) {
      const frame = gl.xr.getFrame();
      if (frame && frame.getViewerPose) {
        const xrSession = gl.xr.getSession();
        if (xrSession) {
          const referenceSpace = xrSession.requestReferenceSpace('viewer').then((refSpace) => {
            const viewerPose = frame.getViewerPose(refSpace);
            if (viewerPose) {
              const matrixArray = viewerPose.transform.matrix;
              const matrix = new Matrix4().fromArray(matrixArray);
              const viewerPosition = new Vector3().setFromMatrixPosition(matrix);
              onViewerPositionChange(viewerPosition);
            }
          });
        }
      }
    }
  });

  return null;
};

export default ViewerPositionUpdater;
