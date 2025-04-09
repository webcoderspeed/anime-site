export interface Episode {
  headers: Headers;
  intro: Intro;
  outro: Intro;
  sources: WatchDataSources[];
  subtitles: Subtitle[];
}

export interface WatchDataSources {
  url: string;
  isM3U8: boolean;
  type: string;
}

export interface Subtitle {
  url: string;
  lang: string;
}

export interface Intro {
  start: number;
  end: number;
}

export interface Headers {
  Referer: string;
}