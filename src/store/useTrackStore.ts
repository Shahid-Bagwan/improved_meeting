import { create } from "zustand";
import { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-react";

interface TrackStore {
  localCameraTrack: ICameraVideoTrack | null;
  localMicrophoneTrack: IMicrophoneAudioTrack | null;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  joined: boolean;
  selectedDeviceIds: {
    microphoneId: string;
    speakerId: string;
    cameraId: string;
  };
  setTracks: (
    video?: ICameraVideoTrack | null,
    audio?: IMicrophoneAudioTrack | null
  ) => void;
  toggleVideo: () => void;
  toggleAudio: () => void;
  setJoined: (joined: boolean) => void;
  setSelectedDeviceIds: (
    deviceType: "microphoneId" | "speakerId" | "cameraId",
    deviceId: string
  ) => void;
}

export const useTrackStore = create<TrackStore>((set) => ({
  localCameraTrack: null,
  localMicrophoneTrack: null,
  isVideoEnabled: true,
  isAudioEnabled: true,
  joined: false,
  selectedDeviceIds: {
    microphoneId: "default",
    speakerId: "default",
    cameraId: "default",
  },
  setTracks: (video, audio) =>
    set((state) => ({
      localCameraTrack: video ?? state.localCameraTrack,
      localMicrophoneTrack: audio ?? state.localMicrophoneTrack,
    })),
  setJoined: (joined) => set({ joined }),
  toggleVideo: () =>
    set((state) => ({ isVideoEnabled: !state.isVideoEnabled })),
  toggleAudio: () =>
    set((state) => ({ isAudioEnabled: !state.isAudioEnabled })),
  setSelectedDeviceIds: (deviceType, deviceId) =>
    set((state) => ({
      selectedDeviceIds: {
        ...state.selectedDeviceIds,
        [deviceType]: deviceId,
      },
    })),
}));
