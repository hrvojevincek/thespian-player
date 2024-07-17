import React, { useState, useCallback } from "react";
import Controls from "./Controls";

interface VideoPlayerProps {
  videoSrc: string;
  captionsSrc: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  subtitlesRef: React.RefObject<HTMLTrackElement>;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc,
  captionsSrc,
  videoRef,
  subtitlesRef,
}) => {
  return (
    <div className="border-2 border-black p-2">
      <video ref={videoRef} src={videoSrc} className="w-full">
        <track
          ref={subtitlesRef}
          label="English"
          kind="subtitles"
          srcLang="en"
          src={captionsSrc}
          default
        />
      </video>
      <Controls videoRef={videoRef} />
    </div>
  );
};

export default VideoPlayer;
