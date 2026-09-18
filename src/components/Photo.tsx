import Image from 'next/image';

export default function Photo({ src, alt = "Photo" }: {
    src: string;
    alt?: string;
}) {
    return (
        <div className="group">
            <Image
                src={src}
                alt={alt}
                width={80}
                height={80}
                className="h-full w-full rounded-full object-cover ring-2 ring-offset-2 ring-zinc-200 transition-all duration-300 group-hover:ring-blue-400 dark:ring-zinc-800 dark:ring-offset-black dark:group-hover:ring-blue-500"
            />
        </div>
    );
}
