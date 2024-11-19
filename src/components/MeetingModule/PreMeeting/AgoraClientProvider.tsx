"use client";
import React from "react";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";

export default function AgoraClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AgoraRTCProvider
      client={AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })}
    >
      {children}
    </AgoraRTCProvider>
  );
}
