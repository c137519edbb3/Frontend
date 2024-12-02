
import UserWidget from "@/components/admin/UserScreen";
import { orgUsers } from "@/types/user";

type UsersPageProps = {
  initialUsers?: orgUsers[];
};
 

const mockUsers: orgUsers[] = [
  {
    id: "1",
    name: "Entrance User",
    state: "connected",
    location: "Main Entrance",
    model: "Axis P1445-LE",
    ipAddress: '237.84.2.178',
  },
  {
    id: "2",
    name: "Lobby User",
    state: "running",
    location: "Building Lobby",
    model: "Hikvision DS-2CD2345",
    ipAddress: '237.84.2.178',
  },
  {
    id: "3",
    name: "Parking Lot User",
    state: "disconnected",
    location: "Parking Lot",
    model: "Dahua IPC-HFW4831E",
    ipAddress: '237.84.2.178',
  },
  {
    id: "4",
    name: "Office Hall User",
    state: "connected",
    location: "Office Hall",
    model: "Bosch FLEXIDOME IP",
    ipAddress: '237.84.2.178',
  },
  {
    id: "5",
    name: "Warehouse User",
    state: "running",
    location: "Warehouse",
    model: "Samsung SNH-P6410BN",
    ipAddress: '237.84.2.178',
  },
  {
    id: "6",
    name: "Server Room User",
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

export default async function UsersPage(props: PageProps) {
  return <UserWidget initialUsers={mockUsers} />;
}

export const generateMetadata = undefined;