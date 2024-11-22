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

interface AnomalyFormProps {
  cameraOptions: Array<{ label: string; value: string }>;
  onSave: (anomaly: Anomaly) => void;
}

const AnomalyFormDialog: React.FC<AnomalyFormProps> = ({ cameraOptions, onSave }) => {
    const [newAnomaly, setNewAnomaly] = useState<Anomaly>({
      title: "",
      description: "",
      cameras: [],
      scheduledTime: { start: "", end: "" },
      criticality: "moderate",
      weekdays: [],
    });
  
    const handleSave = () => {
      onSave(newAnomaly);
    };
  
    return (
      <div>
        <Dialog>
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
                  onValueChange={(value) => setNewAnomaly({ ...newAnomaly, cameras: value })}
                  defaultValue={newAnomaly.cameras}
                  placeholder="Select cameras"
                  variant="inverted"
                  className="col-span-3"
                  maxCount={3}
                />
              </div>
  
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start time" className="text-right">
                  Start time
                </Label>
                <Input
                  type="time"
                  className="flex-1"
                  placeholder="Start Time"
                  value={newAnomaly.scheduledTime.start}
                  onChange={(e) =>
                    setNewAnomaly({
                      ...newAnomaly,
                      scheduledTime: { ...newAnomaly.scheduledTime, start: e.target.value },
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
                  value={newAnomaly.scheduledTime.end}
                  onChange={(e) =>
                    setNewAnomaly({
                      ...newAnomaly,
                      scheduledTime: { ...newAnomaly.scheduledTime, end: e.target.value },
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
                    setNewAnomaly({ ...newAnomaly, criticality: value as Anomaly["criticality"] })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Criticality" />
                  </SelectTrigger>
                  <SelectContent className="col-span-3">
                    <SelectGroup>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="catastrophic">Catastrophic</SelectItem>
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
                          checked={newAnomaly.weekdays.includes(day.toLowerCase())}
                          onCheckedChange={(checked) => {
                            setNewAnomaly((prev) => {
                              const weekdays = checked
                                ? [...prev.weekdays, day.toLowerCase()]
                                : prev.weekdays.filter((d) => d !== day.toLowerCase());
                              return { ...prev, weekdays };
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
              <Button type="button" className="bg-neutral-600">
                Cancel
              </Button>
              <Button type="submit" onClick={handleSave}>
                Save Anomaly
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  };
  
  export default AnomalyFormDialog;