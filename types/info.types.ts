export interface AnimeInfo {
	id: string;
	title: string;
	malID: number;
	alID: number;
	japaneseTitle: string;
	image: string;
	releaseDate: string | null; // or null
	description: string | null; // or null
	type: string | null; // or null
	url: string;
  otherName: string | null; // or null
	recommendations: Recommendation[];
	relatedAnime: RelatedAnime[];
	subOrDub: 'sub' | 'dub' | 'both';
	hasSub: boolean;
	genres: string[];
	status: string;
	season: string;
	totalEpisodes: number;
	episodes: AnimeEpisode[];
}

export interface AnimeEpisode {
	id: string;
	number: number;
	title: string;
	isFiller: boolean;
	isSubbed: boolean;
	isDubbed: boolean;
	url: string;
}

export interface RelatedAnime {
  id: string;
  title: string;
  url: string;
  image: string;
  japaneseTitle: string;
  type: string;
  sub: number;
  dub: number;
  episodes: number;
}

export interface Recommendation {
  id: string;
  title: string;
  url: string;
  image: string;
  duration: string;
  watchList: string;
  japaneseTitle: string;
  type: string;
  nsfw: boolean;
  sub: number;
  dub: number;
  episodes: number;
}