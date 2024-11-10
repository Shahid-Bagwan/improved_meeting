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
  useJoin(
    {
      appid: "bb1b240334ea4a29b6a6b535ab3c24d6",
      channel: "main",
      token:
        "007eJxTYLC9sUZIf2PytPppHzXN1IOv5+369aFOu5BX/ERa6u7zZ1cpMCQlGSYZmRgYG5ukJpokGlkmmSWaJZkamyYmGScbmaSYsfwxSG8IZGTQVPjAwsgAgSA+C0NuYmYeAwMAZ1AfgA==",
    },
    joined
  );
  const { localCameraTrack, error, isLoading } = useLocalCameraTrack();
  const { localMicrophoneTrack } = useLocalMicrophoneTrack();
  console.log(localCameraTrack, localMicrophoneTrack, error, isLoading);
  usePublish([localMicrophoneTrack, localCameraTrack]);
  useEffect(() => {
    setTracks(localCameraTrack, localMicrophoneTrack);
  }, [localCameraTrack, localMicrophoneTrack, setTracks]);

  return (
    <>
      <PreMeeting />
    </>
  );
};

export default MainPage;
