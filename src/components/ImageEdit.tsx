import { usePostStore } from "@/hooks/usePostStore";
import { Image } from "@/types/Carousel";
import { useEffect } from "react";
import { Photos } from "unsplash-js/dist/methods/search/types/response";

export default function ImageEdit({
  image,
  index,
}: {
  image: Image;
  index: number;
}) {
  const [setCandidatePhotos, setSelectedPhotoIndex] = usePostStore((state) => [
    state.setCandidatePhotos,
    state.setSelectedPhotoIndex,
  ]);

  useEffect(() => {
    if (image.candidatePhotos == undefined)
      fetch(encodeURI(`/api/brain?q=${image.content}`))
        .then((res) => res.json())
        .then((photos: Photos) => setCandidatePhotos(index, photos));
  }, [image.content]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {image.candidatePhotos?.results
        ? image.candidatePhotos?.results.map((photo, photoIndex) => {
          const isSelected = photoIndex === image.selectedPhotoIndex;
          return (
            <div
              className={`max-h-44 box-border aspect-square ${isSelected ? "border-white border-2 p-2" : ""
                }`}
              onClick={() => setSelectedPhotoIndex(index, photoIndex)}
              key={photoIndex}
            >
              <img
                className="object-cover w-full h-full"
                src={photo.urls.small}
                alt={photo.description || `Image ${photoIndex}`}
              />
            </div>
          );
        })
        : Array(9)
          .fill(undefined)
          .map((_, i) => <ImagePreview key={i} />)}
    </div>
  );
}

function ImagePreview() {
  return (
    <div className="flex justify-center items-center h-44 bg-gray-300 rounded dark:bg-gray-700 aspect-square">
      <svg
        className="w-12 h-12 text-gray-200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 640 512"
      >
        <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
      </svg>
    </div>
  );
}
