"use client";
import React from "react";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";

export default function AgoraClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let client = null;
  if (typeof window !== "undefined") {
    client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    console.log("client", client);
  }

  if (!client) {
    return null; // Or render a loading state if desired
  }

  return (
    <>
      <AgoraRTCProvider client={client}>{children}</AgoraRTCProvider>
    </>
  );
}
