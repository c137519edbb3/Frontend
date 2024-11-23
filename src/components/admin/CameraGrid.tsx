 
import { Camera } from '@/types/camera';
import CameraCard from './CameraCard'

interface CameraGridProps {
  cameras: Camera[];
}

const CameraGrid: React.FC<CameraGridProps> = ({ cameras = [] }) => {
  if (cameras.length === 0) {
    return <p className="text-gray-600">No cameras available.</p>;
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cameras.map((camera) => (
        <CameraCard key={camera.id} camera={camera} />
      ))}
    </div>
  );
};


export default CameraGrid

