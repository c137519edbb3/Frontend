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

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL_AWS;

function Anomalies() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [pageSize, setPageSize] = useState(10);
  const [editingAnomaly, setEditingAnomaly] = useState<Anomaly | null>(null);
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);

  // Fetch anomalies from the server: /api/organization/1/anomalies
  useEffect(() => {
    fetch(`${SERVER_URL}/api/organization/1/anomalies`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setAnomalies(data))
      .catch((error) => console.error("Anomalies fetch error:", error));
  }, [accessToken]);

  const handleDeleteClick = (anomalyId: number) => {
    setAnomalies(anomalies.filter((anomaly) => anomaly.id !== anomalyId));
  };

  const cameraOptions = [
    "Camera 1",
    "Camera 2",
    "Camera 3",
    "Camera 4",
  ].map((camera) => ({ label: camera, value: camera }));

  const handleEditAnomaly = (updatedAnomaly: Anomaly) => {
    setAnomalies(anomalies.map(anomaly => 
      anomaly.id === updatedAnomaly.id ? updatedAnomaly : anomaly
    ));
    setEditingAnomaly(null);
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
          {/* <EditAnomalyFormDialog
            cameraOptions={cameraOptions}
            initialAnomaly={row.original} 
            onSave={handleEditAnomaly}
          /> */}
          <Trash
            className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-red-500"
            onClick={() => handleDeleteClick(row.original.id)}
          />
        </div>
      ),
    }
    
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);


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


  const handleSaveAnomaly = (anomaly: any) => {
    console.log("Saved Anomaly:", anomaly);
    setAnomalies([...anomalies, anomaly]);
  };

  
  
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
      
      <ResizablePanelGroup direction="horizontal" className="w-full rounded border" >
        <ResizablePanel defaultSize={40} minSize={20}>
          <SearchBox />
          <ScrollArea className="h-[85vh]">

            <div className="px-4">
              <ul className="space-y-2">
                {Array.from({ length: 50 }, (_, i) => (
                  <li
                    key={i}
                    className="p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
                  >
                    Item {i + 1}
                  </li>
                ))}
              </ul>
            </div>
            
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle={true} />
        <ResizablePanel defaultSize={60} minSize={30}>
          <div className="bg-red">
            <p>gergaregaer</p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      </TabsContent>

      </Tabs>
    </div>
    
  )
}

export default Anomalies