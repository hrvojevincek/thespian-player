import React from "react";
import { Video } from "../utils/videos"; // Assuming videos data is in videos.ts

interface ListProps {
  videos: Video[];
  selectedVideo: Video;
  handleVideoChange: (video: Video) => void;
}

const List = ({ videos, selectedVideo, handleVideoChange }: ListProps) => {
  return (
    <div className="flex flex-col items-center border-2 border-black p-2">
      <h1 className="text-xl font-bold mb-4 sticky top-0 bg-white p-2">
        LIST:
      </h1>
      <div className="gap-4 flex flex-col ">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => handleVideoChange(video)}
            className={`px-4 py-2 rounded-xl ${
              selectedVideo.id === video.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {video.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default List;
