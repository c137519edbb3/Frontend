'use client'

import UserGrid from "@/components/admin/UserGrid";
import Header from "@/components/common/navbar"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { orgUsers  } from "@/types/user";
import { GetServerSideProps } from "next";
import { useState } from "react";




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
    title: 'Set Up IP User from Scratch',
    description: 'How to Set Up an IP Security User System from Scratch',
  },
  {
    url: 'https://www.youtube.com/embed/mAnBMJyPq_8',
    title: 'Analog Vs IP CCTV User',
    description: 'Which one should you use?',
  },
  {
    url: 'https://www.youtube.com/embed/Fr-yCJv3xnE',
    title: 'Difference Between HD & IP Users',
    description: 'Hikvision - Difference Between HD & IP Users - CCTVTEK',
  },
  {
    url: 'https://www.youtube.com/embed/rSMFZolQ7tA',
    title: 'Get IP Address of Hikvision NVR/DVR/IP User',
    description: 'How to Find IP Address of Hikvision NVR/DVR/IP User',
  },
];


const UserWidget: React.FC<UsersPageProps> = ({ initialUsers = [] }) => {
  const [Users, setUsers] = useState<orgUsers[]>(initialUsers);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    model: "",
    ipAddress: "",
  });
  const [formError, setFormError] = useState("");

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSaveUser = () => {
    if (!formData.name || !formData.location || !formData.model || !formData.ipAddress) {
      setFormError("All fields are required!");
      return;
    }

    

    const newUserData: orgUsers = {
      id: String(Users.length + 1),
      name: formData.name,
      location: formData.location,
      model: formData.model,
      ipAddress: formData.ipAddress,
      state: "connected",
    };

    // Update Users state with the new User
    setUsers((prevUsers) => [...prevUsers, newUserData]);
    
    // Reset form and close dialog
    setOpenDialog(false);
    setFormData({ name: "", location: "", model: "", ipAddress: "" });
    setFormError("");
  };


  const handleUpdateUser = (id: string, updatedData: Partial<orgUsers>) => {
    setUsers(prevUsers => 
      prevUsers.map(User => 
        User.id === id
          ? { ...User, ...updatedData }
          : User
      )
    );
  };

  const handleDeleteUser = (id: string) => {
    setUsers(prevUsers => prevUsers.filter(User => User.id !== id));
  };
  
  return (
    <div className="flex flex-col gap-6 p-4 pr-20 bg-background min-h-screen w-full">
      <Header pageName="User Management" userName="John Doe" userEmail="6oFkI@example.com" />

      <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-secondary">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="help">History</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

        
          <TabsContent value="overview">
          <div className="flex justify-between pt-8 items-center mb-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight pl-1">View your Users</h2>
              <p className="text-sm text-muted-foreground pl-1">All Users under your organization.</p>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button className="bg-background hover:bg-background border-2 text-primary" onClick={() => setOpenDialog(true)}>
                  Add New User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>Fill out the form below to add a new User.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">User Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="model" className="text-right">User Model</Label>
                    <Input
                      id="model"
                      name="model"
                      value={formData.model}
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
                  <Button onClick={handleSaveUser}>Save New User</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Separator className="my-4" />
          <UserGrid 
            Users={Users} 
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
          />
        </TabsContent>

        <TabsContent value="help">
         

        </TabsContent>

      </Tabs>
    </div>
  )
}

export default UserWidget


