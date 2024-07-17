import React, { useEffect, useRef, useState } from "react";
import TranscriptComponent from "./components/TranscriptComponent";
import VideoPlayer from "./components/VideoPlayer";
import { Caption, parseSRT } from "./utils/parserSRT";
import { Video, videos } from "./utils/videos";
import List from "./components/List";

const App: React.FC = () => {
  const [captions, setCaptions] = useState<Caption[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const subtitlesRef = useRef<HTMLTrackElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video>(videos[0]);

  useEffect(() => {
    fetch(selectedVideo.srtSrc)
      .then((response) => response.text())
      .then((data) => {
        const parsedCaptions = parseSRT(data);
        setCaptions(parsedCaptions);
      });
  }, [selectedVideo]);

  const handleVideoChange = (video: Video) => {
    setSelectedVideo(video);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="flex gap-5 p-10 h-screen">
      <List
        videos={videos}
        selectedVideo={selectedVideo}
        handleVideoChange={handleVideoChange}
      />

      <VideoPlayer
        videoSrc={selectedVideo.videoSrc}
        captionsSrc={selectedVideo.captionsSrc}
        videoRef={videoRef}
        subtitlesRef={subtitlesRef}
      />

      <TranscriptComponent
        transcriptRef={transcriptRef}
        captions={captions}
        subtitlesRef={subtitlesRef}
        videoRef={videoRef}
      />
    </div>
  );
};

export default App;
