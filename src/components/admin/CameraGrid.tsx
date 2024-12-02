 
import { Camera } from '@/types/camera';
import CameraCard from './CameraCard'

interface CameraGridProps {
  cameras: Camera[];
  onUpdateCamera: (id: string, updatedCamera: Partial<Camera>) => void;
  onDeleteCamera: (id: string) => void;
}


const CameraGrid: React.FC<CameraGridProps> = ({ cameras = [], onUpdateCamera, onDeleteCamera }) => {
  if (cameras.length === 0) {
    return <p className="text-gray-600">No cameras available.</p>;
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cameras.map((camera) => (
        <CameraCard 
          key={camera.cameraId} 
          camera={camera} 
          onUpdate={onUpdateCamera}
          onDelete={onDeleteCamera}
        />
      ))}
    </div>
  );
};


export default CameraGrid

