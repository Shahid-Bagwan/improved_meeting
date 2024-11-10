"use client";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AgoraRTCProvider client={client}>{children}</AgoraRTCProvider>
    </div>
  );
};

export default Layout;
