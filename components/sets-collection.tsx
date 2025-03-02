"use client";

import { Input } from "@/components/ui/input";
import SetCard from "@/components/ui/set-card";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

type Set = {
  id: string;
  name: string;
  images: {
    logo: string;
  };
};

type Series = {
  [x: string]: Set[];
};

export const SetsCollection = ({ series }: { series: Series }) => {
  const [localSeries, setLocalSeries] = useState<Series>(series);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    const newSeries = Object.keys(series).reduce(
      (acc: Series, serie: string) => {
        const filtered = series[serie].filter((set: Set) =>
          set.name.toLowerCase().includes(search.toLowerCase()),
        );

        if (filtered.length) {
          acc[serie] = filtered;
        }
        return acc;
      },
      {},
    );

    setLocalSeries(newSeries);
  };

  return (
    <div className="flex flex-col">
      <Input
        onChange={handleSearch}
        placeholder="Search set"
        className="max-w-lg mb-4"
      />
      {Object.keys(localSeries).map((serie: string) => (
        <div className="mb-4" key={`serie-${serie}`}>
          <div className="text-2xl font-heading text-text">{serie}</div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 my-2">
            <AnimatePresence custom="exit">
              {localSeries[serie].map((set) => (
                <motion.li
                  key={`${set.id}`}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: () => ({
                      opacity: 1,
                      y: 0,
                      transition: {
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
                >
                  <Link href={`/sets/${set.id}?page=1&pageSize=20`}>
                    <SetCard imageUrl={set.images.logo} caption={set.name} />
                  </Link>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SetsCollection;
