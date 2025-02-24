interface SearchProps {
  searchParams: Promise<{ q: string }>;
}

export default async function Search({ searchParams }: SearchProps) {
  const { q } = await searchParams;
  return (
    <div>
      <h1>Search</h1>
      <p>Search query: {q}</p>
    </div>
  );
}
