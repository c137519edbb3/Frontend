'use client';

import { useState } from 'react';
import VideoUploader from '@/components/demo/VideoUploader';
import ClientStreaming from '@/components/demo/ClientStreaming';
import ClientSummary from '@/components/demo/ClientSummary';
import { ClientState } from '@/types';
import { SideBarWidget } from "@/components/common/sideBar";


import { useRef, useEffect, useContext } from "react";
import { registerClient, sendFrameToBackend } from "@/app/api/demo-api";
import { IconUpload } from "@tabler/icons-react";

import { 
  IconDashboard, 
  IconUserShield, 
  IconUsers, 
  IconDevices, 
  IconFileText, 
  IconSettings 
} from "@tabler/icons-react"; // Import the icons

import { FileUpload } from "@/components/ui/file-upload";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from '@/components/ui/toaster';
 

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
      <Home />
    </DemoLayout>
  );
}

function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <SideBarWidget links={links}>
          {children}
        <Toaster />
      </SideBarWidget>
    </main>
  );
}


function Home() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [clientStates, setClientStates] = useState<Record<number, ClientState>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <main className="container mx-auto p-4">
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



      <div className="space-y-6">
      <VideoUploader 
        onVideoSelect={(url) => setVideoUrl(url)} 
        isProcessing={isProcessing}
        videoUrl={videoUrl}  // Add this line
      />
        
        <ClientStreaming
          videoUrl={videoUrl}
          onClientStatesUpdate={setClientStates}
          onProcessingStateChange={setIsProcessing}
        />
        
        <ClientSummary clientStates={clientStates} />
      </div>
    </main>
  );
}