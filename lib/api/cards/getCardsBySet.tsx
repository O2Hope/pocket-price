export const getCardsBySet = async ({
  id,
  name,
  page,
  pageSize,
  order,
}: {
  id: string;
  name?: string;
  page?: number;
  pageSize?: number;
  order?: string;
}) => {
  const cards = await fetch(
    `${process.env.TCG_API}/cards?q=name:"${name}*" set.id:${id}&pageSize=${pageSize}&page=${page}&orderBy=${order}&select=id,name,images,tcgplayer,number`,
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
