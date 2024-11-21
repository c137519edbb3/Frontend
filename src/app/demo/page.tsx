"use client"
import { SideBarWidget } from "@/components/common/sideBar";


import { useRef, useEffect, useContext } from "react";
import { registerClient, sendFrameToBackend } from "@/app/api/demo-api";

import { 
  IconDashboard, 
  IconUserShield, 
  IconUsers, 
  IconDevices, 
  IconFileText, 
  IconSettings 
} from "@tabler/icons-react"; // Import the icons

import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
 

const links = [
  {
    label: "Dashboard",
    href: "#",
    icon: (
      <IconDashboard className="text-neutral-500 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Anomaly Management",
    href: "#",
    icon: (
      <IconUserShield className="text-neutral-500 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Users",
    href: "#",
    icon: (
      <IconUsers className="text-neutral-500 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Devices",
    href: "#",
    icon: (
      <IconDevices className="text-neutral-500 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Reports",
    href: "#",
    icon: (
      <IconFileText className="text-neutral-500 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Settings",
    href: "#",
    icon: (
      <IconSettings className="text-neutral-500 h-5 w-5 flex-shrink-0" />
    ),
  },
];


export default function DemoApp() {
  return (
    <DemoLayout>
      <PageContent />
    </DemoLayout>
  );
}

function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <SideBarWidget links={links}>
        <AppProvider>
          {children}
        </AppProvider>
        <Toaster />
      </SideBarWidget>
    </main>
  );
}
 

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import VideoFrameDisplay from "@/components/demo/helper";
import VideoProcessor from "@/components/demo/video-processing";
import { AppProvider, useAppContext } from "@/context/AppContext";


interface ClientState {
  clientId: string;
  hiddenState: number[][] | null;
  cellState: number[][] | null;
  frameCount: number;
  totalTime: number;
  frameProcessingTimes: number[];
  labelCounts: {
    catastrophe: number;
    critical: number;
    moderate: number;
  };
}

function PageContent() {

  const [files, setFiles] = useState<File[]>([]);
  const [selectedTenants, setSelectedTenants] = useState<string | null>(null);
  const [clientStates, setClientStates] = useState<ClientState[]>([]);

  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };
 
  const handleTenantSelect = (value: string) => {
    setSelectedTenants(value);
  };

  const registerClients = async (numClients: number) => {
    try {
      const clientPromises = Array.from({ length: numClients }, async () => {
        const clientId = await registerClient();
        return {
          clientId,
          hiddenState: null,
          cellState: null,
          frameCount: 0,
          totalTime: 0,
          frameProcessingTimes: [],
          labelCounts: { 
            catastrophe: 0, 
            critical: 0, 
            moderate: 0 
          }
        } as ClientState;
      });

      const newClientStates = await Promise.all(clientPromises);
      setClientStates(newClientStates);

      toast({
        title: "Clients Registered",
        description: `Registered ${numClients} client(s)`,
      });

      return newClientStates;
    } catch (error) {
      toast({
        title: "Registration Error",
        description: "Failed to register clients. Please try again.",
        variant: "destructive"
      });
      return [];
    }
  };

  const processVideo = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload a video file",
      });
      return;
    }
  
    if (!selectedTenants) {
      toast({
        title: "No tenants selected",
        description: "Please select the number of tenants",
      });
      return;
    }
  
    const numTenants = parseInt(selectedTenants);
    await registerClients(numTenants);
    setIsProcessing(true);
  };


  return (
    <div className="flex flex-col gap-6 p-4 pr-20 bg-background min-h-screen w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-neutral-500">Preview</h1>
        <div className="flex items-center gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>

          <Button variant="outline">
            <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
            API Status
          </Button>

        </div>
      </div>
      <Separator orientation="horizontal" />
      {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
      <ScrollArea className="h-full w-full">
        <div className="grid grid-rows-2 gap-8">
         <div className="grid grid-cols-3 gap-8">
            {/* Left Section */}
            <div className="col-span-2">
              <div className="p-4 max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                {!isProcessing ? (
                  <>
                    <FileUpload onChange={handleFileUpload} />
                    <Select onValueChange={handleTenantSelect}>
                      <SelectTrigger className="w-full mt-4">
                        <SelectValue placeholder="Select the number of tenants" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Number of tenants</SelectLabel>
                          {Array.from({ length: 25 }, (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Button className="w-full mt-4" onClick={processVideo}>
                      Process Video
                    </Button>
                  </>
                ) : (
                  <video ref={videoRef} controls className="w-full rounded">
                    <source src={URL.createObjectURL(files[0])} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>

            {/* Right Section - Table */}
            <div className="w-full p-4 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
               <Table>
                <TableCaption>A list of registered clients.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead  >Client ID</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientStates.map((client) => (
                    <TableRow key={client.clientId}>
                      <TableCell className="font-medium">{client.clientId}</TableCell>
                      <TableCell className="text-right">Connected</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>


            <div className="row-span-1">
              <VideoProcessPage videoFile={isProcessing ? files[0] : null} />
            </div>

          </div>
        </div>
      </ScrollArea>
      
    </div>
  );
}

interface VideoProcessorProps {
  videoFile: File;
  clientStates: ClientState[];
}

interface ClientState {
  clientId: string;
  hiddenState: number[][] | null;
  cellState: number[][] | null;
  frameCount: number;
  totalTime: number;
  frameProcessingTimes: number[];
  labelCounts: {
    catastrophe: number;
    critical: number;
    moderate: number;
  };
}


interface ProcessingResult {
  clientId: string;
  frameCount: number;
  totalTime: number;
  avgProcessingTime: number;
  labelCounts: {
    catastrophe: number;
    critical: number;
    moderate: number;
  };
}

interface ApiResponse {
  frame: string;
  label: 'catastrophe' | 'critical' | 'moderate';
  confidence: number;
  frame_number: number;
  timestamp: number;
  hidden_state: number[][];
  cell_state: number[][];
}

interface VideoProcessPageProps {
  videoFile: File | null;
}

interface VideoProcessPageProps {
  videoFile: File | null;
}

function VideoProcessPage({ videoFile }: VideoProcessPageProps) {
  const { clientStates } = useAppContext();

  return (
    <div>
      {videoFile && clientStates && clientStates.length > 0 && (
        <VideoProcessor videoFile={videoFile} clientStates={clientStates} />
      )}
    </div>
  );
}