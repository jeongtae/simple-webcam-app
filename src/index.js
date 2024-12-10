(async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  const video = Object.assign(document.createElement("video"), {
    autoplay: true,
    srcObject: stream,
  });
  document.body.appendChild(video);
})();
