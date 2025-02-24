import { CardsCollection } from "@/components/cards-collection";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import { getCardsBySet } from "@/lib/api/cards/getCards";
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

  const renderPageNumbers = () => {
    const pages = [];
    const totalPages = Math.ceil(totalCount / pageSize);
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
      <CardsCollection cards={cards} />
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
          {page * pageSize < totalCount && (
            <PaginationItem>
              <PaginationNext href={`?page=${page + 1}&pageSize=${pageSize}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
