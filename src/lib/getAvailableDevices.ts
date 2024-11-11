import AgoraRTC from "agora-rtc-react";

async function getAvailableDevices() {
  try {
    // Fetch all available media devices
    const devices = await AgoraRTC.getDevices();

    // Filter devices by type
    const microphones = devices.filter(
      (device) => device.kind === "audioinput"
    );
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const speakers = devices.filter((device) => device.kind === "audiooutput");
    console.log("Available devices:", { microphones, cameras, speakers });
    return { microphones, cameras, speakers };
  } catch (error) {
    console.error("Error fetching devices:", error);
    return { microphones: [], cameras: [], speakers: [] };
  }
}

export default getAvailableDevices;
