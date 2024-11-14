"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTrackStore } from "@/store/useTrackStore";
import {
  Mic,
  Video,
  MoreVertical,
  PhoneOff,
  LayoutGrid,
  Sparkles,
  Maximize2,
} from "lucide-react";

interface ControlsProps {
  onOpenLayoutSelector: () => void;
}

export function Controls({ onOpenLayoutSelector }: ControlsProps) {
  const {
    localCameraTrack,
    localMicrophoneTrack,
    isAudioEnabled,
    isVideoEnabled,
  } = useTrackStore();
  const handleToggleVideo = () => {
    console.log("toggle video");
    void localCameraTrack?.setEnabled(!isVideoEnabled);
    useTrackStore.getState().toggleVideo();
    // onToggleVideo();
  };

  const handleToggleMute = () => {
    void localMicrophoneTrack?.setEnabled(!isAudioEnabled);
    useTrackStore.getState().toggleAudio();
    // onToggleMute();
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-black/90 flex items-center justify-center px-4 z-40">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full text-white hover:bg-white/10"
          onClick={handleToggleMute}
        >
          <Mic className={isAudioEnabled ? "text-red-500" : "text-white"} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full text-white hover:bg-white/10"
          onClick={handleToggleVideo}
        >
          <Video className={isVideoEnabled ? "text-red-500" : "text-white"} />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full text-white hover:bg-white"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            className="mb-2 bg-neutral-800 text-white border-neutral-700"
          >
            <DropdownMenuItem
              className="flex items-center gap-2 hover:bg-white/10 cursor-pointer"
              onClick={onOpenLayoutSelector}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Change layout</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 hover:bg-white/10 cursor-pointer">
              <Sparkles className="h-4 w-4" />
              <span>Visual effects</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 hover:bg-white/10 cursor-pointer">
              <Maximize2 className="h-4 w-4" />
              <span>Full screen</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="destructive"
          size="icon"
          className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600"
        >
          <PhoneOff className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
