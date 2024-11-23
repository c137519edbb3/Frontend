import { Camera } from '@/types/camera';
import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Separator } from '../ui/separator';
import { Pencil, Trash } from 'lucide-react';


interface CameraCardProps {
  camera: Camera;
}

const CameraCard: React.FC<CameraCardProps> = ({ camera }) => {
  const stateColors = {
    connected: 'bg-green-500',
    running: 'bg-blue-500',
    disconnected: 'bg-red-500'
  }

  return (
    <div className="border-2 border-dashed rounded-lg overflow-hidden relative group">
        <div className="p-0">
            <div className="flex justify-between items-center h-full w-full bg-gray-100 p-4 rounded-md">
                <h3 className="text-lg font-semibold">{camera.name}</h3> 
                <TooltipProvider delayDuration={100} skipDelayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span
                                className={`inline-block w-3 h-3 rounded-full ${stateColors[camera.state]}`}
                            ></span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span className="text-sm capitalize">{camera.state}</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <p className="text-sm text-gray-600 px-4 py-1">{camera.location}</p>
            <p className="text-sm text-gray-600 px-4 py-1 mb-4">{camera.model}</p>
        </div>
        
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="text-gray-500 hover:text-gray-800 mr-2">
                <Pencil size={16} className="text-gray-500 hover:text-gray-800" />
            </button>

            <button className="text-gray-500 hover:text-gray-800">
                <Trash size={16} className="text-gray-500 hover:text-gray-800" />
            </button>
        </div>
    </div>


  )
}

export default CameraCard
