export interface Video {
  id: string;
  title: string;
  videoSrc: string;
  captionsSrc: string;
  srtSrc: string;
}

export const videos: Video[] = [
  {
    id: "video_1",
    title: "Video 1",
    videoSrc: "videos/video_1/clip.mp4",
    captionsSrc: "videos/video_1/captions.vtt",
    srtSrc: "videos/video_1/captions.srt",
  },
  {
    id: "video_2",
    title: "Video 2",
    videoSrc: "videos/video_2/clip.mp4",
    captionsSrc: "videos/video_2/captions.vtt",
    srtSrc: "videos/video_2/captions.srt",
  },
];
