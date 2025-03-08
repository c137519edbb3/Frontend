"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { formatTimestamp } from '@/utils/date-utils';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera } from "lucide-react";

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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
import Header from '@/components/common/navbar';
import { useSession } from 'next-auth/react';
import Loading from '@/components/common/Loading';
import { AnomalyLog, subscribeToAnomalyLogs } from '@/services/firebaseService';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL_AWS;


const chartData = [
  { date: "2024-04-01", moderate: 150, critical: 120, catastrophic: 80 },
  { date: "2024-04-02", moderate: 180, critical: 100, catastrophic: 70 },
  { date: "2024-04-03", moderate: 120, critical: 110, catastrophic: 60 },
  { date: "2024-04-04", moderate: 260, critical: 130, catastrophic: 90 },
  { date: "2024-04-05", moderate: 290, critical: 140, catastrophic: 100 },
  { date: "2024-04-06", moderate: 340, critical: 150, catastrophic: 110 },
  { date: "2024-04-07", moderate: 180, critical: 160, catastrophic: 120 },
  { date: "2024-04-08", moderate: 320, critical: 170, catastrophic: 130 },
  { date: "2024-04-09", moderate: 110, critical: 180, catastrophic: 140 },
  { date: "2024-04-10", moderate: 190, critical: 190, catastrophic: 150 },
  { date: "2024-04-11", moderate: 350, critical: 200, catastrophic: 160 },
  { date: "2024-04-12", moderate: 210, critical: 210, catastrophic: 170 },
  { date: "2024-04-13", moderate: 380, critical: 220, catastrophic: 180 },
  { date: "2024-04-14", moderate: 220, critical: 230, catastrophic: 190 },
  { date: "2024-04-15", moderate: 170, critical: 240, catastrophic: 200 },
  { date: "2024-04-16", moderate: 190, critical: 250, catastrophic: 210 },
  { date: "2024-04-17", moderate: 360, critical: 260, catastrophic: 220 },
  { date: "2024-04-18", moderate: 410, critical: 270, catastrophic: 230 },
  { date: "2024-04-19", moderate: 180, critical: 280, catastrophic: 240 },
  { date: "2024-04-20", moderate: 150, critical: 290, catastrophic: 250 },
  { date: "2024-04-21", moderate: 200, critical: 300, catastrophic: 260 },
  { date: "2024-04-22", moderate: 170, critical: 310, catastrophic: 270 },
  { date: "2024-04-23", moderate: 230, critical: 320, catastrophic: 280 },
  { date: "2024-04-24", moderate: 290, critical: 330, catastrophic: 290 },
  { date: "2024-04-25", moderate: 250, critical: 340, catastrophic: 300 },
  { date: "2024-04-26", moderate: 130, critical: 350, catastrophic: 310 },
  { date: "2024-04-27", moderate: 420, critical: 360, catastrophic: 320 },
  { date: "2024-04-28", moderate: 180, critical: 370, catastrophic: 330 },
  { date: "2024-04-29", moderate: 240, critical: 380, catastrophic: 340 },
  { date: "2024-04-30", moderate: 380, critical: 390, catastrophic: 350 },
  { date: "2024-05-01", moderate: 220, critical: 400, catastrophic: 360 },
  { date: "2024-05-02", moderate: 310, critical: 410, catastrophic: 370 },
  { date: "2024-05-03", moderate: 190, critical: 420, catastrophic: 380 },
  { date: "2024-05-04", moderate: 420, critical: 430, catastrophic: 390 },
  { date: "2024-05-05", moderate: 390, critical: 440, catastrophic: 400 },
  { date: "2024-05-06", moderate: 520, critical: 450, catastrophic: 410 },
  { date: "2024-05-07", moderate: 300, critical: 460, catastrophic: 420 },
  { date: "2024-05-08", moderate: 210, critical: 470, catastrophic: 430 },
  { date: "2024-05-09", moderate: 180, critical: 480, catastrophic: 440 },
  { date: "2024-05-10", moderate: 330, critical: 490, catastrophic: 450 },
  { date: "2024-05-11", moderate: 270, critical: 500, catastrophic: 460 },
  { date: "2024-05-12", moderate: 240, critical: 510, catastrophic: 470 },
  { date: "2024-05-13", moderate: 160, critical: 520, catastrophic: 480 },
  { date: "2024-05-14", moderate: 490, critical: 530, catastrophic: 490 },
  { date: "2024-05-15", moderate: 380, critical: 540, catastrophic: 500 },
  { date: "2024-05-16", moderate: 400, critical: 550, catastrophic: 510 },
  { date: "2024-05-17", moderate: 420, critical: 560, catastrophic: 520 },
  { date: "2024-05-18", moderate: 350, critical: 570, catastrophic: 530 },
  { date: "2024-05-19", moderate: 180, critical: 580, catastrophic: 540 },
  { date: "2024-05-20", moderate: 230, critical: 590, catastrophic: 550 },
  { date: "2024-05-21", moderate: 140, critical: 600, catastrophic: 560 },
  { date: "2024-05-22", moderate: 120, critical: 610, catastrophic: 570 },
  { date: "2024-05-23", moderate: 290, critical: 620, catastrophic: 580 },
  { date: "2024-05-24", moderate: 220, critical: 630, catastrophic: 590 },
  { date: "2024-05-25", moderate: 250, critical: 640, catastrophic: 600 },
  { date: "2024-05-26", moderate: 170, critical: 650, catastrophic: 610 },
  { date: "2024-05-27", moderate: 460, critical: 660, catastrophic: 620 },
  { date: "2024-05-28", moderate: 190, critical: 670, catastrophic: 630 },
  { date: "2024-05-29", moderate: 130, critical: 680, catastrophic: 640 },
  { date: "2024-05-30", moderate: 280, critical: 690, catastrophic: 650 },
  { date: "2024-05-31", moderate: 230, critical: 700, catastrophic: 660 },
  { date: "2024-06-01", moderate: 200, critical: 710, catastrophic: 670 },
  { date: "2024-06-02", moderate: 410, critical: 720, catastrophic: 680 },
  { date: "2024-06-03", moderate: 160, critical: 730, catastrophic: 690 },
  { date: "2024-06-04", moderate: 380, critical: 740, catastrophic: 700 },
  { date: "2024-06-05", moderate: 140, critical: 750, catastrophic: 710 },
  { date: "2024-06-06", moderate: 250, critical: 760, catastrophic: 720 },
  { date: "2024-06-07", moderate: 370, critical: 770, catastrophic: 730 },
  { date: "2024-06-08", moderate: 320, critical: 780, catastrophic: 740 },
  { date: "2024-06-09", moderate: 480, critical: 790, catastrophic: 750 },
  { date: "2024-06-10", moderate: 200, critical: 800, catastrophic: 760 },
  { date: "2024-06-11", moderate: 150, critical: 810, catastrophic: 770 },
  { date: "2024-06-12", moderate: 420, critical: 820, catastrophic: 780 },
  { date: "2024-06-13", moderate: 130, critical: 830, catastrophic: 790 },
  { date: "2024-06-14", moderate: 380, critical: 840, catastrophic: 800 },
  { date: "2024-06-15", moderate: 350, critical: 850, catastrophic: 810 },
  { date: "2024-06-16", moderate: 310, critical: 860, catastrophic: 820 },
  { date: "2024-06-17", moderate: 520, critical: 870, catastrophic: 830 },
  { date: "2024-06-18", moderate: 170, critical: 880, catastrophic: 840 },
  { date: "2024-06-19", moderate: 290, critical: 890, catastrophic: 850 },
  { date: "2024-06-20", moderate: 450, critical: 900, catastrophic: 860 },
  { date: "2024-06-21", moderate: 210, critical: 910, catastrophic: 870 },
  { date: "2024-06-22", moderate: 270, critical: 920, catastrophic: 880 },
  { date: "2024-06-23", moderate: 530, critical: 930, catastrophic: 890 },
  { date: "2024-06-24", moderate: 180, critical: 940, catastrophic: 900 },
  { date: "2024-06-25", moderate: 190, critical: 950, catastrophic: 910 },
  { date: "2024-06-26", moderate: 380, critical: 960, catastrophic: 920 },
  { date: "2024-06-27", moderate: 490, critical: 970, catastrophic: 930 },
  { date: "2024-06-28", moderate: 200, critical: 980, catastrophic: 940 },
  { date: "2024-06-29", moderate: 160, critical: 990, catastrophic: 950 },
  { date: "2024-06-30", moderate: 400, critical: 1000, catastrophic: 960 },
];


const chartConfig = {
  moderate: {
    label: "Moderate",
    color: "hsl(45, 100%, 50%)", // yellow
  },
  critical: {
    label: "Critical",
    color: "hsl(30, 100%, 50%)", // orange
  },
  catastrophic: {
    label: "Catastrophic",
    color: "hsl(0, 100%, 50%)", // red
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
              <linearGradient id="fillModerate" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-moderate)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-moderate)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillCritical" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-critical)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-critical)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillCatastrophic" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-catastrophic)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-catastrophic)"
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
              dataKey="moderate"
              type="natural"
              fill="url(#fillModerate)"
              stroke="var(--color-moderate)"
              stackId="a"
            />
            <Area
              dataKey="critical"
              type="natural"
              fill="url(#fillCritical)"
              stroke="var(--color-critical)"
              stackId="a"
            />
            <Area
              dataKey="catastrophic"
              type="natural"
              fill="url(#fillCatastrophic)"
              stroke="var(--color-catastrophic)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
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
    <ScrollArea className="h-[420px]">
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
    </ScrollArea>
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
  const [streamRef, setStreamRef] = useState<HTMLImageElement | null>(null);
  const { data: session } = useSession();

  // Function to stop stream
  const stopStream = () => {
    if (streamRef) {
      streamRef.src = '';
      setStreamRef(null);
    }
  };

  // Handle dialog state changes
  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      stopStream();
      setSelectedCamera(null);
    }
  };

  // Handle camera selection and stream start
  const handleCameraClick = (camera: Camera) => {
    setSelectedCamera(camera);
    setIsDialogOpen(true);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopStream();
    };
  }, []);

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

      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
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
            {selectedCamera?.ipAddress ? (
              <img 
                ref={(el) => setStreamRef(el)}
                src={selectedCamera.ipAddress} 
                alt="Camera Stream"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Stream error:', e);
                  e.currentTarget.src = ''; // Clear source on error
                }}
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
