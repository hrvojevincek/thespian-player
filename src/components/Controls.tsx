import React, { useCallback, useEffect, useState } from "react";

interface ControlsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

const Controls = ({ videoRef }: ControlsProps) => {
  const [volumOfVideo, setVolumOfVideo] = useState(100);
  const [durationOfVideo, setDurationOfVideo] = useState(0);
  const [currentDurationOfVideo, setCurrentDurationOfVideo] = useState(0);
  const [fontSize, setFontSize] = useState(20);
  const [fontFamily, setFontFamily] = useState("Arial, sans-serif");

  useEffect(() => {
    // Create or update the style element for video cue font size and family
    let style = document.getElementById("video-cue-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "video-cue-style";
      document.head.appendChild(style);
    }
    style.innerHTML = `
      video::cue {
        font-family: ${fontFamily};
        font-size: ${fontSize}px;
      }
    `;
  }, [fontSize, fontFamily]);

  const changeFontSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontSize(parseInt(e.target.value));
  };

  const changeFontFamily = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontFamily(e.target.value);
  };

  const getDurationOfVideo = useCallback(() => {
    const videoIntervalTime = setInterval(() => {
      if (videoRef.current) {
        setCurrentDurationOfVideo(videoRef.current.currentTime);
        if (videoRef.current.currentTime >= durationOfVideo) {
          clearInterval(videoIntervalTime);
        }
      }
    }, 1000);

    return () => clearInterval(videoIntervalTime);
  }, [videoRef, durationOfVideo]);

  const volumebar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valumValue = parseFloat(e.target.value) / 100;
    setVolumOfVideo(parseFloat(e.target.value));
    if (videoRef.current) {
      videoRef.current.volume = valumValue;
    }
  };

  const videoPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setDurationOfVideo(videoRef.current.duration);
      getDurationOfVideo();
    }
  };

  const videoStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const videoReplay = () => {
    if (videoRef.current) {
      setDurationOfVideo(videoRef.current.duration);
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      getDurationOfVideo();
    }
  };

  const videoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  const videoUnMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
    }
  };

  const setVideoSpeed = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = parseFloat(e.target.value);
    }
  };

  const videoDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCurrentDurationOfVideo(value);
    if (videoRef.current) {
      videoRef.current.currentTime = value;
    }
  };

  return (
    <div className="h-2 ">
      <input
        className="custom-range"
        type="range"
        min="0"
        max={durationOfVideo}
        value={currentDurationOfVideo}
        onChange={videoDuration}
      />
      <div className="border flex items-center gap-2 text-sm justify-between p-2">
        <button className="button" onClick={videoPlay}>
          play
        </button>
        <button className="button" onClick={videoStop}>
          stop
        </button>
        <button className="button" onClick={videoReplay}>
          replay
        </button>
        <select onChange={setVideoSpeed} className="button">
          <option value={1.0}>normal speed</option>
          <option value={0.5}>slower</option>
          <option value={2.0}>faster speed</option>
        </select>

        <select onChange={changeFontSize} className="button">
          <option value="16">font small</option>
          <option value="20">font medium</option>
          <option value="24">font large</option>
          <option value="28">font xl</option>
        </select>
        <select onChange={changeFontFamily} className="button">
          <option value="Arial, sans-serif">Arial</option>
          <option value="'Times New Roman', serif">Times New Roman</option>
          <option value="'Courier New', monospace">Courier New</option>
          <option value="Georgia, serif">Georgia</option>
        </select>

        <button className="button" onClick={videoMute}>
          mute
        </button>

        <button className="button" onClick={videoUnMute}>
          unmute
        </button>
        <div className="w-52">
          <input
            className="custom-range w-52"
            type="range"
            min="0"
            max="100"
            step="10"
            value={volumOfVideo}
            onChange={volumebar}
          />
        </div>
      </div>
    </div>
  );
};

export default Controls;
