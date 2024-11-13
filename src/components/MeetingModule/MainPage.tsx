"use client";
import AgoraRTC, {
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  useJoin,
  usePublish,
} from "agora-rtc-react";
import { useEffect, useState } from "react";
import { useTrackStore } from "@/store/useTrackStore";
import PreMeeting from "@/components/MeetingModule/PreMeeting/PreMeeting";
import React from "react";
import Meeting from "./Meeting/Meeting";

const MainPage = () => {
  const { joined } = useTrackStore();
  const setTracks = useTrackStore((state) => state.setTracks);
  const selectedDeviceIds = useTrackStore((state) => state.selectedDeviceIds);
  const [tracks, setLocalTracks] = useState<{
    camera: ICameraVideoTrack | null;
    microphone: IMicrophoneAudioTrack | null;
  }>({ camera: null, microphone: null });

  useEffect(() => {
    const initializeTracks = () => {
      // Initialize camera with selected device
      AgoraRTC.createCameraVideoTrack({
        encoderConfig: "1080p",
        ...(selectedDeviceIds.cameraId !== "default" && {
          cameraId: selectedDeviceIds.cameraId,
        }),
      }).then((cameraTrack) => {
        // Initialize microphone with selected device
        AgoraRTC.createMicrophoneAudioTrack({
          microphoneId: selectedDeviceIds.microphoneId,
        }).then((microphoneTrack) => {
          setLocalTracks({ camera: cameraTrack, microphone: microphoneTrack });
          setTracks(cameraTrack, microphoneTrack);
        });
      });
    };

    // Wait for window to fully load
    if (document.readyState === "complete") {
      setTimeout(initializeTracks, 1000);
    } else {
      window.addEventListener("load", () => setTimeout(initializeTracks, 1000));
    }

    return () => {
      tracks.camera?.close();
      tracks.microphone?.close();
    };
  }, [selectedDeviceIds]);

  return <>{!joined ? <PreMeeting /> : <Meeting />}</>;
};

export default MainPage;
