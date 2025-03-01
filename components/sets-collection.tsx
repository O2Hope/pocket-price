"use client";

import { Input } from "@/components/ui/input";
import SetCard from "@/components/ui/set-card";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 my-2">
            {localSeries[serie].map((set: Set) => (
              <SetCard
                onClick={() => router.push(`/sets/${set.id}`)}
                key={`set-${set.id}`}
                imageUrl={set.images.logo}
                caption={set.name}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SetsCollection;
