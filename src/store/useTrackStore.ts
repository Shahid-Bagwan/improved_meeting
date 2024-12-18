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
  token: string | null;
  channelName: string | null;
  fullName: string | null;
  loading: boolean;
  cameraError: string | null;
  microphoneError: string | null;
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
  setToken: (token: string) => void;
  setChannelName: (name: string) => void;
  setFullName: (name: string) => void;
  setLoading: (loading: boolean) => void;
  setCameraError: (error: string | null) => void;
  setMicrophoneError: (error: string | null) => void;
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
  token: null,
  channelName: null,
  fullName: null,
  loading: false,
  cameraError: null,
  microphoneError: null,
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
  setToken: (token) => set({ token }),
  setChannelName: (channelName) => set({ channelName }),
  setFullName: (fullName) => set({ fullName }),
  setLoading: (loading) => set({ loading }),
  setCameraError: (error) => set({ cameraError: error }),
  setMicrophoneError: (error) => set({ microphoneError: error }),
}));
