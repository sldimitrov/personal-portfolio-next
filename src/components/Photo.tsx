import Image from "next/image";

export default function Photo({
  src,
  alt = "Photo",
}: {
  src: string;
  alt?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={160}
      height={160}
      className="h-full w-full rounded-full object-cover object-top ring-2 ring-white/40"
    />
  );
}
