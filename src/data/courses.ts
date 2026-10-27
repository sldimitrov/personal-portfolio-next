import { YOUTUBE_CHANNEL_URL } from "@/lib/site";

export interface Course {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  language?: string;
  topics: string[];
  playlistUrl: string;
  channelUrl: string;
  /** YouTube video ID of the lesson shown in the embed, e.g. "dQw4w9WgXcQ". */
  featuredVideoId: string;
  featuredVideoTitle: string;
  lessonCount?: number;
}

export const COURSES: Course[] = [
  {
    id: "python-basics",
    title: "Python Basics",
    description:
      "A free video series for complete beginners, taught in Bulgarian. It starts from installing Python and writing a first program, then takes one core idea per lesson and builds it up in code - so you finish knowing how to write small Python programs on your own.",
    level: "Beginner",
    language: "Bulgarian",
    topics: ["Variables", "Data types", "Conditionals", "Loops", "Functions"],
    playlistUrl: "https://www.youtube.com/playlist?list=PLEtOG7alWafc",
    channelUrl: YOUTUBE_CHANNEL_URL,
    featuredVideoId: "iIDCMH4cnrA",
    featuredVideoTitle: "Урок 1 - Въведение в Python: Инсталация и първа програма",
  },
];
