import React, { useState, useEffect } from "react";
import utils from "./utils";
import SvgPlayPause from "./SvgPlayPause";

function ControlBar({ videoElement, children }) {
  const [paused, setPaused] = useState(false);
  const [length, setLength] = useState(null);
  const [formattedLength, setFormattedLength] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [formattedTime, setFormattedTime] = useState(null);
  function handlePlay() {
    duration();
    const videoPlayerElement = videoElement.current.querySelector(
      "#video-player"
    );

    setPaused(!paused);

    if (paused === true) {
      videoPlayerElement.play();
      setPaused(false);
    } else {
      videoPlayerElement.pause();
      setPaused(true);
    }
  }

  function duration() {
    let dur = videoElement.current.querySelector("#video-player").duration;
    dur = dur.toFixed();
    let formattedLength = utils.toHHMMSS(dur);

    setLength(dur);
    setFormattedLength(formattedLength);

    return dur;
  }

  function getCurrentTime() {
    let cur = videoElement.current.querySelector("#video-player").currentTime;

    cur = cur.toFixed();
    let formattedTime = utils.toHHMMSS(cur);

    setCurrentTime(cur);
    setFormattedTime(formattedTime);

    if (parseInt(currentTime) === parseInt(length)) {
      setPaused(true);
    }

    return cur;
  }

  function handleTimeRange() {
    const timeRange = videoElement.current.querySelector(".time-range");
    videoElement.current.querySelector("#video-player").currentTime =
      timeRange.value;
    setCurrentTime(timeRange.value);
  }

  useEffect(() => {
    setInterval(() => setCurrentTime(getCurrentTime()), 10);

    setInterval(() => setLength(duration()), 10);
  }, []);

  return (
    <div className="controls">
      <button onClick={handlePlay} className="play-pause-btn">
        <SvgPlayPause paused={paused} />
      </button>

      <span className="time">
        <span className="video-time">{formattedTime}</span>
        <span> / </span>
        <span className="video-length">{formattedLength}</span>
      </span>

      <input
        type="range"
        className="time-range"
        onChange={handleTimeRange}
        value={currentTime}
        min={0}
        max={length}
      />

      {children}
    </div>
  );
}

export default ControlBar;
