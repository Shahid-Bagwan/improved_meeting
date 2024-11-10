import dynamic from "next/dynamic";
import React from "react";
const MainPage = dynamic(() => import("@/components/MeetingModule/MainPage"), {
  ssr: false,
});
const page = () => {
  return <MainPage />;
};

export default page;
