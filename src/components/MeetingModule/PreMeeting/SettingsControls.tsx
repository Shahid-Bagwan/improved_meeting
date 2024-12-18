import { Mic, MonitorSpeaker, Camera } from "lucide-react";
import { useEffect, useState } from "react";
import getAvailableDevices from "@/lib/getAvailableDevices";
import { useTrackStore } from "@/store/useTrackStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcnComponents/select";

export function SettingsControls() {
  // State for available devices
  const [devices, setDevices] = useState<
    Awaited<ReturnType<typeof getAvailableDevices>>
  >({
    microphones: [],
    cameras: [],
    speakers: [],
  });

  // State for selected devices
  const [selectedDevices, setSelectedDevices] = useState({
    microphoneId: "default",
    speakerId: "default",
    cameraId: "default",
  });

  // Store selected devices in global state
  const setSelectedDeviceIds = useTrackStore(
    (state) => state.setSelectedDeviceIds
  );

  // Fetch available devices on component mount
  useEffect(() => {
    const loadDevices = async () => {
      const availableDevices = await getAvailableDevices();
      setDevices(availableDevices);
    };
    loadDevices();
  }, []);

  // Handle device selection changes
  const handleDeviceChange = (
    deviceType: "microphoneId" | "speakerId" | "cameraId",
    value: string
  ) => {
    setSelectedDevices((prev) => ({ ...prev, [deviceType]: value }));
    setSelectedDeviceIds(deviceType, value);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center ">
      <div className="grid gap-2 overflow-hidden">
        <Select
          defaultValue="default"
          onValueChange={(value) => handleDeviceChange("microphoneId", value)}
        >
          <SelectTrigger className="w-full sm:w-[200px] rounded-full">
            <div className="flex items-center gap-2 truncate">
              <Mic className="w-4 h-4 flex-shrink-0" />
              <SelectValue placeholder="Microphone" className="truncate" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white">
            {devices?.microphones?.map((device) => (
              <SelectItem
                key={device.deviceId}
                value={device.deviceId}
                className="truncate"
              >
                {device.label || "Unnamed Microphone"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2 overflow-hidden">
        <Select
          defaultValue="default"
          onValueChange={(value) => handleDeviceChange("speakerId", value)}
        >
          <SelectTrigger className="w-full sm:w-[200px] rounded-full">
            <div className="flex items-center gap-2 truncate">
              <MonitorSpeaker className="w-4 h-4 flex-shrink-0" />
              <SelectValue placeholder="Speakers" className="truncate" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white">
            {devices?.speakers?.map((device) => (
              <SelectItem
                key={device.deviceId}
                value={device.deviceId}
                className="truncate"
              >
                {device.label || "Unnamed Speaker"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2 overflow-hidden">
        <Select
          defaultValue="default"
          onValueChange={(value) => handleDeviceChange("cameraId", value)}
        >
          <SelectTrigger className="w-full sm:w-[200px]rounded-full">
            <div className="flex items-center gap-2 truncate">
              <Camera className="w-4 h-4 flex-shrink-0" />
              <SelectValue placeholder="Camera" className="truncate" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {devices?.cameras?.map((device) => (
              <SelectItem
                key={device.deviceId}
                value={device.deviceId}
                className="truncate"
              >
                {device.label || "Unnamed Camera"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
