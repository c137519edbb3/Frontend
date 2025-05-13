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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";
import { Edit } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { dayCodeMap } from "@/constants/config";
import { AnomalyRequest } from "@/types/anomaly-request";
import { updateAnomaly } from "@/utils/anomaly-api";
import { Anomaly as BaseAnomaly } from "@/types/anomalies";

// Extended Anomaly interface to include cameras array
interface Anomaly extends BaseAnomaly {
  cameras: string[];
}

interface AnomalyFormProps {
  cameraOptions: Array<{ label: string; value: string }>;
  initialAnomaly?: Anomaly | null;
  organizationId: number;
  accessToken: string;
  onSave: (updatedAnomaly: Anomaly) => void;
}

const EditAnomalyFormDialog: React.FC<AnomalyFormProps> = ({
  cameraOptions,
  initialAnomaly,
  organizationId,
  accessToken,
  onSave,
}) => {
  const [isOpen, setIsOpen] = useState(false);  const [anomaly, setAnomaly] = useState<Anomaly>({
    anomalyId: Date.now(),
    title: "",
    description: "",
    cameras: [],
    startTime: "",
    endTime: "",
    criticality: "Moderate",
    daysOfWeek: [],
    status: "",
    organizationId: 0,
    createdAt: "",
    updatedAt: "",
    modelName: "",
    Cameras: []
  });
  useEffect(() => {
    console.log("Props passed to EditAnomalyFormDialog:", {
      cameraOptions,
      initialAnomaly,
    });
  }, [cameraOptions, initialAnomaly]);  useEffect(() => {
    if (initialAnomaly) {
      console.log("Initial anomaly received:", JSON.stringify(initialAnomaly, null, 2));
      
      // Format time fields for display (HH:MM)
      const formatTimeForInput = (timeString: string) => {
        if (!timeString) return "";
        // If the time includes seconds, remove them for the input field
        if (timeString.split(':').length === 3) {
          return timeString.substring(0, 5); // Take only HH:MM part
        }
        return timeString;
      };
      
      // Create a mapped version of the anomaly with correctly formatted fields
      const mappedAnomaly = {
        ...initialAnomaly,
        startTime: formatTimeForInput(initialAnomaly.startTime),
        endTime: formatTimeForInput(initialAnomaly.endTime),
        // Ensure cameras array is properly mapped from Cameras objects if needed
        cameras: initialAnomaly.cameras || 
                 (initialAnomaly.Cameras?.map(c => c.cameraId.toString()) || [])
      };
      
      console.log("Mapped anomaly for form:", mappedAnomaly);
      setAnomaly(mappedAnomaly);
    }
  }, [initialAnomaly]);  const handleSave = async () => {
    try {
      // Format time to ensure it has seconds (HH:MM:SS)
      const formatTimeWithSeconds = (timeString: string) => {
        if (!timeString) return "";
        // If time already has seconds part, return as is
        if (timeString.split(':').length === 3) return timeString;
        // Otherwise add :00 for seconds
        return `${timeString}:00`;
      };

      // Save the time values we're trying to update
      const updatedStartTime = formatTimeWithSeconds(anomaly.startTime);
      const updatedEndTime = formatTimeWithSeconds(anomaly.endTime);
      
      console.log(`Updating times: startTime=${updatedStartTime}, endTime=${updatedEndTime}`);

      // Create the API request
      const anomalyRequest: AnomalyRequest = {
        title: anomaly.title,
        description: anomaly.description,
        criticality: anomaly.criticality,
        modelName: anomaly.modelName || "",
        cameraIds: anomaly.cameras.map(id => parseInt(id)),
        startTime: updatedStartTime,
        endTime: updatedEndTime,
        daysOfWeek: anomaly.daysOfWeek || []
      };

      console.log("Sending update request:", JSON.stringify(anomalyRequest, null, 2));

      // Send the update to the API
      const serverResponse = await updateAnomaly(
        organizationId,
        anomaly.anomalyId,
        anomalyRequest,
        accessToken
      );
      
      console.log("Server response:", JSON.stringify(serverResponse, null, 2));
      
      // Create a merged object that preserves our updated time values
      // This ensures the UI reflects our changes even if the server doesn't return them
      const mergedAnomaly: Anomaly = {
        ...serverResponse,
        startTime: updatedStartTime,
        endTime: updatedEndTime,
        cameras: anomaly.cameras // Preserve camera selections
      };
      
      console.log("Merged anomaly passing to parent:", JSON.stringify(mergedAnomaly, null, 2));
        // Pass the merged object to the parent component
      onSave(mergedAnomaly);
      setIsOpen(false);
    } catch (error) {
      console.error('Error updating anomaly:', error);
      // Add error notification here
    }
  };const handleChange = (field: keyof Anomaly, value: string | string[]) => {
    console.log(`Changing field: ${field} to value:`, value);
    
    if (field === 'daysOfWeek') {
      setAnomaly((prev) => ({
        ...prev,
        daysOfWeek: Array.isArray(value) ? value : prev.daysOfWeek
      }));
    } else if (field === 'startTime' || field === 'endTime') {
      // Log time changes specifically
      console.log(`Updating ${field} from ${anomaly[field]} to ${value}`);
      setAnomaly((prev) => ({
        ...prev,
        [field]: value,
      }));
    } else {
      setAnomaly((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
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
          <DialogDescription>
            Update the details of the anomaly.
          </DialogDescription>
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
          </div>          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="anomaly-start-time" className="text-right">
              Start time
            </Label>
            <Input
              id="anomaly-start-time"
              type="time"
              value={anomaly.startTime || ""}
              className="col-span-3"
              onChange={(e) => handleChange("startTime", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="anomaly-end-time" className="text-right">
              End time
            </Label>
            <Input
              id="anomaly-end-time"
              type="time"
              value={anomaly.endTime || ""}
              className="col-span-3"
              onChange={(e) => handleChange("endTime", e.target.value)}
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
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <div key={day} className="flex items-center">
                    <Checkbox
                      className="mr-2"
                      id={day.toLowerCase()}
                      checked={anomaly.daysOfWeek?.includes(dayCodeMap[day])}
                      onCheckedChange={(isChecked) => {
                        const dayCode = dayCodeMap[day];
                        const updatedWeekdays = isChecked
                          ? [...(anomaly.daysOfWeek || []), dayCode]
                          : (anomaly.daysOfWeek || []).filter(
                              (d) => d !== dayCode
                            );
                        handleChange("daysOfWeek", updatedWeekdays);
                      }}
                    />
                    <label
                      htmlFor={day.toLowerCase()}
                      className="text-sm text-gray-700"
                    >
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
