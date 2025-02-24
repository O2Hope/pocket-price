import SetsCollection from "@/components/sets-collection";
import { getSetsBySeries } from "@/lib/api/sets/getSets";

export default async function Sets() {
  const series = await getSetsBySeries();
  const parsedSeries = JSON.parse(JSON.stringify(series));
  return (
    <div>
      <h2 className="mb-5 text-3xl font-heading text-text">Sets</h2>
      <SetsCollection series={parsedSeries} />
    </div>
  );
}
