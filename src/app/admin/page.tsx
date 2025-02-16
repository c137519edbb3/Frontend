"use client";
import React, { useState, useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { formatTimestamp } from '@/utils/date-utils';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivitySquare, Users, CreditCard, Activity, Shell, Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Cloud,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  Calculator,
  Settings,
  Smile,
  MessageSquare,
  Plus,
  PlusCircle,
  UserPlus,
} from "lucide-react"
 


import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  CardDescription,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/common/navbar';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Loading from '@/components/common/Loading';
import { AnomalyLog, subscribeToAnomalyLogs } from '@/services/firebaseService';
import { Timestamp } from 'firebase/firestore';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL_AWS;


const chartData = [
  { date: "2024-04-01", High: 222, moderate: 150 },
  { date: "2024-04-02", High: 97, moderate: 180 },
  { date: "2024-04-03", High: 167, moderate: 120 },
  { date: "2024-04-04", High: 242, moderate: 260 },
  { date: "2024-04-05", High: 373, moderate: 290 },
  { date: "2024-04-06", High: 301, moderate: 340 },
  { date: "2024-04-07", High: 245, moderate: 180 },
  { date: "2024-04-08", High: 409, moderate: 320 },
  { date: "2024-04-09", High: 59, moderate: 110 },
  { date: "2024-04-10", High: 261, moderate: 190 },
  { date: "2024-04-11", High: 327, moderate: 350 },
  { date: "2024-04-12", High: 292, moderate: 210 },
  { date: "2024-04-13", High: 342, moderate: 380 },
  { date: "2024-04-14", High: 137, moderate: 220 },
  { date: "2024-04-15", High: 120, moderate: 170 },
  { date: "2024-04-16", High: 138, moderate: 190 },
  { date: "2024-04-17", High: 446, moderate: 360 },
  { date: "2024-04-18", High: 364, moderate: 410 },
  { date: "2024-04-19", High: 243, moderate: 180 },
  { date: "2024-04-20", High: 89, moderate: 150 },
  { date: "2024-04-21", High: 137, moderate: 200 },
  { date: "2024-04-22", High: 224, moderate: 170 },
  { date: "2024-04-23", High: 138, moderate: 230 },
  { date: "2024-04-24", High: 387, moderate: 290 },
  { date: "2024-04-25", High: 215, moderate: 250 },
  { date: "2024-04-26", High: 75, moderate: 130 },
  { date: "2024-04-27", High: 383, moderate: 420 },
  { date: "2024-04-28", High: 122, moderate: 180 },
  { date: "2024-04-29", High: 315, moderate: 240 },
  { date: "2024-04-30", High: 454, moderate: 380 },
  { date: "2024-05-01", High: 165, moderate: 220 },
  { date: "2024-05-02", High: 293, moderate: 310 },
  { date: "2024-05-03", High: 247, moderate: 190 },
  { date: "2024-05-04", High: 385, moderate: 420 },
  { date: "2024-05-05", High: 481, moderate: 390 },
  { date: "2024-05-06", High: 498, moderate: 520 },
  { date: "2024-05-07", High: 388, moderate: 300 },
  { date: "2024-05-08", High: 149, moderate: 210 },
  { date: "2024-05-09", High: 227, moderate: 180 },
  { date: "2024-05-10", High: 293, moderate: 330 },
  { date: "2024-05-11", High: 335, moderate: 270 },
  { date: "2024-05-12", High: 197, moderate: 240 },
  { date: "2024-05-13", High: 197, moderate: 160 },
  { date: "2024-05-14", High: 448, moderate: 490 },
  { date: "2024-05-15", High: 473, moderate: 380 },
  { date: "2024-05-16", High: 338, moderate: 400 },
  { date: "2024-05-17", High: 499, moderate: 420 },
  { date: "2024-05-18", High: 315, moderate: 350 },
  { date: "2024-05-19", High: 235, moderate: 180 },
  { date: "2024-05-20", High: 177, moderate: 230 },
  { date: "2024-05-21", High: 82, moderate: 140 },
  { date: "2024-05-22", High: 81, moderate: 120 },
  { date: "2024-05-23", High: 252, moderate: 290 },
  { date: "2024-05-24", High: 294, moderate: 220 },
  { date: "2024-05-25", High: 201, moderate: 250 },
  { date: "2024-05-26", High: 213, moderate: 170 },
  { date: "2024-05-27", High: 420, moderate: 460 },
  { date: "2024-05-28", High: 233, moderate: 190 },
  { date: "2024-05-29", High: 78, moderate: 130 },
  { date: "2024-05-30", High: 340, moderate: 280 },
  { date: "2024-05-31", High: 178, moderate: 230 },
  { date: "2024-06-01", High: 178, moderate: 200 },
  { date: "2024-06-02", High: 470, moderate: 410 },
  { date: "2024-06-03", High: 103, moderate: 160 },
  { date: "2024-06-04", High: 439, moderate: 380 },
  { date: "2024-06-05", High: 88, moderate: 140 },
  { date: "2024-06-06", High: 294, moderate: 250 },
  { date: "2024-06-07", High: 323, moderate: 370 },
  { date: "2024-06-08", High: 385, moderate: 320 },
  { date: "2024-06-09", High: 438, moderate: 480 },
  { date: "2024-06-10", High: 155, moderate: 200 },
  { date: "2024-06-11", High: 92, moderate: 150 },
  { date: "2024-06-12", High: 492, moderate: 420 },
  { date: "2024-06-13", High: 81, moderate: 130 },
  { date: "2024-06-14", High: 426, moderate: 380 },
  { date: "2024-06-15", High: 307, moderate: 350 },
  { date: "2024-06-16", High: 371, moderate: 310 },
  { date: "2024-06-17", High: 475, moderate: 520 },
  { date: "2024-06-18", High: 107, moderate: 170 },
  { date: "2024-06-19", High: 341, moderate: 290 },
  { date: "2024-06-20", High: 408, moderate: 450 },
  { date: "2024-06-21", High: 169, moderate: 210 },
  { date: "2024-06-22", High: 317, moderate: 270 },
  { date: "2024-06-23", High: 480, moderate: 530 },
  { date: "2024-06-24", High: 132, moderate: 180 },
  { date: "2024-06-25", High: 141, moderate: 190 },
  { date: "2024-06-26", High: 434, moderate: 380 },
  { date: "2024-06-27", High: 448, moderate: 490 },
  { date: "2024-06-28", High: 149, moderate: 200 },
  { date: "2024-06-29", High: 103, moderate: 160 },
  { date: "2024-06-30", High: 446, moderate: 400 },
];


const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

function Component() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Anomaly Count</CardTitle>
          <CardDescription>
            Showing anomaly counts for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="High"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="moderate"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            {/* <ChartLegend content={<ChartLegendContent />} /> */}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}


function TableDemo() {
  const [anomalies, setAnomalies] = useState<AnomalyLog[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.organization?.id) return;

    // Subscribe to real-time updates
    const unsubscribe = subscribeToAnomalyLogs(
      session.user.organization.id,
      (updatedAnomalies) => {
        setAnomalies(updatedAnomalies);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [session?.user?.organization?.id]);

  return (
    <Table>
      <TableCaption>A list of all detected Anomalies.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Camera Id</TableHead>
          <TableHead>Anomaly Description</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead className="text-right">Criticality</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {anomalies.map((anomaly) => (
          <TableRow key={anomaly.logId}>
            <TableCell className="font-medium">{anomaly.cameraId}</TableCell>
            <TableCell>{anomaly.event}</TableCell>
            <TableCell>
              {formatTimestamp(anomaly.timestamp)}
            </TableCell>
            <TableCell className="text-right">
              <span className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                {
                  "bg-yellow-100 text-yellow-800": anomaly.criticality === "Moderate",
                  "bg-orange-100 text-orange-800": anomaly.criticality === "Critical",
                  "bg-red-100 text-red-800": anomaly.criticality === "Catastrophic",
                }
              )}>
                {anomaly.criticality}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

interface Camera {
  cameraId: number;
  location: string;
  ipAddress: string;
  cameraType: string;
  organizationId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const CameraDetailsGrid = () => {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        if (!session?.user?.organization?.id || !session?.user?.token) {
          return;
        }
        
        const response = await fetch(`${SERVER_URL}/api/organization/${session?.user?.organization?.id}/cameras/online`, {
          headers: {
            'Authorization': `Bearer ${session?.user?.token}`
          }
        });
        const data = await response.json();
        setCameras(data.cameras);
      } catch (error) {
        console.error('Error fetching cameras:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user?.token) {
      fetchCameras();
    }
  }, [session]);

  const handleCameraClick = (camera: Camera) => {
    setSelectedCamera(camera);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return <div>Loading cameras...</div>;
  }

  return (
    <>
      <ScrollArea className="h-[420px] w-full">
        <div className="flex flex-col gap-4 pr-2">
          {Array.isArray(cameras) && cameras.length > 0 ? cameras.map((camera) => (
            <Card
              key={camera.cameraId}
              className="bg-secondary text-neutral-400 hover:bg-accent hover:text-primary transition-all duration-300 ease-in-out cursor-pointer"
              onClick={() => handleCameraClick(camera)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-black">Camera {camera.cameraId}</CardTitle>
                    <p className="text-sm">{camera.location}</p>
                  </div>
                  <Camera className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <p>{camera.cameraType}</p>
              </CardContent>
            </Card>
          )): (<p>No cameras available</p>)}
        </div>
      </ScrollArea>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Camera {selectedCamera?.cameraId}
            </DialogTitle>
            <DialogDescription>
              Location: {selectedCamera?.location}
              <br />
              Type: {selectedCamera?.cameraType}
              <br />
              Status: {selectedCamera?.status}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 bg-black rounded-lg aspect-video w-full relative">
            {selectedCamera?.ipAddress.includes('video') ? (
              <img 
                src={selectedCamera.ipAddress} 
                alt="Camera Stream"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <p>Stream not available</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default function Dashboard() {
  // 1. All hooks at top level
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [cameras, setCameras] = useState([]);
  const [error, setError] = useState(null);

  // 2. Single useEffect with proper dependencies
  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.organization?.id || !session?.user?.token) {
        return;
      }

      try {
        const response = await fetch(
          `${SERVER_URL}/api/organization/${session.user.organization.id}/cameras/online`,
          {
            headers: {
              'Authorization': `Bearer ${session.user.token}`
            }
          }
        );
        const data = await response.json();
        setCameras(data.cameras);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  // 3. Early return for loading state
  if (loading) {
    return <Loading />;
  }

  // 4. Check authentication
  if (!session?.user) {
    router.push('/auth/login');
    return null; // Ensure no further rendering
  }

  // 5. Render dashboard
  return (
    <div className="flex flex-col gap-6 p-4 pr-20 bg-background min-h-screen w-full">
      <Header pageName="Dashboard" userName="John Doe" userEmail="6oFkI@example.com" />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-secondary">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-4">
        <Card className="bg-secondary  text-neutral-400  ">
          <CardHeader>
            <CardTitle className='text-neutral-800'>Live Anomaly Tracking</CardTitle>
            <TableDemo />
          </CardHeader>
        </Card>

        <Card className="bg-secondary ">
          <CardHeader>
            <CardTitle>Active Cameras</CardTitle>
            <CameraDetailsGrid/>
          </CardHeader>
        </Card>

      </div>
      <div>
        <Component/>
      </div>

    </div>
  );
}
