import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Photos() {
  const {
    query: { q },
  } = useRouter();

  const [photos, setPhotos] = useState<Photo[]>();

  useEffect(() => {
    if (q) {
      fetch(`/api/brain?q=${q}`)
        .then((res) => res.json())
        .then((data) => {
          setPhotos(data);
        });
    }
  }, []);

  return (
    <>
      <h1 className="text-3xl text-bold">Image results for "{q}"</h1>
      <div className="grid grid-cols-4 grid-rows-3 content-center border-2 border-red-200">
        {photos?.map((image, index) => (
          <div className="m-auto">
            <Image
              src={image.urls.small}
              alt={image.description || `Image ${index}`}
              key={index}
              width={image.width / 20}
              height={image.height / 20}
            />
          </div>
        ))}
      </div>
    </>
  );
}
