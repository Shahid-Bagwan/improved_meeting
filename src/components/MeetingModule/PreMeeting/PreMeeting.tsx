"use client";

import { useState } from "react";
import { useTrackStore } from "@/store/useTrackStore";
import { Header } from "./Header";
import { VideoPreview } from "./VideoPreview";
import { SettingsControls } from "./SettingsControls";
import { EffectsDialog } from "./EffectsDialog";

export default function PreMeeting() {
  const [isEffectsOpen, setIsEffectsOpen] = useState(false);
  const setJoined = useTrackStore((state) => state.setJoined);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-5xl px-4 py-8">
        <div className="md:flex md:space-x-8 space-y-8 md:space-y-0">
          <div className="flex-1 space-y-8">
            <VideoPreview onOpenEffects={() => setIsEffectsOpen(true)} />
            <SettingsControls />
          </div>
          <div className="md:flex md:items-start md:pt-4">
            <button
              className="w-full md:w-auto px-8 py-3 text-lg font-semibold text-white bg-primary hover:bg-primary/90 rounded-full transition-colors"
              onClick={() => setJoined(true)}
            >
              Join now
            </button>
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
