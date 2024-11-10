"use client";

import { useState } from "react";
import { Header } from "./Header";
import { VideoPreview } from "./VideoPreview";
import { SettingsControls } from "./SettingsControls";
import { EffectsDialog } from "./EffectsDialog";

export default function PreMeeting() {
  const [isEffectsOpen, setIsEffectsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-5xl px-4 py-8">
        <div className="space-y-8">
          <VideoPreview
            isVideoOff={isVideoOff}
            isMuted={isMuted}
            onToggleVideo={() => setIsVideoOff(!isVideoOff)}
            onToggleMute={() => setIsMuted(!isMuted)}
            onOpenEffects={() => setIsEffectsOpen(true)}
          />
          <SettingsControls />
        </div>
      </main>
      <EffectsDialog
        isOpen={isEffectsOpen}
        onClose={() => setIsEffectsOpen(false)}
      />
    </div>
  );
}
