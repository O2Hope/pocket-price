import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import Image from "next/image";

type Props = {
  imageUrl: string;
  caption: string;
};

export default function ImageCard({ imageUrl, caption }: Props) {
  return (
    <figure className="flex flex-col hover:cursor-pointer hover:scale-105 transition-all rounded-base border-2 border-border bg-main font-base shadow-shadow">
      <div className="relative aspect-[4/3]">
        <Image src={imageUrl} alt={caption} layout="fill" className="p-8" />
      </div>
      <figcaption className="border-t-2 text-mtext border-border p-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-full">
              <div className="font-heading whitespace-nowrap overflow-hidden text-ellipsis ">
                {caption}
              </div>
            </TooltipTrigger>
            <TooltipContent>{caption}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </figcaption>
    </figure>
  );
}
