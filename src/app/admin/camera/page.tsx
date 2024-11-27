import CameraWidget from "@/components/admin/CameraScreen";
import { Camera } from "@/types/camera";

const mockCameras: Camera[] = [
  {
    id: "1",
    name: "Entrance Camera",
    state: "connected",
    location: "Main Entrance",
    model: "Axis P1445-LE",
    ipAddress: '237.84.2.178',
  },
  {
    id: "2",
    name: "Lobby Camera",
    state: "running",
    location: "Building Lobby",
    model: "Hikvision DS-2CD2345",
    ipAddress: '237.84.2.178',
  },
  {
    id: "3",
    name: "Parking Lot Camera",
    state: "disconnected",
    location: "Parking Lot",
    model: "Dahua IPC-HFW4831E",
    ipAddress: '237.84.2.178',
  },
  {
    id: "4",
    name: "Office Hall Camera",
    state: "connected",
    location: "Office Hall",
    model: "Bosch FLEXIDOME IP",
    ipAddress: '237.84.2.178',
  },
  {
    id: "5",
    name: "Warehouse Camera",
    state: "running",
    location: "Warehouse",
    model: "Samsung SNH-P6410BN",
    ipAddress: '237.84.2.178',
  },
  {
    id: "6",
    name: "Server Room Camera",
    state: "connected",
    location: "Server Room",
    model: "Logitech Circle View",
    ipAddress: '237.84.2.178',
  }
];

interface PageProps {
  params: {};
  searchParams: {};
}

export default async function CameraPage(props: PageProps) {
  return <CameraWidget initialCameras={mockCameras} />;
}

// Explicitly declare that this page has no generateMetadata function
export const generateMetadata = undefined;