import { Mic, MonitorSpeaker } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SettingsControls() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="grid gap-2">
        <Select defaultValue="default">
          <SelectTrigger className="w-[300px]">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4" />
              <SelectValue placeholder="Microphone" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default Microphone</SelectItem>
            <SelectItem value="external">External Microphone</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Select defaultValue="default">
          <SelectTrigger className="w-[300px]">
            <div className="flex items-center gap-2">
              <MonitorSpeaker className="w-4 h-4" />
              <SelectValue placeholder="Speakers" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">
              Speakers (FxSound Audio Enhancer)
            </SelectItem>
            <SelectItem value="headphones">
              Headphones (Realtek Audio)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Select defaultValue="default">
          <SelectTrigger className="w-[300px]">
            <div className="flex items-center gap-2">
              <MonitorSpeaker className="w-4 h-4" />
              <SelectValue placeholder="Camera" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Integrated Camera</SelectItem>
            <SelectItem value="headphones">Camera (Realtek )</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
