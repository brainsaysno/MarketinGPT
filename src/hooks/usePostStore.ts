import { Post } from "@/types/Carousel";
import produce from "immer";
import { Photos } from "unsplash-js/dist/methods/search/types/response";
import { create } from "zustand";

type PostActions = {
  setPost: (post: Post) => void;
};

type ImageActions = {
  setCandidatePhotos: (index: number, photos: Photos) => void;
  setSelectedPhotoIndex: (index: number, selectedPhotoIndex: number) => void;
  setImageTitle: (index: number, title: string) => void;
  setImageContent: (index: number, content: string) => void;
  setImageAlt: (index: number, alt: string) => void;
  setImageCaptions: (index: number, captions: string[]) => void;
};

export const usePostStore = create<(Post & PostActions) & ImageActions>(
  (set) => ({
    title: "",
    topic: "",
    description: "",
    images: [],

    setPost: (post: Post) => set(post),
    setCandidatePhotos: (index: number, photos: Photos) =>
      set(
        produce((state: Post) => {
          state.images[index].candidatePhotos = photos;
        })
      ),
    setSelectedPhotoIndex: (index: number, selectedPhotoIndex: number) =>
      set(
        produce((state: Post) => {
          state.images[index].selectedPhotoIndex = selectedPhotoIndex;
        })
      ),
    setImageTitle: (index: number, title: string) =>
      set(
        produce((state: Post) => {
          state.images[index].title = title;
        })
      ),
    setImageContent: (index: number, content: string) =>
      set(
        produce((state: Post) => {
          state.images[index].content = content;
        })
      ),
    setImageAlt: (index: number, alt: string) =>
      set(
        produce((state: Post) => {
          state.images[index].alt = alt;
        })
      ),
    setImageCaptions: (index: number, captions: string[]) =>
      set(
        produce((state: Post) => {
          state.images[index].captions = captions;
        })
      ),
  })
);
