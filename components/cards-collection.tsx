"use client";

import { AnimatePresence, motion } from "motion/react";
import { Input } from "./ui/input";
import PokemonCard from "./ui/pokemon-card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQueryState } from "nuqs";
import { debounce } from "@/lib/hooks/debounce";
import { useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Card = {
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

export type CardsCollectionProps = {
  cards: Card[];
};

export const CardsCollection = ({ cards }: CardsCollectionProps) => {
  const pathname = usePathname();
  const [name, setName] = useQueryState("name");
  const [order, setOrder] = useQueryState("order");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && name) inputRef.current.value = name;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = debounce((value: string) => {
    setName(value, { shallow: false });
  }, 300);

  return (
    <div className="flex flex-col gap-4 my-8">
      <div className="flex gap-8 justify-between">
        <Input
          ref={inputRef}
          placeholder="Search Card"
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-lg"
        />
        <Select
          value={order || "-tcgplayer.prices.holofoil.market"}
          onValueChange={(e) => setOrder(e, { shallow: false })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Order by</SelectLabel>
              <SelectItem value="tcgplayer.prices.holofoil.market">
                Price: Low to High
              </SelectItem>
              <SelectItem value="-tcgplayer.prices.holofoil.market">
                Price: High to Low
              </SelectItem>
              <SelectItem value="name">Name: A to Z</SelectItem>
              <SelectItem value="-name">Name: Z to A</SelectItem>
              <SelectItem value="number">Number Asc</SelectItem>
              <SelectItem value="-number">Number Desc</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        <AnimatePresence custom="exit">
          {cards.map((card, index) => (
            <motion.li
              key={`${card.id}-${index}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: (index) => ({
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.1,
                    duration: 0.4,
                    ease: "easeOut",
                  },
                }),
                exit: {
                  opacity: 0,
                  y: -10,
                  transition: { duration: 0.1 },
                },
              }}
              custom={index}
            >
              <Link href={`${pathname}/${card.id}`}>
                <PokemonCard
                  imageUrl={card.images.small}
                  caption={card.name}
                  number={card.number}
                  price={
                    card.tcgplayer?.prices?.holofoil?.market ||
                    card.tcgplayer?.prices?.reverseHolofoil?.market
                  }
                />
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};
