"use client";

import { AnimatePresence, motion } from "motion/react";
import { Input } from "./ui/input";
import PokemonCard from "./ui/pokemon-card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDebounce } from "@/lib/hooks/debounce";
import { useState, useEffect, useRef } from "react";
import { getCardByNameAndSet } from "@/lib/api/cards/getCardsByNameAndSet";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationLink,
} from "./ui/pagination";

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
  totalCount: number;
  pageSize: number;
  page: number;
};

export const CardsCollection = ({
  cards,
  totalCount,
  pageSize,
  page,
}: CardsCollectionProps) => {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const set = segments[segments.length - 1];
  const [search, setSearch] = useState("");
  const [filteredCards, setFilteredCards] = useState<CardsCollectionProps>({
    cards,
    totalCount,
    pageSize,
    page,
  });
  const debouncedSearch = useDebounce(search, 300);
  const latestRequest = useRef(0);

  useEffect(() => {
    async function fetchCards() {
      const currentRequestId = latestRequest.current + 1;
      latestRequest.current = currentRequestId;
      if (debouncedSearch) {
        const { data, ...pagination } = await getCardByNameAndSet(
          debouncedSearch,
          set,
        );
        if (currentRequestId !== latestRequest.current) return;
        return setFilteredCards({ cards: data, ...pagination });
      }
      return setFilteredCards({ cards, totalCount, pageSize, page });
    }
    fetchCards();
  }, [cards, debouncedSearch, page, pageSize, set, totalCount]);

  const renderPageNumbers = () => {
    const pages = [];
    const totalPages = Math.ceil(
      filteredCards.totalCount / filteredCards.pageSize,
    );
    const showDots = totalPages > 6;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // First page
        i === totalPages || // Last page
        (i >= page - 1 && i <= page + 1) // Current, prev, next
      ) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === page}
              href={`?page=${i}&pageSize=${pageSize}`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      } else if (showDots && (i === page - 2 || i === page + 2)) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col gap-4 my-8">
      <Input
        placeholder="Search Card"
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-lg"
      />
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        <AnimatePresence custom="exit">
          {filteredCards.cards.map((card, index) => (
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
                    card.tcgplayer.prices?.holofoil?.market ||
                    card.tcgplayer.prices?.reverseHolofoil?.market
                  }
                />
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {!debouncedSearch && (
        <Pagination>
          <PaginationContent>
            {page !== 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href={`?page=${page - 1}&pageSize=${pageSize}`}
                />
              </PaginationItem>
            )}
            {renderPageNumbers()}
            {filteredCards.page * filteredCards.pageSize <
              filteredCards.totalCount && (
              <PaginationItem>
                <PaginationNext
                  href={`?page=${filteredCards.page + 1}&pageSize=${filteredCards.pageSize}`}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
