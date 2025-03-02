'use client'
import CameraGrid from "@/components/admin/CameraGrid";
import Header from "@/components/common/navbar"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera } from "@/types/camera";
import { addCamera, deleteCamera, updateCamera } from "@/utils/camera-api";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { fetchOrganizationDetails } from "@/utils/camera-api";



interface CameraWidgetProps {
  initialCameras?: Camera[];
}
 
 
 
const youtubeLinks = [
  {
    url: 'https://www.youtube.com/embed/VcZ5IZ_5axY',
    title: 'Get IP address of your NVR or DVR',
    description: 'How to check the IP address of your NVR or DVR',
  },
  {
    url: 'https://www.youtube.com/embed/_OH2YiqckFo',
    title: 'Difference Between an NVR and a DVR',
    description: "What's the Difference Between an NVR and a DVR? Let's Pick Your Next Video Surveillance Recorder!",
  },
  {
    url: 'https://www.youtube.com/embed/Tzjoorb2BAY',
    title: 'Set Up IP Camera from Scratch',
    description: 'How to Set Up an IP Security Camera System from Scratch',
  },
  {
    url: 'https://www.youtube.com/embed/mAnBMJyPq_8',
    title: 'Analog Vs IP CCTV Camera',
    description: 'Which one should you use?',
  },
  {
    url: 'https://www.youtube.com/embed/Fr-yCJv3xnE',
    title: 'Difference Between HD & IP Cameras',
    description: 'Hikvision - Difference Between HD & IP Cameras - CCTVTEK',
  },
  {
    url: 'https://www.youtube.com/embed/rSMFZolQ7tA',
    title: 'Get IP Address of Hikvision NVR/DVR/IP Camera',
    description: 'How to Find IP Address of Hikvision NVR/DVR/IP Camera',
  },
];


const CameraWidget = ({ initialCameras = [] }: CameraWidgetProps) => {
  const { data: session } = useSession(); 
  const [cameras, setCameras] = useState<Camera[]>(initialCameras);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    cameraType: "",
    ipAddress: "",
    cameraDescription: ""
  });
  const [formError, setFormError] = useState("");
  // Add organization details state
  const [orgDetails, setOrgDetails] = useState({
    maxCameras: 0,
    cameraCount: 0,
    usagePercentage: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch organization details
  useEffect(() => {
    const getOrgDetails = async () => {
      if (!session?.accessToken || !session?.user?.organization?.id) return;
      
      try {
        const details = await fetchOrganizationDetails(
          session.user.organization.id,
          session.accessToken
        );
        
        setOrgDetails({
          maxCameras: details.maxCameras,
          cameraCount: details.cameraCount,
          usagePercentage: details.usagePercentage
        });
      } catch (error) {
        console.error("Error fetching organization details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getOrgDetails();
  }, [session, cameras]); // Re-fetch when cameras change

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  // Handle form submission
  const handleSaveCamera = async () => {
    if (!formData.location || !formData.cameraType || !formData.ipAddress) {
      setFormError("All fields are required!");
      return;
    }
  
    if (!session) {
      console.error("User is not authenticated");
      return;
    }
  
    const { accessToken, user } = session;
    if (!user || !user.organization || !user.organization.id) {
      console.error("Organization information is missing from the session");
      return;
    }
  
    // Check camera limit
    if (orgDetails.cameraCount >= orgDetails.maxCameras) {
      toast.error(`Camera limit reached (${orgDetails.maxCameras}). Please contact support to increase your limit.`);
      setOpenDialog(false);
      return;
    }
  
    const organizationId = user.organization.id;
    const newCameraData: Camera = {
      cameraId: String(cameras.length + 1),
      location: formData.location,
      cameraType: formData.cameraType,
      ipAddress: formData.ipAddress,
      status: "ONLINE",
      cameraDescription: formData.cameraDescription
    };
  
    try {
      // console.log(newCameraData);
      const newCamera = await addCamera(organizationId, newCameraData, accessToken);
  
      setCameras((prevCameras) => [...prevCameras, newCamera]);      
      console.log("Added camera:", newCamera);
      toast(`New Camera has been added.`);
    } catch (error) {
      console.error("Error adding camera:", error);
    }
    // Reset form and close dialog
    setOpenDialog(false);
    setFormData({ name: "", location: "", cameraType: "", ipAddress: "", cameraDescription: "" });
    setFormError("");
  };



  const handleUpdateCamera = async (cameraId: string, updatedData: Partial<Camera>) => {
    if (!session) {
      console.error("User is not authenticated");
      return;
    }
    const { accessToken, user } = session;
    if (!user || !user.organization || !user.organization.id) {
      console.error("Organization information is missing from the session");
      return;
    }

    const organizationId = user.organization.id;
    console.log('updatedData:',updatedData);
    try {
      const updatedCamera = await updateCamera(
        organizationId,
        parseInt(cameraId),
        updatedData,
        accessToken
      );
      
      if (updatedCamera) {
        setCameras((prevCameras) => 
          prevCameras.map((camera) => 
            camera.cameraId === cameraId
              ? { ...camera, ...updatedData }
              : camera
          )
        );
        console.log("Updated camera:", updatedCamera);
        toast(`Your Camera has been updated.`);
      }
    } catch (error) {
      console.error("Error updating camera:", error);
    }
  };

  const handleDeleteCamera = async (cameraId: string) => {
    if (!session) {
      console.error("User is not authenticated");
      return;
    }
  
    const { accessToken, user } = session;
  
    if (!user || !user.organization || !user.organization.id) {
      console.error("Organization information is missing from the session");
      return;
    }
  
    const organizationId = user.organization.id;  // Extract the organization ID from the session
  
    try {
      const response = await deleteCamera(
        organizationId,
        parseInt(cameraId),  // Convert cameraId to number
        accessToken
      );
  
      if (response.success) {
        // Remove the camera from the state after successful deletion
        setCameras(prevCameras => prevCameras.filter(camera => camera.cameraId !== cameraId));
        console.log(response.message);  // You can display this message in the UI
        toast(`Camera has been deleted.`);
      }
    } catch (error) {
      console.error("Error deleting camera:", error);
    }
  };
  
  
  return (
    <div className="flex flex-col gap-6 p-4 pr-20 bg-background min-h-screen w-full">
      <Header pageName="Camera Management" userName="John Doe" userEmail="6oFkI@example.com" />

      <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-secondary">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="help">Help & Docs</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

        
          <TabsContent value="overview">
          <div className="flex justify-between pt-8 items-center mb-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight pl-1">View your cameras</h2>
              <p className="text-sm text-muted-foreground pl-1">
                All Cameras under your organization. 
                {!isLoading && (
                  <span className="ml-2 font-medium">
                    {orgDetails.cameraCount} of {orgDetails.maxCameras} cameras used 
                    ({orgDetails.usagePercentage}%)
                  </span>
                )}
              </p>
            </div>
            
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-background hover:bg-background border-2 text-primary"
                  onClick={() => setOpenDialog(true)}
                  disabled={orgDetails.cameraCount >= orgDetails.maxCameras}
                >
                  {orgDetails.cameraCount >= orgDetails.maxCameras 
                    ? "Camera Limit Reached" 
                    : "Add New Camera"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Camera</DialogTitle>
                  <DialogDescription>Fill out the form below to add a new camera.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
 
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">Location Name</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right pt-2">Description</Label>
                    <Textarea
                      id="description"
                      name="cameraDescription"
                      value={formData.cameraDescription}
                      onChange={handleInputChange}
                      className="col-span-3 min-h-[120px]"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="cameraType" className="text-right">Camera Model</Label>
                    <Input
                      id="cameraType"
                      name="cameraType"
                      value={formData.cameraType}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ipAddress" className="text-right">IP Address</Label>
                    <Input
                      id="ipAddress"
                      name="ipAddress"
                      value={formData.ipAddress}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  {formError && <p className="text-red-500 text-sm">{formError}</p>}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveCamera}>Save New Camera</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Progress bar for camera usage */}
          <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
            <div 
              className={`h-2 rounded-full ${
                orgDetails.usagePercentage >= 90 
                  ? 'bg-red-500' 
                  : orgDetails.usagePercentage >= 70 
                  ? 'bg-yellow-500' 
                  : 'bg-green-500'
              }`}
              style={{ width: `${orgDetails.usagePercentage}%` }}
            ></div>
          </div>
          
          <Separator className="my-4" />
          <CameraGrid 
            cameras={cameras} 
            onUpdateCamera={handleUpdateCamera}
            onDeleteCamera={handleDeleteCamera}
          />
        </TabsContent>

        <TabsContent value="help">
        <div className="flex items-center pt-8 justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight pl-1">
                Useful Videos
              </h2>
              <p className="text-sm text-muted-foreground pl-1">
                Videos related to Camera Setup and accessibility.
              </p>
            </div>
          </div>
          <Separator className="my-4" />
        <div className="relative">
          <ScrollArea>
            <div className="flex space-x-4 pb-4 ">
              {youtubeLinks.map((video) => (
                <div key={video.url} className="w-[350px] bg-neutral-100 rounded-2xl  border-2">
                  <iframe
                    width="350"
                    height="200"
                    className="rounded-2xl"
                    src={video.url}
                    title={video.title}
                    frameBorder="2"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="p-4">
                    <h3 className="text-base font-semibold">{video.title}</h3>
                    <p className="text-xs text-gray-600">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        </TabsContent>

      </Tabs>
    </div>
  )
}

export default CameraWidget
