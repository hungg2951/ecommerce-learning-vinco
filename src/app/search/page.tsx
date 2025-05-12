import ProductsClient from "../products/ProductsClient";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const query = params.q;

  if (!query) {
    throw new Error("query is required");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?q=${query}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch search results");
  }
  const { results } = await res.json();

  if (!results) {
    throw new Error("No results found");
  }
  return <ProductsClient products={results} />;
};

export default SearchPage;
