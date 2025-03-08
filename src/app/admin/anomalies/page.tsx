'use client'

import AnomalyFormDialog from "@/components/admin/anomalyDialog"
import Header from "@/components/common/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useSession } from 'next-auth/react';
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MultiSelect } from "@/components/ui/multi-select"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"; 
import { flexRender, getCoreRowModel, useReactTable, SortingState, getSortedRowModel, ColumnFiltersState, getPaginationRowModel }from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import EditAnomalyFormDialog from "@/components/admin/editAnomaly"
import { Graph1 } from "@/components/admin/anomalyChart1"
import { Graph2 } from "@/components/admin/anomalyChart2"
import { ScrollArea } from "@/components/ui/scroll-area"
import SearchBox from "@/components/common/searchBox"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { useEffect } from "react"
import { Anomaly } from "@/types/anomalies"
import { Camera } from "@/types/camera"
import { AnomalyRequest } from "@/types/anomaly-request"
import Loading from "@/components/common/Loading"
import { createAnomaly, deleteAnomaly, getAnomalies, getCameras } from "@/utils/anomaly-api";
import { cn } from "@/lib/utils";
import { formatTimestamp } from "@/utils/date-utils";
import { subscribeToAnomalyLogs, type AnomalyLog } from '@/services/firebaseService';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL_AWS;

function Anomalies() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const organizationId = session?.user.organization.id;
  const [pageSize, setPageSize] = useState(10);
  const [editingAnomaly, setEditingAnomaly] = useState<Anomaly | null>(null);
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnomalyLog, setSelectedAnomalyLog] = useState<AnomalyLog | null>(null);
  const [anomalyLogs, setAnomalyLogs] = useState<AnomalyLog[]>([]);

  // Fetch anomalies from the server: /api/organization/<organizationId>/anomalies
  useEffect(() => {
    if (!organizationId || !accessToken) return;
  
    getAnomalies(organizationId, accessToken)
      .then((data) => {
        setAnomalies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch anomalies:", error);
        setLoading(false);
      });
  }, [accessToken, organizationId]);


  // Fetch cameras from the server: /api/organization/<organizationId>/organizationId>/cameras
  useEffect(() => {
    if (!organizationId || !accessToken) return;
  
    getCameras(organizationId, accessToken)
      .then((cameras) => {
        setCameras(cameras);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch cameras:", error);
        setLoading(false);
      });
  }, [accessToken, organizationId]);

  // Add Firebase subscription
  useEffect(() => {
    if (!organizationId) return;

    const unsubscribe = subscribeToAnomalyLogs(
      organizationId,
      (updatedLogs) => {
        setAnomalyLogs(updatedLogs);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [organizationId]);

  const handleDeleteClick = async (anomalyId: number) => {
    try {
      await deleteAnomaly(organizationId, anomalyId, accessToken);
      setAnomalies(anomalies.filter((anomaly) => anomaly.anomalyId !== anomalyId));
    } catch (error) {
      console.error('Error deleting anomaly:', error);
    }
  };

  const cameraOptions = Array.isArray(cameras) ? cameras.map((camera) => ({ 
    label: `${camera.location} (${camera.cameraType})`, 
    value: camera.cameraId.toString() 
  })) : [];

  const handleUpdateAnomaly = (updatedAnomaly: Anomaly) => {
    setAnomalies(anomalies.map(anomaly => 
      anomaly.anomalyId === updatedAnomaly.anomalyId ? updatedAnomaly : anomaly
    ));
  };
  
  const columns = [
    {
      accessorKey: "title",
      header: "Anomaly Title",
      cell: ({ row }: any) => row.getValue("title"),
      enableSorting: true,
    },
    {
      accessorKey: "description",
      header: "Anomaly Description",
      cell: ({ row }: any) => row.getValue("description"),
      enableSorting: false,
    },
    {
      accessorKey: "criticality",
      header: "Criticality",
      cell: ({ row }: any) => row.getValue("criticality"),
      enableSorting: true,
    },
    {
      accessorKey: "Cameras",
      header: "Camera Locations",
      cell: ({ row }: any) => {
        const cameras = row.original.Cameras;
        if (!cameras || cameras.length === 0) return "No cameras assigned";
        
        return cameras.map(camera => (
          `${camera.location} (${camera.cameraId})`
        )).join(", ");
      },
      enableSorting: false,
    },
    {
      id: "scheduledTime",
      header: "Scheduled Time",
      cell: ({ row }: { row: any }) => {
        const startTime = row.original.startTime;
        const endTime = row.original.endTime;
        return `${startTime} - ${endTime}`;
      },
      enableSorting: false,
},
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <div className="flex space-x-4">
          <EditAnomalyFormDialog
            cameraOptions={cameraOptions}
            initialAnomaly={row.original}
            organizationId={organizationId}
            accessToken={accessToken}
            onSave={handleUpdateAnomaly}
          />
          <Trash
            className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-red-500"
            onClick={() => handleDeleteClick(row.original.anomalyId)}
          />
        </div>
      ),
    }
    
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState[]>([]);


  const table = useReactTable({
    data: anomalies,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
  });


  const handleSaveAnomaly = async (anomaly: AnomalyRequest) => {
    try {
      const newAnomaly = await createAnomaly(organizationId, anomaly, accessToken);
      setAnomalies([...anomalies, newAnomaly]);
    } catch (error) {
      console.error('Error creating anomaly:', error);
    }
  };

  if (loading) {
    return <Loading />;
  }
  
  
  return (
    <div className="flex flex-col gap-6 p-4 pr-20 bg-background min-h-screen w-full">

      <Header pageName="Anomaly management" userName="John Doe" userEmail="6oFkI@example.com" />
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-secondary">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="Anomaly Logs">Anomaly Logs</TabsTrigger>
        </TabsList>
      

        <TabsContent value="overview">
        <div className="flex items-center pt-8 justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight pl-1">
                Add Anomalies
              </h2>
              <p className="text-sm text-muted-foreground pl-1">
              You can now easily edit, update, and delete your anomalies, giving you full control to manage and maintain accurate data.
              </p>
            </div>
          </div>
          <Separator className="my-4" />
      <div className="flex justify-between items-center w-full mt-4 mb-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Filter by anomaly title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
            className="max-w-sm "
          />
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              setPageSize(Number(value));
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select rows per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[5, 10, 20, 100].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size} rows per page
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex">
          <AnomalyFormDialog cameraOptions={cameraOptions} onSave={handleSaveAnomaly} />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No anomalies found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      
      

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} of {anomalies.length} anomalies
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      

      <div className="flex items-center pt-16 justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight pl-1">
            Anomaly Analytics
          </h2>
          <p className="text-sm text-muted-foreground pl-1">
          You can now view detailed graphs and analytics for your anomalies, enabling you to track trends and gain valuable insights for better decision-making.
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex  gap-4 h-64">
        <div className=" w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
          <Graph1 />
        </div>
        
        <div className="  w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
          <Graph2/>
        </div>
      </div>
      </TabsContent >

      <TabsContent value="Anomaly Logs" className="h-[85vh] border-1 rounded mt-8">
        <ResizablePanelGroup direction="horizontal" className="w-full rounded border">
          <ResizablePanel defaultSize={40} minSize={20}>
            <SearchBox />
            <ScrollArea className="h-[85vh]">
              <div className="px-4">
                <ul className="space-y-2">
                  {anomalyLogs.map((log) => (
                    <li
                      key={log.logId}
                      className={cn(
                        "p-4 rounded cursor-pointer transition-colors",
                        selectedAnomalyLog?.logId === log.logId
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary hover:bg-secondary/80"
                      )}
                      onClick={() => setSelectedAnomalyLog(log)}
                    >
                      <div className="font-medium">Anomaly #{log.logId}</div>
                      <div className="text-sm truncate">{log.event}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatTimestamp(log.timestamp)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollArea>
          </ResizablePanel>

          <ResizableHandle withHandle={true} />

          <ResizablePanel defaultSize={60} minSize={30}>
            {selectedAnomalyLog ? (
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                  Anomaly Details #{selectedAnomalyLog.logId}
                </h2>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Event Description</Label>
                    <div className="p-3 bg-secondary rounded-md">
                      {selectedAnomalyLog.event}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Camera ID</Label>
                    <div className="p-3 bg-secondary rounded-md">
                      {selectedAnomalyLog.cameraId}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Timestamp</Label>
                    <div className="p-3 bg-secondary rounded-md">
                      {formatTimestamp(selectedAnomalyLog.timestamp)}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Confidence</Label>
                    <div className="p-3 bg-secondary rounded-md">
                      {(selectedAnomalyLog.confidence * 100).toFixed(2)}%
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Criticality</Label>
                    <div className="p-3 bg-secondary rounded-md">
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        {
                          "bg-yellow-100 text-yellow-800": selectedAnomalyLog.criticality === "Moderate",
                          "bg-orange-100 text-orange-800": selectedAnomalyLog.criticality === "Critical",
                          "bg-red-100 text-red-800": selectedAnomalyLog.criticality === "Catastrophic",
                        }
                      )}>
                        {selectedAnomalyLog.criticality}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Select an anomaly to view details
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </TabsContent>

      </Tabs>
    </div>
    
  )
}

export default Anomalies