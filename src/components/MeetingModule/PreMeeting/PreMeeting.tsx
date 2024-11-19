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
  const loading = useTrackStore((state) => state.loading);
  return (
    <div className="flex justify-center items-center align-middle flex-col sm:px-14 ">
      <div className="w-full xl:max-w-[1480px] ">
        <Header />
        <main className="container max-w-[73rem] px-4 py-8">
          <div className="w-full md:flex md:space-x-8 space-y-8 md:space-y-0">
            <div className="sm:w-[75%] flex-1  space-y-8">
              <VideoPreview onOpenEffects={() => setIsEffectsOpen(true)} />
              <SettingsControls />
            </div>
            <div className="sm:w-[30%] md:flex md:items-start md:pt-4">
              <div className="w-full flex flex-col justify-center items-center">
                <h2 className="text-2xl my-5 font-semibold text-black">
                  Ready to join?
                </h2>

                <button
                  className="w-full md:w-auto px-8 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-900 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setJoined(true)}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    "Join now"
                  )}
                </button>
              </div>
            </div>
          </div>
        </main>
        <EffectsDialog
          isOpen={isEffectsOpen}
          onClose={() => setIsEffectsOpen(false)}
        />
      </div>
    </div>
  );
}
