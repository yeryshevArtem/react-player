import React, { useRef } from "react";
import Volume from "./Volume";
import ControlBar from "./ControlBar";
import "./reactPlayer.css";

function ReactPlayer({ src }) {
  const videoPlayer = useRef(null);

  return (
    <div className="video-player-wrapper" ref={videoPlayer}>
      <video id="video-player" width="500" height="auto" muted autoPlay>
        <source src={src} type="video/mp4" />
      </video>

      <ControlBar videoElement={videoPlayer}>
        <Volume videoElement={videoPlayer} />
      </ControlBar>
    </div>
  );
}

export default ReactPlayer;
