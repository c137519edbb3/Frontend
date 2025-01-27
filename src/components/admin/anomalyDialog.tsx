import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '../ui/dialog';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { MultiSelect } from "../ui/multi-select";
import { Button } from "../ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { AnomalyRequest } from "@/types/anomaly-request";

interface AnomalyFormProps {
  cameraOptions: Array<{ label: string; value: string }>;
  onSave: (anomaly: AnomalyRequest) => void;
}

const AnomalyFormDialog: React.FC<AnomalyFormProps> = ({ cameraOptions, onSave }) => {
  const [open, setOpen] = useState(false);
  const [newAnomaly, setNewAnomaly] = useState<AnomalyRequest>({
    title: "",
    description: "",
    criticality: "Moderate",
    modelName: "VLM", // Default value
    cameraIds: [],
    startTime: "",
    endTime: "",
    daysOfWeek: [],
  });

  const handleSave = () => {
    const daysMap: Record<string, string> = {
      'monday': 'MON',
      'tuesday': 'TUE',
      'wednesday': 'WED',
      'thursday': 'THU',
      'friday': 'FRI',
      'saturday': 'SAT',
      'sunday': 'SUN'
    };

    const anomalyToSave: AnomalyRequest = {
      ...newAnomaly,
      cameraIds: newAnomaly.cameraIds.map(Number),
      daysOfWeek: newAnomaly.daysOfWeek.map(day => daysMap[day.toLowerCase()]),
      startTime: newAnomaly.startTime + ':00',
      endTime: newAnomaly.endTime + ':00'
    };

    onSave(anomalyToSave);
    
    // Reset form
    setNewAnomaly({
      title: "",
      description: "",
      criticality: "Moderate",
      modelName: "VLM",
      cameraIds: [],
      startTime: "",
      endTime: "",
      daysOfWeek: [],
    });
    
    setOpen(false);
  };

  // Update camera selection handler
  const handleCameraChange = (selectedValues: string[]) => {
    setNewAnomaly({ 
      ...newAnomaly, 
      cameraIds: selectedValues.map(Number)
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Anomaly</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Anomaly</DialogTitle>
          <DialogDescription>
            Provide the anomaly title, description, camera, criticality level, and schedule for effective monitoring.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Title" className="text-right">
              Anomaly Title
            </Label>
            <Input
              id="name"
              value={newAnomaly.title}
              className="col-span-3"
              onChange={(e) => setNewAnomaly({ ...newAnomaly, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Description" className="text-right">
              Description
            </Label>
            <Input
              id="Description"
              value={newAnomaly.description}
              className="col-span-3"
              onChange={(e) => setNewAnomaly({ ...newAnomaly, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Camera" className="text-right">
              Assigned Cameras
            </Label>
            <MultiSelect
              options={cameraOptions}
              onValueChange={handleCameraChange}
              defaultValue={newAnomaly.cameraIds.map(String)}
              placeholder="Select cameras"
              variant="inverted"
              className="col-span-3"
              maxCount={3}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="modelName" className="text-right">
              Model
            </Label>
            <Select
              value={newAnomaly.modelName}
              onValueChange={(value: string) =>
                setNewAnomaly({ ...newAnomaly, modelName: value })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="VLM">VLM</SelectItem>
                  <SelectItem value="ConvLSTM">ConvLSTM</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="start time" className="text-right">
              Start time
            </Label>
            <Input
              type="time"
              className="flex-1"
              placeholder="Start Time"
              value={newAnomaly.startTime}
              onChange={(e) =>
                setNewAnomaly({
                  ...newAnomaly,
                  startTime: e.target.value,
                })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="end time" className="text-right">
              End time
            </Label>
            <Input
              type="time"
              className="flex-1"
              placeholder="End Time"
              value={newAnomaly.endTime}
              onChange={(e) =>
                setNewAnomaly({
                  ...newAnomaly,
                  endTime: e.target.value,
                })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="criticality" className="text-right">
              Criticality
            </Label>
            <Select
              value={newAnomaly.criticality}
              onValueChange={(value: string) =>
                setNewAnomaly({ ...newAnomaly, criticality: value })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Criticality" />
              </SelectTrigger>
              <SelectContent className="col-span-3">
                <SelectGroup>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="Catastrophic">Catastrophic</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="weekdays" className="text-right">
              Runs on Days
            </Label>
            <div className="mt-4">
              <div className="grid grid-cols-2 gap-x-32 gap-y-2">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <div key={day} className="flex items-center">
                    <Checkbox
                      className="mr-2"
                      id={day.toLowerCase()}
                      checked={newAnomaly.daysOfWeek.includes(day.toLowerCase())}
                      onCheckedChange={(checked) => {
                        setNewAnomaly((prev) => {
                          const daysOfWeek = checked
                            ? [...prev.daysOfWeek, day.toLowerCase()]
                            : prev.daysOfWeek.filter((d) => d !== day.toLowerCase());
                          return { ...prev, daysOfWeek };
                        });
                      }}
                    />
                    <label htmlFor={day.toLowerCase()} className="text-sm text-gray-700">
                      {day}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSave}>
            Save Anomaly
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AnomalyFormDialog;