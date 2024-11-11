"use client";
import {
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
} from "agora-rtc-react";
import { useEffect } from "react";
import { useTrackStore } from "@/store/useTrackStore";
import PreMeeting from "@/components/MeetingModule/PreMeeting/PreMeeting";
import React from "react";

const MainPage = () => {
  const { joined } = useTrackStore();

  const setTracks = useTrackStore((state) => state.setTracks);

  // const { localCameraTrack, error, isLoading } = useLocalCameraTrack(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack();

  // Add explicit error handling
  const { localCameraTrack, error, isLoading } = useLocalCameraTrack(true, {
    encoderConfig: "1080p", // Try with explicit config
  });

  console.log(
    "sdsds",
    localCameraTrack,
    localMicrophoneTrack,
    error,
    isLoading
  );
  useEffect(() => {
    if (localCameraTrack && localMicrophoneTrack) {
      setTracks(localCameraTrack, localMicrophoneTrack);
      console.log("hsdf", localCameraTrack, localMicrophoneTrack);
    }
  }, [localCameraTrack, localMicrophoneTrack, setTracks]);
  usePublish([localMicrophoneTrack, localCameraTrack]);
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
    <>
      <PreMeeting />
    </>
  );
};

export default MainPage;
