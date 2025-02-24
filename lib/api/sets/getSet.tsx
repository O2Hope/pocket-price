export const getSet = async (id: string) => {
  const sets = await fetch(`${process.env.TCG_API}/sets/${id}`, {
    headers: { "X-Api-Key": process.env.TCG_KEY as string },
    cache: "force-cache",
    next: {
      revalidate: Infinity,
    },
  }).then((res) => res.json());

  return sets.data;
};
