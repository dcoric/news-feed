export interface Article {
  url: string;
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export interface NewsApiResponse {
  articles: Article[];
}