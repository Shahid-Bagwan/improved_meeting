"use client";
import React, { useRef } from "react";
import AgoraRTC, { AgoraRTCProvider, IAgoraRTCClient } from "agora-rtc-react";

export default function AgoraClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = useRef<IAgoraRTCClient>(null);

  if (typeof window !== "undefined" && !client.current) {
    // @ts-expect-error client.current is null
    client.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    console.log("client initialized", client.current);
  }

  if (!client.current) {
    return null; // Or render a loading state if desired
  }

  return (
    <AgoraRTCProvider client={client.current}>{children}</AgoraRTCProvider>
  );
}
