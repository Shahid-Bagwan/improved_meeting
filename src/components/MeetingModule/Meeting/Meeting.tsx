import { Sidebar } from "./Sidebar";
import React, { useState } from "react";
import { Controls } from "./Controls";
import { LayoutSelector } from "./LayoutSelector";
import { MeetHeader } from "./MeetHeader";
import { ParticipantGrid } from "./ParticipantGrid";
import { useJoin, usePublish } from "agora-rtc-react";
import { useTrackStore } from "@/store/useTrackStore";

const Meeting = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLayoutSelectorOpen, setIsLayoutSelectorOpen] = useState(false);
  const [currentLayout, setCurrentLayout] = useState("grid");
  const [sidebarContent, setSidebarContent] = useState<"chat" | "people">(
    "chat"
  );

  const handleLayoutChange = (layoutId: string) => {
    setCurrentLayout(layoutId);
    setIsLayoutSelectorOpen(false);
  };

  const handleOpenPeople = () => {
    setSidebarContent("people");
    setIsSidebarOpen(true);
  };

  const handleOpenChat = () => {
    setSidebarContent("chat");
    setIsSidebarOpen(true);
  };

  const { localCameraTrack, localMicrophoneTrack, joined } = useTrackStore();
  usePublish([localCameraTrack, localMicrophoneTrack]);
  useJoin(
    {
      appid: "bb1b240334ea4a29b6a6b535ab3c24d6",
      channel: "main",
      token:
        "007eJxTYLB8+HHPRsc5iREsf89Olis83TclfX7ofs73F96bmGvdenhRgSEpyTDJyMTA2NgkNdEk0cgyySzRLMnU2DQxyTjZyCTFrMrRJr0hkJHBInExEyMDBIL4LAy5iZl5DAwA7a8g3w==",
    },
    joined
  );
  return (
    <main className="min-h-screen bg-black">
      <MeetHeader />
      <div className="pt-16 pb-20  overflow-y-auto">
        <ParticipantGrid layout={currentLayout} />
      </div>
      <Controls
        onOpenLayoutSelector={handleLayoutChange}
        onOpenPeople={handleOpenPeople}
        onOpenChat={handleOpenChat}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        content={sidebarContent}
      />
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
