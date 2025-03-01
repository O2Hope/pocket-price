export const getSetsBySeries = async () => {
  const sets = await fetch(
    `${process.env.TCG_API}/sets?select=id,name,images,series,releaseDate&orderBy=-releaseDate`,
    {
      headers: { "X-Api-Key": process.env.TCG_KEY as string },
      cache: "force-cache",
      next: {
        revalidate: 86400,
      },
    },
  ).then((res) => res.json());

  const groupedSets = Object.groupBy(
    sets.data,
    (set: { id: string; series: string }) => set.series,
  );
  return groupedSets;
};
