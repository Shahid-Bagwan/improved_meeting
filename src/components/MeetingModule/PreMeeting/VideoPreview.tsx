import { Button } from "@/components/ui/button";
import { Camera, Mic, MoreVertical, Users } from "lucide-react";
import Image from "next/image";
import { LocalUser } from "agora-rtc-react";
import { useTrackStore } from "@/store/useTrackStore";

interface VideoPreviewProps {
  isVideoOff: boolean;
  isMuted: boolean;
  onToggleVideo: () => void;
  onToggleMute: () => void;
  onOpenEffects: () => void;
}

export function VideoPreview({
  isVideoOff,
  isMuted,
  onToggleVideo,
  onToggleMute,
  onOpenEffects,
}: VideoPreviewProps) {
  const {
    localCameraTrack,
    localMicrophoneTrack,
    isVideoEnabled,
    isAudioEnabled,
  } = useTrackStore();
  console.log(localCameraTrack, localMicrophoneTrack);
  const handleToggleVideo = () => {
    localCameraTrack?.setEnabled(!isVideoEnabled);
    useTrackStore.getState().toggleVideo();
    onToggleVideo();
  };

  const handleToggleMute = () => {
    localMicrophoneTrack?.setEnabled(!isAudioEnabled);
    useTrackStore.getState().toggleAudio();
    onToggleMute();
  };

  return (
    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
      <LocalUser
        videoTrack={localCameraTrack}
        audioTrack={localMicrophoneTrack}
        cameraOn={!isVideoOff}
      />
      {isVideoOff && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Users className="w-20 h-20 text-muted-foreground" />
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/10 hover:bg-white/20 text-white"
            onClick={handleToggleMute}
          >
            <Mic className={isMuted ? "text-red-500" : ""} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/10 hover:bg-white/20 text-white"
            onClick={handleToggleVideo}
          >
            <Camera className={isVideoOff ? "text-red-500" : ""} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/10 hover:bg-white/20 text-white"
            onClick={onOpenEffects}
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
