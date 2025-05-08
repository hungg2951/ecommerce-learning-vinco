import React from "react";
import ProductDetailClient from "./ProductDetailClient";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const ProductDetailPage = async ({ params }: { params: { id: string } }) => {

  const { id } = await params;

  const product = await axios.get(`${baseURL}/api/products/${id}`);
  const products = await axios.get(`${baseURL}/api/products`);

  return (
    <ProductDetailClient product={product.data} products={products.data} />
  );
};

export async function generateMetadata({ params }: { params: { id: string } }) {

  const { id } = await params;
  const {data} = await axios.get(`${baseURL}/api/products/${id}`);

  return {
    title: `${data.name}`
  };
}
export default ProductDetailPage;
