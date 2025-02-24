"use client";

import { Input } from "./ui/input";
import PokemonCard from "./ui/pokemon-card";

type Card = {
  id: string;
  name: string;
  number: string;
  images: {
    small: string;
  };
  tcgplayer: {
    prices: {
      holofoil: {
        market: number;
      };
      reverseHolofoil: {
        market: number;
      };
    };
  };
};

export const CardsCollection = ({ cards }: { cards: Card[] }) => {
  return (
    <div className="flex flex-col gap-4 my-8">
      <Input placeholder="Search Card" className="max-w-lg" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {cards.map((card: Card) => (
          <PokemonCard
            key={card.id}
            imageUrl={card.images.small}
            caption={card.name}
            number={card.number}
            price={
              card.tcgplayer.prices?.holofoil?.market ||
              card.tcgplayer.prices?.reverseHolofoil?.market
            }
            onClick={() => {
              console.log("Card clicked");
            }}
          />
        ))}
      </div>
    </div>
  );
};
