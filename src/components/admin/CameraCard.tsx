'use client'
import { Camera } from '@/types/camera';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Separator } from '../ui/separator';
import { Pencil, Trash, ChevronRight } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface CameraCardProps {
    camera: Camera;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updatedCamera: Partial<Camera>) => void;
  }



  const CameraCard: React.FC<CameraCardProps> = ({ camera, onDelete, onUpdate }) => {
    const [editFormData, setEditFormData] = useState({
      location: camera.location,
      cameraType: camera.cameraType,
      ipAddress: camera.ipAddress,
      cameraDescription: camera.cameraDescription,
      NormalConditions: camera.NormalConditions || []
    });
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
    const stateColors = {
      ONLINE: 'bg-green-500',
      OFFLINE: 'bg-red-500'
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEditFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSaveChanges = () => {
      onUpdate(camera.cameraId, {
        location: editFormData.location,
        cameraType: editFormData.cameraType,
        ipAddress: editFormData.ipAddress,
        cameraDescription: editFormData.cameraDescription,
        NormalConditions: editFormData.NormalConditions
      });
      setIsSheetOpen(false);
    };

    const handleNormalConditionChange = (index: number, value: string) => {
      setEditFormData(prev => {
        const updatedConditions = [...(prev.NormalConditions || [])];
        if (updatedConditions[index]) {
          updatedConditions[index] = {
            ...updatedConditions[index],
            description: value
          };
        }
        return {
          ...prev,
          NormalConditions: updatedConditions
        };
      });
    };
    
    const addNormalCondition = () => {
      setEditFormData(prev => ({
        ...prev,
        NormalConditions: [
          ...(prev.NormalConditions || []),
          { conditionId: Date.now(), description: '' }
        ]
      }));
    };
    
    const removeNormalCondition = (index: number) => {
      setEditFormData(prev => ({
        ...prev,
        NormalConditions: (prev.NormalConditions || []).filter((_, i) => i !== index)
      }));
    };
  
    return (
      <div className="border-2 border-dashed rounded-lg overflow-hidden relative group">
        <div className="p-0">
          <div className="flex justify-between items-center h-full w-full bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold">{camera.location}</h3>
            <TooltipProvider delayDuration={100} skipDelayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className={`inline-block w-3 h-3 rounded-full ${stateColors[camera.status]}`}></span>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-sm capitalize">{camera.status}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
  
          <p className="text-sm text-gray-600 px-4 py-1">{camera.cameraType}</p>
          <p className="text-sm text-gray-600 px-4 py-1 mb-4">{camera.ipAddress}</p>
        </div>
  
        {/* Edit and Delete Buttons */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <button className="text-gray-500 hover:text-gray-800 mr-2">
                <Pencil size={16} />
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit Camera</SheetTitle>
                <SheetDescription>
                  Make changes to your camera settings here.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                 
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">Location Name</Label>
                  <Input
                    id="location"
                    name="location"
                    value={editFormData.location}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right pt-2">Description</Label>
                    <Textarea
                      id="description"
                      name="cameraDescription"
                      value={editFormData.cameraDescription}
                      onChange={handleInputChange}
                      className="col-span-3 min-h-[120px]"
                    />
                  </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cameraType" className="text-right">Model</Label>
                  <Input
                    id="cameraType"
                    name="cameraType"
                    value={editFormData.cameraType}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="ipAddress" className="text-right">IP Address</Label>
                  <Input
                    id="ipAddress"
                    name="ipAddress"
                    value={editFormData.ipAddress}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="space-y-4">
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                    >
                      <h4 className="text-sm font-semibold">Advanced Settings</h4>
                      <ChevronRight 
                        className={`h-4 w-4 transition-transform ${isAdvancedOpen ? 'rotate-90' : ''}`}
                      />
                    </div>
                    
                    {isAdvancedOpen && (
                      <div className="space-y-4 pt-2">
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="normalConditions" className="text-right pt-2">
                            Normal Conditions
                          </Label>
                          <div className="col-span-3 space-y-2">
                            {editFormData.NormalConditions?.map((condition, index) => (
                              <div key={condition.conditionId} className="flex gap-2">
                                <Input
                                  value={condition.description}
                                  onChange={(e) => handleNormalConditionChange(index, e.target.value)}
                                  placeholder="Enter normal condition"
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeNormalCondition(index)}
                                >
                                  ✕
                                </Button>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addNormalCondition}
                            >
                              Add Normal Condition
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <SheetFooter>
                <Button onClick={handleSaveChanges}>Save changes</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
  
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="text-gray-500 hover:text-gray-800">
                <Trash size={16} />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this camera: {camera.location}?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. The camera data will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(camera.cameraId)}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    );
  };
  
  export default CameraCard;