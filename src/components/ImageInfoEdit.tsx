import { usePostStore } from "@/hooks/usePostStore";
import type { Image } from "@/types/Carousel";

export default function ImageInfoEdit({
  image,
  index,
}: {
  image: Image;
  index: number;
}) {
  const [setImageTitle, setImageContent, setImageAlt, setImageCaptions] =
    usePostStore((state) => [
      state.setImageTitle,
      state.setImageContent,
      state.setImageAlt,
      state.setImageCaptions,
    ]);

  return (
    <div className="mx-auto form-control">
      <FormInput
        label="Title"
        value={image.title}
        setter={(value) => setImageTitle(index, value)}
      />
      <FormInput
        label="Content"
        value={image.content}
        setter={(value) => setImageContent(index, value)}
      />
      <FormInput
        label="Alt"
        value={image.alt}
        setter={(value) => setImageAlt(index, value)}
      />
      <FormInput
        textarea
        label="Captions"
        value={image.captions.join(";\n")}
        setter={(value) => setImageCaptions(index, value.split(";\n"))}
      />
    </div>
  );
}

function FormInput({
  label,
  value,
  setter,
  textarea = false,
}: {
  label: string;
  value: string;
  setter: (value: string) => void;
  textarea?: boolean;
}) {
  return (
    <>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      {textarea ? (
        <textarea
          className="w-96 input input-bordered"
          placeholder={label}
          value={value}
          onChange={(e) => setter(e.target.value)}
        />
      ) : (
        <input
          type="text"
          className="w-96 input input-bordered"
          placeholder={label}
          value={value}
          onChange={(e) => setter(e.target.value)}
        />
      )}
    </>
  );
}
