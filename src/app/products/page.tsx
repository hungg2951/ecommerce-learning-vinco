import axios from "axios";
import React from "react";
import ProductsClient from "./ProductsClient";

export const metadata = {
  title: 'Products - NextShop',
  description: 'Tất cả sản phẩm',
};

const Products = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
  );

  

  return <ProductsClient products={data} />;
};

export default Products;
