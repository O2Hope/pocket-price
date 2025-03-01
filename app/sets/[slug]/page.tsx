import { Card, CardsCollection } from "@/components/cards-collection";
import { getCardsBySet } from "@/lib/api/cards/getCardsBySet";
import { getSet } from "@/lib/api/sets/getSet";
import Image from "next/image";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{
  page: string | undefined;
  pageSize: string | undefined;
}>;

export default async function Set({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const query = await searchParams;

  const set = await getSet(slug);
  const {
    data: cards,
    page,
    pageSize,
    totalCount,
  } = await getCardsBySet(set.id, query.page, query.pageSize);

  return (
    <div className="pb-8">
      <div className="flex gap-4 text-text">
        <Image src={set.images.logo} alt={set.name} width={200} height={200} />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <h1 className="text-3xl font-heading">{set.name}</h1>
            <Image
              src={set.images.symbol}
              alt={set.name}
              width={24}
              height={24}
            />
          </div>
          <p>{set.series}</p>
          <p>{set.releaseDate}</p>
        </div>
      </div>
      <CardsCollection
        cards={cards}
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
      />
    </div>
  );
}
