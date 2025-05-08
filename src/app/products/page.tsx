import React from "react";
import ProductsClient from "./ProductsClient";
export const dynamic = "force-dynamic"
export const metadata = {
  title: 'Products - NextShop',
  description: 'Tất cả sản phẩm',
};

const Products = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    // Trả về client-side component và truyền dữ liệu
    return <ProductsClient products={data} />;
  } catch (error) {
    console.error(error);
    return <div>Failed to load products</div>;
  }
};

export default Products;
