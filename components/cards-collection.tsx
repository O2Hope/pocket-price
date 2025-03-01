"use client";

import { AnimatePresence, motion } from "motion/react";
import { Input } from "./ui/input";
import PokemonCard from "./ui/pokemon-card";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-4 my-8">
      <Input placeholder="Search Card" className="max-w-lg" />
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        <AnimatePresence custom="exit">
          {cards.map((card, index) => (
            <motion.li
              key={card.id}
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
                    card.tcgplayer.prices?.holofoil?.market ||
                    card.tcgplayer.prices?.reverseHolofoil?.market
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
