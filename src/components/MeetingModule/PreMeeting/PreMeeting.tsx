"use client";

import { useState } from "react";
import { Header } from "./Header";
import { VideoPreview } from "./VideoPreview";
import { SettingsControls } from "./SettingsControls";
import { EffectsDialog } from "./EffectsDialog";

const JoinButton = () => (
  <button
    className="w-full md:w-auto px-8 py-3 text-lg font-semibold text-white bg-primary hover:bg-primary/90 rounded-full transition-colors"
    onClick={() => console.log("Join meeting")}
  >
    Join now
  </button>
);

export default function PreMeeting() {
  const [isEffectsOpen, setIsEffectsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-5xl px-4 py-8">
        <div className="md:flex md:space-x-8 space-y-8 md:space-y-0">
          <div className="flex-1 space-y-8">
            <VideoPreview
              isVideoOff={isVideoOff}
              isMuted={isMuted}
              onToggleVideo={() => setIsVideoOff(!isVideoOff)}
              onToggleMute={() => setIsMuted(!isMuted)}
              onOpenEffects={() => setIsEffectsOpen(true)}
            />
            <SettingsControls />
          </div>
          <div className="md:flex md:items-start md:pt-4">
            <JoinButton />
          </div>
        </div>
      </main>
      <EffectsDialog
        isOpen={isEffectsOpen}
        onClose={() => setIsEffectsOpen(false)}
      />
    </div>
  );
}
