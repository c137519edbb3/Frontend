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
import { flexRender, getCoreRowModel, useReactTable, SortingState, getSortedRowModel }from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

function Anomalies() {
  const [open, setOpen] = useState(false);
  const [anomalies, setAnomalies] = useState<Anomaly[]>([
    {
      title: "Students Cheating",
      description: "Make sure that students dont cheat in exams",
      cameras: ["Camera 1", "Camera 2"],
      criticality: "critical",
      scheduledTime: { start: "08:00", end: "09:00" },
      weekdays: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
    {
      title: "Students Cheating",
      description: "Make sure that students dont cheat in exams",
      cameras: ["Camera 1", "Camera 2"],
      criticality: "critical",
      scheduledTime: { start: "08:00", end: "09:00" },
      weekdays: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
  ]);


  const [newAnomaly, setNewAnomaly] = useState<Anomaly>({
    title: "",
    description: "",
    cameras: [],
    criticality: "moderate",
    scheduledTime: { start: "", end: "" },
    weekdays: [],
  });


  const cameraOptions = [
    "Camera 1",
    "Camera 2",
    "Camera 3",
    "Camera 4",
  ].map((camera) => ({ label: camera, value: camera }));
  
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Anomaly</DropdownMenuItem>
            <DropdownMenuItem>Delete Anomaly</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: anomalies,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
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
  };

  const handleAddAnomaly = () => {
    setAnomalies([...anomalies, newAnomaly])
    console.log("New Anomaly:", newAnomaly)
    setOpen(false)
    setNewAnomaly({
      title: "",
      description: "",
      cameras: [],
      criticality: "moderate",
      scheduledTime: { start: "", end: "" },
      weekdays: [],
    })
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
        <div className="flex items-center">
          <Input placeholder="Search anomalies..." className="max-w-sm" />
        </div>
        <div className="flex ">
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
                    {header.isPlaceholder ? null : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No anomalies found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      

      
    </div>
  )
}

export default Anomalies