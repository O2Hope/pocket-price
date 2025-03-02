import { parseAsString, parseAsFloat, createLoader } from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const cardSearchParams = {
  name: parseAsString.withDefault(""),
  page: parseAsFloat.withDefault(1),
  pageSize: parseAsFloat.withDefault(20),
  order: parseAsString.withDefault("-tcgplayer.prices.holofoil.market"),
};

export const loadSearchParams = createLoader(cardSearchParams);
