"use client";

import { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { Mic, MicOff, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  IRemoteAudioTrack,
  IRemoteVideoTrack,
  LocalUser,
  useRemoteUsers,
} from "agora-rtc-react";
import { useTrackStore } from "@/store/useTrackStore";
import { RemoteUser } from "agora-rtc-react";

interface Participant {
  id: string | number;
  name: string;
  isMuted: boolean;
  isPinned: boolean;
  videoTrack: ICameraVideoTrack | IRemoteVideoTrack | null | undefined;
  audioTrack: IMicrophoneAudioTrack | IRemoteAudioTrack | null | undefined;
}

interface ParticipantGridProps {
  layout?: string;
}

export function ParticipantGrid({ layout }: ParticipantGridProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [pinned, setPinned] = useState<Participant | null>(null);
  // Get local tracks
  const {
    localCameraTrack,
    localMicrophoneTrack,
    isVideoEnabled,
    isAudioEnabled,
  } = useTrackStore();

  // Get remote users
  const remoteusers = useRemoteUsers();

  // Create participants array
  useEffect(() => {
    setParticipants([
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
    ]);
    setPinned(participants[0]);
  }, [localCameraTrack, localMicrophoneTrack, remoteusers]);

  // Handle pinning a participant
  const handlePin = (participantId: string | number) => {
    setParticipants((prevParticipants) =>
      prevParticipants.map((participant) => ({
        ...participant,
        isPinned: participant.id === participantId ? true : false,
      }))
    );
    const foundParticipant =
      participants?.find((p) => p.id === participantId) ?? null;
    setPinned(foundParticipant);
  };

  useEffect(() => {
    if (layout !== "grid") {
      setShowSidebar(true);
    } else {
      setShowSidebar(false);
    }
  }, [layout]);
  if (layout === "grid") {
    return (
      <div className="w-full h-full p-4">
        <div
          className={cn(
            "grid gap-4 h-full",
            participants.length <= 2
              ? " grid-cols-1 sm:grid-cols-2"
              : participants.length <= 4
              ? "grid-cols-2"
              : " grid-cols-1 sm:grid-cols-3"
          )}
        >
          {participants.map((participant) => (
            <div key={participant.id} className="relative">
              <div className="relative rounded-lg overflow-hidden bg-neutral-800 h-full">
                <AspectRatio ratio={16 / 9}>
                  <div className="absolute inset-0  flex items-center justify-center">
                    {participant.id === "local" ? (
                      <LocalUser
                        videoTrack={participant.videoTrack as ICameraVideoTrack}
                        audioTrack={
                          participant.audioTrack as IMicrophoneAudioTrack
                        }
                        cameraOn={!isVideoEnabled}
                        micOn={!isAudioEnabled}
                        playAudio={false}
                        cover={`https://ui-avatars.com/api/?name=${participant.id}`}
                      />
                    ) : (
                      <RemoteUser
                        user={remoteusers.find((u) => u.uid === participant.id)}
                        playVideo={!!participant.videoTrack}
                        playAudio={!!participant.audioTrack}
                        style={{ width: "100%", height: "100%" }}
                        cover={`https://ui-avatars.com/api/?name=${participant.id}`}
                      />
                    )}
                  </div>
                </AspectRatio>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent z-40">
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
  console.log("pinned", pinned);
  return (
    <div className="flex flex-col sm:flex-row h-full">
      <div className="flex-1">
        {
          <div className="h-full p-4">
            <div className="relative rounded-lg overflow-hidden bg-neutral-800 h-full">
              <AspectRatio ratio={16 / 9}>
                <div className="absolute inset-0 flex items-center justify-center">
                  {pinned?.id === "local" ? (
                    <LocalUser
                      videoTrack={pinned?.videoTrack as ICameraVideoTrack}
                      audioTrack={pinned?.audioTrack as IMicrophoneAudioTrack}
                      cameraOn={!isVideoEnabled}
                      micOn={!isAudioEnabled}
                      playAudio={false}
                      cover={`https://ui-avatars.com/api/?name=${pinned?.id}`}
                    />
                  ) : (
                    <RemoteUser
                      user={remoteusers.find((u) => u.uid === pinned?.id)}
                      playVideo={!!pinned?.videoTrack}
                      playAudio={!!pinned?.audioTrack}
                      style={{ width: "100%", height: "100%" }}
                      cover={`https://ui-avatars.com/api/?name=${pinned?.id}`}
                    />
                  )}
                </div>
              </AspectRatio>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent z-40">
                <div className="flex items-center justify-between">
                  <span className="text-white">{pinned?.name}</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full hover:bg-white/20 cursor-pointer z-30"
                      onClick={() => handlePin(pinned?.id as string)}
                    >
                      <Pin className="h-5 w-5 text-blue-400 " />
                    </Button>
                    {pinned?.isMuted ? (
                      <MicOff className="h-5 w-5 text-red-500" />
                    ) : (
                      <Mic className="h-5 w-5 text-white" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>

      {showSidebar && (
        <div className="w-full sm:w-80 bg-neutral-900 p-4 space-y-4 overflow-y-auto">
          {participants
            .filter((p) => !p.isPinned)
            .map((participant) => (
              <div
                key={participant.id}
                className="relative rounded-lg overflow-hidden bg-neutral-800"
              >
                <AspectRatio ratio={16 / 9}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {participant.id === "local" ? (
                      <LocalUser
                        videoTrack={participant.videoTrack as ICameraVideoTrack}
                        audioTrack={
                          participant.audioTrack as IMicrophoneAudioTrack
                        }
                        cameraOn={!isVideoEnabled}
                        micOn={!isAudioEnabled}
                        playAudio={false}
                        cover={`https://ui-avatars.com/api/?name=${participant.id}`}
                      />
                    ) : (
                      <RemoteUser
                        user={remoteusers.find((u) => u.uid === participant.id)}
                        playVideo={!!participant.videoTrack}
                        playAudio={!!participant.audioTrack}
                        style={{ width: "100%", height: "100%" }}
                        cover={`https://ui-avatars.com/api/?name=${participant.id}`}
                      />
                    )}
                  </div>
                </AspectRatio>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent z-40">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">
                      {participant.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full hover:bg-white/20 cursor-pointer z-30"
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
