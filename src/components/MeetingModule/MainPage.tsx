"use client";
import AgoraRTC, {
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-react";
import { useEffect, useState } from "react";
import { useTrackStore } from "@/store/useTrackStore";
import PreMeeting from "@/components/MeetingModule/PreMeeting/PreMeeting";
import React from "react";
import Meeting from "./Meeting/Meeting";

const MainPage = () => {
  const {
    joined,
    isAudioEnabled,
    isVideoEnabled,
    localCameraTrack,
    localMicrophoneTrack,
  } = useTrackStore();
  const setTracks = useTrackStore((state) => state.setTracks);
  const setLoading = useTrackStore((state) => state.setLoading);
  const selectedDeviceIds = useTrackStore((state) => state.selectedDeviceIds);
  const [tracks, setLocalTracks] = useState<{
    camera: ICameraVideoTrack | null;
    microphone: IMicrophoneAudioTrack | null;
  }>({ camera: null, microphone: null });

  useEffect(() => {
    setLoading(false);
    const setCameraError = useTrackStore.getState().setCameraError;
    const setMicrophoneError = useTrackStore.getState().setMicrophoneError;

    const createCameraTrack = async () => {
      try {
        const cameraTrack = await AgoraRTC.createCameraVideoTrack({
          encoderConfig: "1080p",
          ...(selectedDeviceIds.cameraId !== "default" && {
            cameraId: selectedDeviceIds.cameraId,
          }),
        });
        return cameraTrack;
      } catch (error) {
        setCameraError(error.message);
        return null;
      }
    };

    const createMicrophoneTrack = async () => {
      try {
        const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack({
          microphoneId: selectedDeviceIds.microphoneId,
        });
        return microphoneTrack;
      } catch (error) {
        setMicrophoneError(error.message);
        return null;
      }
    };

    const initializeTracks = async () => {
      if (localCameraTrack) {
        localCameraTrack.close();
      }
      if (localMicrophoneTrack) {
        localMicrophoneTrack.close();
      }
      const cameraTrack = await createCameraTrack();
      const microphoneTrack = await createMicrophoneTrack();
      if (cameraTrack && microphoneTrack) {
        setLocalTracks({ camera: cameraTrack, microphone: microphoneTrack });
        setTracks(cameraTrack, microphoneTrack);
      }
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
  }, [selectedDeviceIds, isVideoEnabled, isAudioEnabled]);

  return <>{!joined ? <PreMeeting /> : <Meeting />}</>;
};

export default MainPage;
