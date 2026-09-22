"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import { cn } from "@/lib/cn";
import { textAction } from "@/components/ui/button";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [worn, setWorn] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => () => void (worn && URL.revokeObjectURL(worn)), [worn]);

  const accept = (file?: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    setWorn(URL.createObjectURL(file));
    setActive(-1);
  };

  const main = active === -1 && worn ? worn : images[Math.max(0, active)];
  // The first image is the hero; thumbnails are the detail views. Pressing a selected thumbnail returns to the hero.
  const thumbs = images.slice(1, 4);

  return (
    <div>
      <div className="relative aspect-[712/537] overflow-hidden rounded-xs border border-line bg-cream-tint">
        <Image
          src={main}
          alt={active === -1 ? `Your photo wearing ${name}` : `${name}, view ${active + 1}`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          loading="eager"
          fetchPriority="high"
          unoptimized={main.startsWith("blob:")}
          className="object-cover"
        />
      </div>
      <ul className="mt-2.75 grid grid-cols-4 gap-2.75">
        {thumbs.map((src, n) => {
          const i = n + 1;
          return (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(active === i ? 0 : i)}
                aria-label={`Show detail view ${n + 1}`}
                aria-pressed={active === i}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-xs border bg-cream-tint transition-colors",
                  active === i ? "border-ink" : "border-line hover:border-line-strong",
                )}
              >
                <Image src={src} alt="" fill sizes="12rem" className="object-cover" />
              </button>
            </li>
          );
        })}
        <li className={thumbs.length === 0 ? "col-start-1" : undefined}>
          <button
            type="button"
            onClick={() => (worn ? setActive(active === -1 ? 0 : -1) : input.current?.click())}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              accept(e.dataTransfer.files[0]);
            }}
            aria-label={worn ? "Show your worn shot" : "Add a photo of yourself wearing this frame"}
            className={cn(
              "relative grid aspect-square w-full place-items-center overflow-hidden rounded-xs border border-line bg-cream-tint p-1.5 transition-colors",
              active === -1 && "border-ink",
            )}
          >
            {worn ? (
              <Image src={worn} alt="" fill unoptimized className="object-cover" />
            ) : (
              <span
                className={cn(
                  "grid size-full place-items-center content-center gap-2.5 border border-dashed text-meta text-ink-soft",
                  dragging ? "border-ink" : "border-ink-faint",
                )}
              >
                <ImagePlus aria-hidden className="size-6 text-ink-soft" strokeWidth={1.3} />
                Drop a worn shot
              </span>
            )}
          </button>
          <input
            ref={input}
            type="file"
            accept="image/*"
            className="sr-only"
            tabIndex={-1}
            onChange={(e) => {
              accept(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </li>
      </ul>
      {worn ? (
        <button type="button" className={cn(textAction(), "mt-3")} onClick={() => input.current?.click()}>
          Replace photo
        </button>
      ) : null}
    </div>
  );
}
