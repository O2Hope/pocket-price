import { Badge } from "./badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

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
    <figure className="flex flex-col hover:cursor-pointer hover:scale-105 transition-all overflow-hidden rounded-base border-2 border-border bg-main font-base shadow-shadow">
      <img src={imageUrl} alt="image" className="w-full aspect-auto" />
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
          <Badge variant="neutral">${price}</Badge>
        </div>
      </figcaption>
    </figure>
  );
}
