import { Badge } from "./badge";
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
  price: number;
  number: string;
};

export default function PokemonCard({
  imageUrl,
  caption,
  price,
  number,
}: Props) {
  return (
    <figure className="flex flex-col hover:cursor-pointer hover:scale-105 transition-all  rounded-base border-2 border-border bg-main font-base shadow-shadow">
      <div className="relative w-full">
        <Image
          src={imageUrl}
          alt={caption}
          width={200}
          height={280}
          className="w-full h-auto"
        />
      </div>
      <figcaption className="border-t-2 text-mtext border-border p-4 flex flex-col justify-between flex-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="font-heading whitespace-nowrap overflow-hidden text-ellipsis">
                {caption}
              </div>
            </TooltipTrigger>
            <TooltipContent>{caption}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex justify-between items-end gap-2 mt-1">
          <div className="text-muted">#{number}</div>
          <Badge variant="neutral">{price ? `$${price}` : "N/A"}</Badge>
        </div>
      </figcaption>
    </figure>
  );
}
