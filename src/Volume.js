import React, { useState, useEffect } from "react";
import SvgMuteUnmute from "./SvgMuteUnmute";

function Volume({ videoElement }) {
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);

  function handleMute() {
    videoElement.current.querySelector("#video-player").muted = true;

    setMuted(true);

    if (muted === true) {
      videoElement.current.querySelector("#video-player").muted = false;

      setMuted(false);
    } else {
      videoElement.current.querySelector("#video-player").muted = true;
      setMuted(true);
    }
  }

  function handleVolumeRange() {
    const volumeRange = videoElement.current.querySelector(".volume-range");
    videoElement.current.querySelector("#video-player").volume =
      volumeRange.value;

    setVolume(volumeRange.value);

    if (Number(volumeRange.value) === 0) {
      setMuted(true);
    } else {
      setMuted(false);
    }
  }

  useEffect(() => {
    handleVolumeRange();
  }, []);

  return (
    <React.Fragment>
      <button onClick={handleMute} className="mute-unmute-btn">
        <SvgMuteUnmute muted={muted} />
      </button>
      <input
        type="range"
        className="volume-range"
        onChange={handleVolumeRange}
        value={volume}
        step={0.1}
        min={0}
        max={1}
      />
    </React.Fragment>
  );
}

export default Volume;
