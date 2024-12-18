import { Button } from "@/components/shadcnComponents/button";
import { Camera, Mic, MoreVertical, Users } from "lucide-react";
import { LocalUser } from "agora-rtc-react";
import { useTrackStore } from "@/store/useTrackStore";

interface VideoPreviewProps {
  onOpenEffects: () => void;
}

export function VideoPreview({ onOpenEffects }: VideoPreviewProps) {
  const {
    localCameraTrack,
    localMicrophoneTrack,
    isVideoEnabled,
    isAudioEnabled,
  } = useTrackStore();
  console.log("tosds");
  const handleToggleVideo = () => {
    console.log("toggle video");
    // void localCameraTrack?.close();
    useTrackStore.getState().toggleVideo();
    // onToggleVideo();
  };

  const handleToggleMute = () => {
    // void localMicrophoneTrack?.close();
    useTrackStore.getState().toggleAudio();
    // onToggleMute();
  };

  return (
    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
      <LocalUser
        videoTrack={localCameraTrack}
        audioTrack={localMicrophoneTrack}
        cameraOn={isVideoEnabled}
        micOn={isAudioEnabled}
        cover="https://gear5world.com/cdn/shop/articles/zoro_one_piece_onigashima.jpg?v=1699742560&width=1100"
      />
      {isVideoEnabled && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Users className="w-20 h-20 text-muted-foreground" />
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent z-50">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            onClick={() => handleToggleMute()}
          >
            <Mic className={isAudioEnabled ? "text-red-500" : ""} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            onClick={() => handleToggleVideo()}
          >
            <Camera className={isVideoEnabled ? "text-red-500" : ""} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            onClick={() => onOpenEffects()}
          >
            <Users />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <MoreVertical />
          </Button>
        </div>
      </div>
    </div>
  );
}
