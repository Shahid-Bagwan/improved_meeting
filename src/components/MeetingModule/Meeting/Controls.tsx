"use client";
import { Button } from "@/components/shadcnComponents/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcnComponents/dropdown-menu";
import { useTrackStore } from "@/store/useTrackStore";
import {
  Mic,
  Video,
  MoreVertical,
  PhoneOff,
  LayoutGrid,
  Sparkles,
  Maximize2,
  Users,
  MessageSquare,
} from "lucide-react";
import { Clock } from "./Clock";

interface ControlsProps {
  onOpenLayoutSelector: (layout: string) => void;
  onOpenPeople: () => void;
  onOpenChat: () => void;
}

export function Controls({
  onOpenLayoutSelector,
  onOpenPeople,
  onOpenChat,
}: ControlsProps) {
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
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-black/90 flex items-center justify-between px-4 z-40">
      {/* Left side - Layout selector (visible on sm and above) */}
      <div className="hidden sm:flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 text-white hover:bg-white">
              <LayoutGrid className="h-4 w-4" />
              <span>Layout</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-neutral-800 text-white border-neutral-700">
            <DropdownMenuItem
              onClick={() => onOpenLayoutSelector("grid")}
              className="hover:bg-white/10 cursor-pointer"
            >
              Grid View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onOpenLayoutSelector("spotlight")}
              className="hover:bg-white/10 cursor-pointer"
            >
              Spotlight View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/*  */}
        <Clock />
      </div>

      {/* Center - Main Controls */}
      <div className="flex items-center gap-4 mx-auto sm:mx-0">
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full text-white hover:bg-white"
          onClick={handleToggleMute}
        >
          <Mic className={isAudioEnabled ? "text-red-500" : "text-white"} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full text-white hover:bg-white"
          onClick={handleToggleVideo}
        >
          <Video className={isVideoEnabled ? "text-red-500" : "text-white"} />
        </Button>

        {/* More options dropdown - Layout option only shows on mobile */}
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
            {/* Mobile-only menu items */}
            <div className="sm:hidden space-y-1">
              <DropdownMenuItem
                className="flex items-center gap-2 hover:bg-white/10 cursor-pointer"
                onClick={() => onOpenLayoutSelector("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
                <span>Grid Layout</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 hover:bg-white/10 cursor-pointer"
                onClick={() => onOpenLayoutSelector("spotlight")}
              >
                <LayoutGrid className="h-4 w-4" />
                <span>Spotlight Layout</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 hover:bg-white/10 cursor-pointer"
                onClick={onOpenPeople}
              >
                <Users className="h-4 w-4" />
                <span>People</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 hover:bg-white/10 cursor-pointer"
                onClick={onOpenChat}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat</span>
              </DropdownMenuItem>
            </div>

            {/* Common menu items */}
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

      {/* Right side - People and Chat (visible on sm and above) */}
      <div className="hidden sm:flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full text-white hover:bg-white"
          onClick={onOpenPeople}
        >
          <Users className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full text-white hover:bg-white"
          onClick={onOpenChat}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
