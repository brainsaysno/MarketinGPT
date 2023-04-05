import Heading from "@/components/Heading";
import ImageEdit from "@/components/ImageEdit";
import ImageInfoEdit from "@/components/ImageInfoEdit";
import { usePostStore } from "@/hooks/usePostStore";
import { Post } from "@/types/Carousel";
import { useEffect, useState } from "react";

export default function steps({ startingPost }: { startingPost: Post }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const postStore = usePostStore();

  useEffect(() => {
    if (!postStore.title) {
      postStore.setPost(startingPost);
    }
  }, []);

  const handleSubmit = () => { };

  return (
    <div className="flex flex-col gap-4 items-center py-8 w-screen h-screen">
      <Heading>{postStore.title}</Heading>
      <ul className="steps">
        {postStore.images.map((image, index) => (
          <li
            className={`step hover:cursor-pointer ${index <= currentIndex ? "step-primary" : ""
              }`}
            key={index}
            onClick={() => setCurrentIndex(index)}
          >
            {image.title}
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-12 justify-around items-center w-full">
        <button
          className="mx-auto btn w-fit"
          onClick={() => setCurrentIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          ‹ Prev
        </button>

        <div className="grid grid-cols-2 col-span-10">
          {postStore.images.length > 0 && (
            <>
              <ImageInfoEdit
                image={postStore.images[currentIndex]}
                index={currentIndex}
              />
              <ImageEdit
                image={postStore.images[currentIndex]}
                index={currentIndex}
              />
            </>
          )}
        </div>

        {currentIndex === postStore.images.length - 1 ? (
          <button
            className="mx-auto btn btn-accent w-fit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        ) : (
          <button
            className="mx-auto btn w-fit"
            onClick={() => setCurrentIndex(currentIndex + 1)}
          >
            Next ›
          </button>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const post: Post = {
    topic: "How to create the best lighting for your home",
    title: "Brighten up your home with these lighting tips",
    description:
      "Proper lighting can make all the difference in your home's atmosphere. Follow these tips to create the perfect ambiance for any occasion!",
    images: [
      {
        title: "Layered Lighting",
        content: "layered lighting interior design",
        alt: "A photo of a living room with multiple light sources",
        selectedPhotoIndex: 0,
        captions: [
          "Use a combination of overhead, task, and accent lighting to create a layered effect",
          "Consider the size and function of the room when choosing lighting fixtures",
          "Use dimmers to adjust the brightness and mood of the room",
        ],
      },
      {
        title: "Natural Light",
        content: "natural light interior design",
        alt: "A photo of a bedroom with large windows and natural light",
        selectedPhotoIndex: 0,
        captions: [
          "Maximize natural light by keeping windows unobstructed and clean",
          "Choose light-colored window treatments that let light pass through",
          "Add mirrors to reflect natural light and create the illusion of more space",
        ],
      },
      {
        title: "Task Lighting",
        content: "task lighting interior design",
        alt: "A photo of a kitchen with under-cabinet lighting",
        selectedPhotoIndex: 0,
        captions: [
          "Install task lighting in areas where you need focused light, such as in the kitchen or home office",
          "Choose task lighting that complements the style of your home",
          "Consider energy-efficient options, like LED bulbs",
        ],
      },
    ],
  };

  return {
    props: {
      startingPost: post,
    },
  };
}
