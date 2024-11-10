"use client";
import React from "react";
import dynamic from "next/dynamic";
const AgoraClientProvider = dynamic(
  () => import("@/components/MeetingModule/PreMeeting/AgoraClientProvider"),
  { ssr: false }
);
const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AgoraClientProvider>{children}</AgoraClientProvider>
    </div>
  );
};

export default Layout;
