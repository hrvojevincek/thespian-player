import SrtParser2 from "srt-parser-2";
import moment from "moment";

export interface Caption {
  id: number;
  startSeconds: string;
  endSeconds: string;
  text: string;
}

export function parseSRT(srtContent: string): Caption[] {
  const parser = new SrtParser2();
  const parsed = parser.fromSrt(srtContent);

  return parsed.map((item) => ({
    id: parseInt(item.id),
    startSeconds: item.startTime,
    endSeconds: item.endTime,
    text: item.text,
  }));
}

interface ParsedSubtitle {
  id: number;
  time: string;
  text: string;
}

export function parseSrt(srtContent: string): ParsedSubtitle[] {
  const subtitles: ParsedSubtitle[] = [];
  const subtitleBlocks = srtContent.trim().split("\n\n");

  for (const block of subtitleBlocks) {
    const lines = block.split("\n");
    if (lines.length < 3) continue; // Skip invalid blocks

    const id = parseInt(lines[0]);
    const timeString = lines[1].split(" --> ")[0]; // Get start time
    const time = timeString.replace(",", "."); // Replace comma with dot for consistency
    const text = lines.slice(2).join(" ").replace(/\n/g, " ").trim(); // Join all text lines

    subtitles.push({ id, time, text });
  }

  return subtitles;
}

export function convertTimeToSeconds(timeString: string): number {
  const [hours, minutes, secondsAndMs] = timeString.split(":");
  const [seconds, ms] = secondsAndMs.split(",");
  return (
    parseInt(hours) * 3600 +
    parseInt(minutes) * 60 +
    parseInt(seconds) +
    parseInt(ms) / 1000
  );
}
