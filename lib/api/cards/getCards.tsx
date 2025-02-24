export const getCardsBySet = async (
  id: string,
  page: string = "1",
  pageSize: string = "20",
) => {
  const cards = await fetch(
    `${process.env.TCG_API}/cards?q=set.id:${id}&pageSize=${pageSize}&page=${page}&orderBy=-tcgplayer.prices.holofoil.market&select=id,name,images,tcgplayer,number`,
    {
      headers: { "X-Api-Key": process.env.TCG_KEY as string },
      cache: "force-cache",
      next: {
        revalidate: 86400,
      },
    },
  ).then((res) => res.json());

  return cards;
};
