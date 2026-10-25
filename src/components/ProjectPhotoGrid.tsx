import Image from "next/image";
import type { Project } from "@/lib/content";

export default function ProjectPhotoGrid({ photos, title }: { photos: Project["photos"]; title: string }) {
  return (
    <div className="grid gap-x-[14px] gap-y-[32px] md:gap-y-[20px] md:grid-cols-2">
      {photos.map((photo) => (
        <figure key={photo.image}>
          <div className="relative md:aspect-[3/4]">
            <Image
              src={photo.image}
              alt={photo.title || title}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full md:absolute md:inset-0 md:h-full md:object-cover"
            />
          </div>
          {(photo.title || photo.caption) && (
            <figcaption className="pt-[14px]">
              {photo.title && <p className="text-[16px] md:font-serif md:text-[16px] md:font-bold">{photo.title}</p>}
              {photo.caption && <p className="mt-[14px] text-[14px] leading-[1.45] md:mt-[18px] md:text-[13px]">{photo.caption}</p>}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
