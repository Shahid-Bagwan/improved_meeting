import dynamic from "next/dynamic";
import React from "react";
const MainPage = dynamic(() => import("@/components/MeetingModule/MainPage"), {
  ssr: false,
});
const AgoraClientProvider = dynamic(
  () => import("@/components/MeetingModule/PreMeeting/AgoraClientProvider"),
  { ssr: false }
);
const Page = () => {
  return (
    <AgoraClientProvider>
      <MainPage />
    </AgoraClientProvider>
  );
};

export default Page;
