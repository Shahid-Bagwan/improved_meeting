import { Button } from "@/components/ui/button";
import { Camera, Mic, MoreVertical, Users } from "lucide-react";
import Image from "next/image";

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
  return (
    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
      {isVideoOff ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Users className="w-20 h-20 text-muted-foreground" />
        </div>
      ) : (
        <Image
          src="/placeholder.svg"
          alt="Video preview"
          fill
          className="object-cover"
        />
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/10 hover:bg-white/20 text-white"
            onClick={onToggleMute}
          >
            <Mic className={isMuted ? "text-red-500" : ""} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/10 hover:bg-white/20 text-white"
            onClick={onToggleVideo}
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
