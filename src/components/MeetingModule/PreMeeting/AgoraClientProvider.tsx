"use client";
import React from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

export default function AgoraClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  if (!client) {
    return null; // Or render a loading state if desired
  }

  return <>{children}</>;
}
