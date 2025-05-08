import React from "react";
import ProductDetailClient from "./ProductDetailClient";
import axios from "axios";

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const { id } = await params;

  const product = await axios.get(`${baseURL}/api/products/${id}`);
  const products = await axios.get(`${baseURL}/api/products`);

  return (
    <ProductDetailClient product={product.data} products={products.data} />
  );
};

export default ProductDetailPage;
