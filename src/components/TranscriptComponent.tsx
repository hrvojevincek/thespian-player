import React, { useEffect, useState } from "react";
import { Caption, convertTimeToSeconds } from "../utils/parserSRT";

interface TimescriptProps {
  transcriptRef: React.RefObject<HTMLDivElement>;
  captions: Caption[];
  subtitlesRef: React.RefObject<HTMLTrackElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
}

const TranscriptComponent = ({
  transcriptRef,
  captions,
  videoRef,
  subtitlesRef,
}: TimescriptProps) => {
  const [currentSubtitle, setCurrentSubtitle] = useState<string>("");

  function handleCaptionClick(startTime: string) {
    if (videoRef.current) {
      const timeInSeconds = convertTimeToSeconds(startTime);
      videoRef.current.currentTime = timeInSeconds;
    }
  }

  useEffect(() => {
    const video = videoRef.current;
    const track = subtitlesRef.current?.track;

    if (video && track) {
      const handleCueChange = () => {
        const activeCues = track.activeCues;
        if (activeCues && activeCues.length > 0) {
          setCurrentSubtitle((activeCues[0] as VTTCue).text);
        } else {
          setCurrentSubtitle("");
        }
      };

      track.addEventListener("cuechange", handleCueChange);
      // Ensure the track is enabled
      track.mode = "showing";
      return () => {
        track.removeEventListener("cuechange", handleCueChange);
      };
    }
  }, []);

  useEffect(() => {
    if (transcriptRef.current) {
      const currentSubtitleElement =
        transcriptRef.current.querySelector(".current-subtitle");
      if (currentSubtitleElement) {
        currentSubtitleElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [currentSubtitle]);

  return (
    <div
      ref={transcriptRef}
      className="border-black border-2 p-2 w-1/3 h-full overflow-y-auto"
    >
      <h1 className="text-xl font-bold mb-4 sticky top-0 bg-white p-2">
        TRANSCRIPT:
      </h1>
      {captions.map((block) => (
        <div
          onClick={() => handleCaptionClick(block.startSeconds)}
          key={block.id}
          className={`p-2 rounded-xl cursor-pointer mb-2 transition-colors duration-200 ${
            currentSubtitle === block.text
              ? "bg-black text-white current-subtitle"
              : "hover:bg-slate-200"
          }`}
        >
          <p
            className={`text-xs ${
              currentSubtitle === block.text ? "text-gray-300" : "text-gray-500"
            }`}
          >
            {block.endSeconds}
          </p>
          <p className="break-words">{block.text}</p>
        </div>
      ))}
    </div>
  );
};

export default TranscriptComponent;
