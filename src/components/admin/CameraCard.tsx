'use client'
import { Camera } from '@/types/camera';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Separator } from '../ui/separator';
import { Pencil, Trash } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface CameraCardProps {
  camera: Camera;
}

const CameraCard: React.FC<CameraCardProps> = ({ camera }) => {
  const stateColors = {
    connected: 'bg-green-500',
    running: 'bg-blue-500',
    disconnected: 'bg-red-500'
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    console.log(`${camera.id} is deleted`);
  };

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

      {/* Edit and Delete Buttons */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="text-gray-500 hover:text-gray-800 mr-2">
          <Pencil size={16} className="text-gray-500 hover:text-gray-800" />
        </button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="text-gray-500 hover:text-gray-800">
              <Trash size={16} className="text-gray-500 hover:text-gray-800" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this camera: {camera.name}?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The camera data will be permanently deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default CameraCard;
