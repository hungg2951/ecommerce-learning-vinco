import React from "react";
import ProductDetailClient from "./ProductDetailClient";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;

  if (!baseURL) return { title: "Product Not Found" };

  try {
    const data: TProduct = await fetch(
      `${baseURL}/api/products/${resolvedParams.id}`
    ).then((res) => res.json());

    return {
      title: data.name,
      description: data.description || `Details about ${data.name}`,
    };
  } catch {
    return { title: "Product Not Found" };
  }
}

const ProductDetailPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;

  if (!baseURL) return <div>Configuration error</div>;

  try {
    const [product, products]: [TProduct, TProduct[]] = await Promise.all([
      fetch(`${baseURL}/api/products/${resolvedParams.id}`).then((res) =>
        res.json()
      ),
      fetch(`${baseURL}/api/products`).then((res) => res.json()),
    ]);

    return <ProductDetailClient product={product} products={products} />;
  } catch {
    return <div>Failed to load product data</div>;
  }
};

export default ProductDetailPage;
