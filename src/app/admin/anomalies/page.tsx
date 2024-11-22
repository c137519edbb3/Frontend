'use client'

import AnomalyFormDialog from "@/components/admin/anomalyDialog"
import Header from "@/components/common/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MultiSelect } from "@/components/ui/multi-select"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"; 
import { flexRender, getCoreRowModel, useReactTable, SortingState, getSortedRowModel, ColumnFiltersState, getPaginationRowModel }from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import EditAnomalyFormDialog from "@/components/admin/editAnomaly"
import { Graph1 } from "@/components/admin/anomalyChart1"
import { Graph2 } from "@/components/admin/anomalyChart2"

function Anomalies() {
  const [open, setOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [editingAnomaly, setEditingAnomaly] = useState<Anomaly | null>(null);
  const [anomalies, setAnomalies] = useState<Anomaly[]>([
    {
      id: Date.now(),
      title: "Students Cheating",
      description: "Make sure that students dont cheat in exams",
      cameras: ["Camera 1", "Camera 2"],
      criticality: "Critical",
      scheduledTime: { start: "08:00", end: "09:00" },
      weekdays: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
    {
      id: Date.now()+1000,
      title: "Students Cheating",
      description: "Make sure that students dont cheat in exams",
      cameras: ["Camera 1", "Camera 2"],
      criticality: "Critical",
      scheduledTime: { start: "08:00", end: "09:00" },
      weekdays: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
    
  ]);

  const handleDeleteClick = (anomalyId: number) => {
    setAnomalies(anomalies.filter((anomaly) => anomaly.id !== anomalyId));
  };

  const handleEditClick = (anomaly: Anomaly) => {
    setEditingAnomaly(anomaly);
  };

  const [newAnomaly, setNewAnomaly] = useState<Anomaly>({
    id: Date.now(),
    title: "",
    description: "",
    cameras: [],
    criticality: "Moderate",
    scheduledTime: { start: "", end: "" },
    weekdays: [],
  });


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
      accessorKey: "cameras",
      header: "Assigned Cameras",
      cell: ({ row }: any) => row.getValue("cameras").join(", "),
      enableSorting: true,
    },
    {
      accessorKey: "criticality",
      header: "Criticality",
      cell: ({ row }: any) => row.getValue("criticality"),
      enableSorting: true,
    },
    {
      accessorKey: "scheduledTime",
      header: "Scheduled Time",
      cell: ({ row }: any) => `${row.getValue("scheduledTime").start} - ${row.getValue("scheduledTime").end}`,
      enableSorting: false,
    },
    {
      accessorKey: "weekdays",
      header: "Scheduled days",
      cell: ({ row }: any) => row.getValue("weekdays").join(", "),
      enableSorting: true,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <div className="flex space-x-4">
          <EditAnomalyFormDialog
            cameraOptions={cameraOptions}
            initialAnomaly={row.original} 
            onSave={handleEditAnomaly}
          />
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

  const handleMultiSelectChange = (selected: string[], field: string) => {
    setNewAnomaly((prevState) => ({
      ...prevState,
      [field]: selected,
    }));
  };
  
  const handleSaveAnomaly = (anomaly: any) => {
    console.log("Saved Anomaly:", anomaly);
    setAnomalies([...anomalies, anomaly]);
  };

  const handleAddAnomaly = () => {
    setAnomalies([...anomalies, newAnomaly])
    console.log("New Anomaly:", newAnomaly)
  }
  
  return (
    <div className="flex flex-col gap-6 p-4 pr-20 bg-background min-h-screen w-full">

      <Header pageName="Anomaly management" userName="John Doe" userEmail="6oFkI@example.com" />
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-secondary">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="Anomaly Logs">Anomaly Logs</TabsTrigger>
        </TabsList>
      </Tabs>

      
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Filter by anomaly title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
            className="max-w-sm"
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
                  No results.
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


      <div className="flex  gap-4 h-64">
        <div className=" w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
          <Graph1 />
        </div>
        
        <div className="  w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
          <Graph2/>
        </div>
      </div>


    </div>
    
  )
}

export default Anomalies