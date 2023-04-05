import { Photos } from "unsplash-js/dist/methods/search/types/response";

type Post = {
  topic: string;
  title: string;
  description: string;
  images: Image[];
};

type Image = {
  title: string;
  content: string;
  alt: string;
  candidatePhotos?: Photos;
  selectedPhotoIndex: number;
  captions: string[];
};

export type { Post, Image };
