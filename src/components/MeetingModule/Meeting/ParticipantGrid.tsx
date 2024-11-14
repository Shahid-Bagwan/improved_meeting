"use client";

import { useRef, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { Mic, MicOff, Pin, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRemoteUsers } from "agora-rtc-react";
import { useTrackStore } from "@/store/useTrackStore"; // Import useTrackStore
import { LocalVideoTrack, RemoteUser } from "agora-rtc-react"; // Import components

interface ParticipantGridProps {
  layout?: string;
}

export function ParticipantGrid({ layout = "grid" }: ParticipantGridProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pinnedParticipant, setPinnedParticipant] = useState<
    string | number | null
  >(null);

  // Get local tracks
  const { localCameraTrack, localMicrophoneTrack, joined } = useTrackStore();

  // Get remote users
  const remoteusers = useRemoteUsers();

  // Create participants array
  const participants = [
    {
      id: "local",
      name: "You",
      isMuted: !localMicrophoneTrack,
      isPinned: false,
      videoTrack: localCameraTrack,
      audioTrack: localMicrophoneTrack,
    },
    ...remoteusers.map((user) => ({
      id: user.uid,
      name: `User ${user.uid}`,
      isMuted: !user.audioTrack,
      isPinned: false,
      videoTrack: user.videoTrack,
      audioTrack: user.audioTrack,
    })),
  ];

  const handlePin = (participantId: string | number) => {
    setPinnedParticipant((prev) =>
      prev === participantId ? null : participantId
    );
  };

  const showSidebar = participants.length > 6;
  const pinned = participants.find((p) => p.isPinned);

  if (layout === "grid" && !pinned) {
    return (
      <div className="w-full h-full p-4">
        <div
          className={cn(
            "grid gap-4 h-full",
            participants.length <= 2
              ? "grid-cols-1"
              : participants.length <= 4
              ? "grid-cols-2"
              : "grid-cols-3"
          )}
        >
          {participants.map((participant) => (
            <div key={participant.id} className="relative">
              <div className="relative rounded-lg overflow-hidden bg-neutral-800 h-full">
                <AspectRatio ratio={16 / 9}>
                  <div className="absolute inset-0  flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full  flex items-center justify-center">
                      {participant.id === "local" ? (
                        <LocalVideoTrack
                          track={participant.videoTrack}
                          play
                          style={{ width: "100%", height: "100%" }}
                        />
                      ) : (
                        <RemoteUser
                          user={remoteusers.find(
                            (u) => u.uid === participant.id
                          )}
                          playVideo
                          style={{ width: "100%", height: "100%" }}
                        />
                      )}
                    </div>
                  </div>
                </AspectRatio>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">
                      {participant.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-white/20"
                        onClick={() => handlePin(participant.id)}
                      >
                        <Pin
                          className={cn(
                            "h-4 w-4",
                            participant.isPinned
                              ? "text-blue-400"
                              : "text-white/70"
                          )}
                        />
                      </Button>
                      {participant.isMuted ? (
                        <MicOff className="h-4 w-4 text-red-500" />
                      ) : (
                        <Mic className="h-4 w-4 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Pinned view or other layouts
  return (
    <div className="flex h-full">
      <div className="flex-1">
        {pinned && (
          <div className="h-full p-4">
            <div className="relative rounded-lg overflow-hidden bg-neutral-800 h-full">
              <AspectRatio ratio={16 / 9}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center">
                    {pinned.id === "local" ? (
                      <LocalVideoTrack
                        track={pinned.videoTrack}
                        play
                        style={{ width: "100%", height: "100%" }}
                      />
                    ) : (
                      <RemoteUser
                        user={remoteusers.find((u) => u.uid === pinned.id)}
                        playVideo
                        style={{ width: "100%", height: "100%" }}
                      />
                    )}
                  </div>
                </div>
              </AspectRatio>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <div className="flex items-center justify-between">
                  <span className="text-white">{pinned.name}</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full hover:bg-white/20"
                      onClick={() => handlePin(pinned.id)}
                    >
                      <Pin className="h-5 w-5 text-blue-400" />
                    </Button>
                    {pinned.isMuted ? (
                      <MicOff className="h-5 w-5 text-red-500" />
                    ) : (
                      <Mic className="h-5 w-5 text-white" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showSidebar && (
        <div className="w-80 bg-neutral-900 p-4 space-y-4 overflow-y-auto">
          {participants
            .filter((p) => !p.isPinned)
            .map((participant) => (
              <div
                key={participant.id}
                className="relative rounded-lg overflow-hidden bg-neutral-800"
              >
                <AspectRatio ratio={16 / 9}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      {participant.id === "local" ? (
                        <LocalVideoTrack
                          track={participant.videoTrack}
                          play
                          style={{ width: "100%", height: "100%" }}
                        />
                      ) : (
                        <RemoteUser
                          user={remoteusers.find(
                            (u) => u.uid === participant.id
                          )}
                          playVideo
                          style={{ width: "100%", height: "100%" }}
                        />
                      )}
                    </div>
                  </div>
                </AspectRatio>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">
                      {participant.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full hover:bg-white/20"
                        onClick={() => handlePin(participant.id)}
                      >
                        <Pin className="h-3 w-3 text-white/70" />
                      </Button>
                      {participant.isMuted ? (
                        <MicOff className="h-3 w-3 text-red-500" />
                      ) : (
                        <Mic className="h-3 w-3 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
