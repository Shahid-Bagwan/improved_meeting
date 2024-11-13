import { Sidebar } from "./Sidebar";
import React, { useState } from "react";
import { Controls } from "./Controls";
import { LayoutSelector } from "./LayoutSelector";
import { MeetHeader } from "./MeetHeader";
import { ParticipantGrid } from "./ParticipantGrid";
import { useJoin, usePublish } from "agora-rtc-react";

const Meeting = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLayoutSelectorOpen, setIsLayoutSelectorOpen] = useState(false);
  const [currentLayout, setCurrentLayout] = useState("grid");

  const handleLayoutChange = (layoutId: string) => {
    setCurrentLayout(layoutId);
    // Additional layout change logic will be implemented here
  };

  usePublish([tracks.microphone, tracks.camera]);
  useJoin(
    {
      appid: "bb1b240334ea4a29b6a6b535ab3c24d6",
      channel: "main",
      token:
        "007eJxTYLC9sUZIf2PytPppHzXN1IOv5+369aFOu5BX/ERa6u7zZ1cpMCQlGSYZmRgYG5ukJpokGlkmmSWaJZkamyYmGScbmaSYsfwxSG8IZGTQVPjAwsgAgSA+C0NuYmYeAwMAZ1AfgA==",
    },
    joined
  );
  return (
    <main className="min-h-screen bg-black">
      <MeetHeader />
      <div className="pt-16 pb-20 h-[calc(100vh-36px)] overflow-y-auto">
        <ParticipantGrid layout={currentLayout} />
      </div>
      <Controls onOpenLayoutSelector={() => setIsLayoutSelectorOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <LayoutSelector
        isOpen={isLayoutSelectorOpen}
        onClose={() => setIsLayoutSelectorOpen(false)}
        onSelectLayout={handleLayoutChange}
        currentLayout={currentLayout}
      />
    </main>
  );
};

export default Meeting;
