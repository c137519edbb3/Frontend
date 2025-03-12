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
import { RouteGuard } from '@/components/auth/RouteGuard';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL_AWS;


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
  const [anomalyData, setAnomalyData] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const { data: session } = useSession()

  // Fetch anomaly data
  useEffect(() => {
    const fetchAnomalyData = async () => {
      try {
        if (!session?.user?.token) return

        const response = await fetch(`${SERVER_URL}/api/analytics/anomaly/daily-counts`, {
          headers: {
            'Authorization': `Bearer ${session.user.token}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch anomaly data')
        }

        const data = await response.json()
        setAnomalyData(data.data)
      } catch (error) {
        console.error('Error fetching anomaly data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnomalyData()
  }, [session?.user?.token])

  const filteredData = anomalyData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date()
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

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-[300px]">
          <div>Loading anomaly data...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Anomaly Count</CardTitle>
          <CardDescription>
            Showing anomaly counts for the last {timeRange === "90d" ? "3 months" : timeRange === "30d" ? "30 days" : "7 days"}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select time range"
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
    <RouteGuard allowedRoles={['Organization Admin']}>
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
    </RouteGuard>
  );
}
