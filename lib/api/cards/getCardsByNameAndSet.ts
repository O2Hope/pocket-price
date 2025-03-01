"use server";

export async function getCardByNameAndSet(name: string, set: string) {
  const encodedURI = encodeURI(
    `${process.env.TCG_API}/cards?q=name:"${name}*" set.id:${set}&pageSize=8&select=id,name,images,tcgplayer,number&orderBy=-tcgplayer.prices.holofoil.market`,
  );
  const cards = await fetch(encodedURI, {
    headers: { "X-Api-Key": process.env.TCG_KEY as string },
    cache: "force-cache",
    next: {
      revalidate: 86400,
    },
  }).then((res) => res.json());

  return cards;
}
