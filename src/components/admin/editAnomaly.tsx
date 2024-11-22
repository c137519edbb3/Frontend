import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { MultiSelect } from "../ui/multi-select";
import { Button } from "../ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "../ui/select";
import { Edit } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

interface AnomalyFormProps {
  cameraOptions: Array<{ label: string; value: string }>;
  initialAnomaly?: Anomaly | null;
  onSave: (anomaly: Anomaly) => void;
}

const EditAnomalyFormDialog: React.FC<AnomalyFormProps> = ({ cameraOptions, initialAnomaly, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anomaly, setAnomaly] = useState<Anomaly>({
    id: Date.now(),
    title: "",
    description: "",
    cameras: [],
    scheduledTime: { start: "", end: "" },
    criticality: "Moderate",
    weekdays: [],
  });
  useEffect(() => {
    console.log("Props passed to EditAnomalyFormDialog:", { cameraOptions, initialAnomaly, onSave });
  }, [cameraOptions, initialAnomaly, onSave]);
  

  useEffect(() => {
    if (initialAnomaly) {
      setAnomaly(initialAnomaly);
    }
  }, [initialAnomaly]);

  const handleSave = () => {
    onSave({
      ...anomaly,
      cameras: Array.isArray(anomaly.cameras) ? anomaly.cameras : [],
      weekdays: Array.isArray(anomaly.weekdays) ? anomaly.weekdays : [],
    });
    setIsOpen(false);
  };

  const handleChange = (field: keyof Anomaly, value: any) => {
    setAnomaly((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOpenChange = (state: boolean) => {
    console.log("Dialog state:", state);
    setIsOpen(state);
  };
  
  

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {/* <Button variant="ghost" onClick={() => setIsOpen(true)}>Edit</Button> */}
        <Edit
            className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-primary"
            onClick={() => setIsOpen(true)}
          />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Anomaly</DialogTitle>
          <DialogDescription>Update the details of the anomaly.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="anomaly-title" className="text-right">
              Title
            </Label>
            <Input
              id="anomaly-title"
              value={anomaly.title}
              className="col-span-3"
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Anomaly title"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="anomaly-description" className="text-right">
              Description
            </Label>
            <Input
              id="anomaly-description"
              value={anomaly.description}
              className="col-span-3"
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Anomaly description"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="anomaly-cameras" className="text-right">
              Assigned Cameras
            </Label>
            <MultiSelect
              id="anomaly-cameras"
              variant="inverted"
              className="col-span-3"
              options={cameraOptions}
              defaultValue={anomaly.cameras}
              value={anomaly.cameras}
              onValueChange={(value) => handleChange("cameras", value)}
            />
          </div>


          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="anomaly-start-time" className="text-right">
              Start time
            </Label>
            <Input
              id="anomaly-start-time"
              type="time"
              value={anomaly.scheduledTime.start}
              onChange={(e) =>
                handleChange("scheduledTime", { ...anomaly.scheduledTime, start: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="end time" className="text-right">
                  End time
            </Label>
            <Input
              id="anomaly-end-time"
              type="time"
              value={anomaly.scheduledTime.end}
              onChange={(e) =>
                handleChange("scheduledTime", { ...anomaly.scheduledTime, end: e.target.value })
              }
            />
          </div>


          <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="anomaly-criticality" className="text-right">
            Criticality
          </Label>
          <Select
            value={anomaly.criticality}
            onValueChange={(value) => handleChange("criticality", value)}
          >
            <SelectTrigger id="anomaly-criticality" className="col-span-3">
              <SelectValue placeholder="Select criticality" />
            </SelectTrigger>
            <SelectContent className="col-span-3">
              <SelectGroup>
                {["Low", "Moderate", "Critical"].map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select> 
          </div>

          

          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="anomaly-weekdays" className="text-right">
              Runs on Days
            </Label>
            <div className="mt-4">
                  <div className="grid grid-cols-2 gap-x-32 gap-y-2">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <div key={day} className="flex items-center">
                        <Checkbox
                          className="mr-2"
                          id={day.toLowerCase()}
                          checked={anomaly.weekdays.includes(day)}
                          onCheckedChange={(isChecked) => {
                            const updatedWeekdays = isChecked
                              ? [...anomaly.weekdays, day]
                              : anomaly.weekdays.filter((d) => d !== day);
                            handleChange("weekdays", updatedWeekdays);
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
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAnomalyFormDialog;