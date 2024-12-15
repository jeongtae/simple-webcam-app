(async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const device = devices.find(({ label }) => label.includes("iPhone") && label.includes("카메라"));
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      deviceId: device?.deviceId,
    },
  });
  const video = Object.assign(document.createElement("video"), {
    autoplay: true,
    srcObject: stream,
  });
  document.body.appendChild(video);
})();
