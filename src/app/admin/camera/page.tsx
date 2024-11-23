import CameraGrid from "@/components/admin/CameraGrid";
import Header from "@/components/common/navbar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera } from "@/types/camera";
import { GetServerSideProps } from "next";




interface CamerasPageProps {
  cameras: Camera[];
}
 

const mockCameras: Camera[] = [
  {
    id: "1",
    name: "Entrance Camera",
    state: "connected",
    location: "Main Entrance",
    model: "Axis P1445-LE",
    imageUrl: ""
  },
  {
    id: "2",
    name: "Lobby Camera",
    state: "running",
    location: "Building Lobby",
    model: "Hikvision DS-2CD2345",
    imageUrl: ""
  },
  {
    id: "3",
    name: "Parking Lot Camera",
    state: "disconnected",
    location: "Parking Lot",
    model: "Dahua IPC-HFW4831E",
    imageUrl: ""
  },
  {
    id: "4",
    name: "Office Hall Camera",
    state: "connected",
    location: "Office Hall",
    model: "Bosch FLEXIDOME IP",
    imageUrl: ""
  },
  {
    id: "5",
    name: "Warehouse Camera",
    state: "running",
    location: "Warehouse",
    model: "Samsung SNH-P6410BN",
    imageUrl: ""
  },
  {
    id: "6",
    name: "Server Room Camera",
    state: "connected",
    location: "Server Room",
    model: "Logitech Circle View",
    imageUrl: ""
  }
];

 
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


const CameraWidget: React.FC<CamerasPageProps> = ({ cameras }) => {
  return (
    <div className="flex flex-col gap-6 p-4 pr-20 bg-background min-h-screen w-full">
      <Header pageName="Camera Management" userName="John Doe" userEmail="6oFkI@example.com" />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-secondary">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="help">Helps & Docs</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="flex items-center pt-8 justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight pl-1">
                View your cameras
              </h2>
              <p className="text-sm text-muted-foreground pl-1">
                All Cameras under your organization.
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <CameraGrid cameras={mockCameras} />

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
