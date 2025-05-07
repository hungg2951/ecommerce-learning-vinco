"use client";
import { useCart } from "@/components/context/CartContext";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import StarRating from "@/components/StarRating";
import {
  Heart,
  RefreshCw,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useSWR from "swr";

const Product = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { id } = useParams();

  const [activeColor, setActiveColor] = useState("blue");
  const [isFavorited, setIsFavorited] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { data: product, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/products/" + id,
    fetcher
  );
  const { data: products } = useSWR(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/products",
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  const thumbnails = [
    product.imageUrl,
    "https://images.unsplash.com/photo-1599669454699-e2ed799f9c95?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1577801622187-9a1dc69593b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  ];

  const relatedProducts = products
    ?.filter(
      (p: TProduct) => p.category === product?.category && p.id !== product?.id
    )
    .slice(0, 4);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const addToCartHandler = () => {
    const payload = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: quantity,
    };
    addToCart(payload);
    Swal.fire({
      icon: "success",
      title: "Add to cart successfully",
      showConfirmButton: false,
      timer: 1000,
    });
    setQuantity(1);
  };

  const inscreaseHandler = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseHandler = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col lg:flex-row -mx-4">
          {/* Product Images */}
          <div className="lg:w-1/2 px-4">
            <ProductGallery
              mainImage={product.imageUrl}
              thumbnails={thumbnails}
              productName={product.name}
            />
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 px-4">
            <div className="mb-4">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  <StarRating rating={parseFloat(product.rating)} size="md" />
                </div>
                <span className="text-gray-600 text-sm">
                  {product.reviewCount} Reviews
                </span>
              </div>
              <div className="mb-4">
                <span className="text-2xl font-bold">${product.price}</span>
                <span className="text-gray-500">/ unit</span>
                {product.onSale && product.originalPrice && (
                  <span className="text-gray-500 text-sm line-through ml-2">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <div className="text-gray-600 mb-6">
                <p>{product.description}</p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li>Premium quality materials</li>
                  <li>Durable construction</li>
                  <li>Modern design</li>
                  <li>Versatile functionality</li>
                  <li>100% satisfaction guarantee</li>
                </ul>
              </div>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Colors</h3>
              <div className="flex space-x-3">
                <button
                  className={`w-8 h-8 rounded-full bg-black ${
                    activeColor === "black"
                      ? "border-2 border-blue-600"
                      : "border-2 border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  onClick={() => setActiveColor("black")}
                ></button>
                <button
                  className={`w-8 h-8 rounded-full bg-white ${
                    activeColor === "white"
                      ? "border-2 border-blue-600"
                      : "border-2 border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  onClick={() => setActiveColor("white")}
                ></button>
                <button
                  className={`w-8 h-8 rounded-full bg-gray-500 ${
                    activeColor === "gray"
                      ? "border-2 border-blue-600"
                      : "border-2 border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  onClick={() => setActiveColor("gray")}
                ></button>
                <button
                  className={`w-8 h-8 rounded-full bg-red-500 ${
                    activeColor === "red"
                      ? "border-2 border-blue-600"
                      : "border-2 border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  onClick={() => setActiveColor("red")}
                ></button>
                <button
                  className={`w-8 h-8 rounded-full bg-blue-500 ${
                    activeColor === "blue"
                      ? "border-2 border-blue-600"
                      : "border-2 border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  onClick={() => setActiveColor("blue")}
                ></button>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center">
                <button
                  className="w-10 h-10 rounded-l-lg border border-gray-300 border-r-0 cursor-pointer"
                  onClick={decreaseHandler}
                >
                  -
                </button>
                <span className="w-10 h-10 border border-gray-300 flex justify-center items-center">
                  {quantity}
                </span>
                <button
                  className="w-10 h-10 rounded-r-lg border border-gray-300 border-l-0 cursor-pointer"
                  onClick={inscreaseHandler}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart and Buy Now buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
              <button
                className="cursor-pointer flex-1 bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                onClick={addToCartHandler}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </button>
              <button className="cursor-pointer flex-1 bg-emerald-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                Buy Now
              </button>
              <button
                onClick={toggleFavorite}
                className={`rounded-full cursor-pointer border border-gray-300 h-10 w-10 ${
                  isFavorited ? "text-pink-500 border-pink-500" : ""
                }`}
              >
                <Heart
                  className={`w-4 cursor-pointer m-auto ${
                    isFavorited ? "fill-pink-500" : ""
                  }`}
                />
              </button>
            </div>

            {/* Shipping Info */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center mb-4">
                <Truck className="text-gray-600 mr-3 h-5 w-5" />
                <div>
                  <h3 className="font-medium">Free Shipping</h3>
                  <p className="text-gray-600 text-sm">
                    Free standard shipping on orders over $50
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <RefreshCw className="text-gray-600 mr-3 h-5 w-5" />
                <div>
                  <h3 className="font-medium">Easy Returns</h3>
                  <p className="text-gray-600 text-sm">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="text-gray-600 mr-3 h-5 w-5" />
                <div>
                  <h3 className="font-medium">Secure Checkout</h3>
                  <p className="text-gray-600 text-sm">SSL encrypted payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts?.map((relatedProduct: TProduct) => (
              <ProductCard
                key={relatedProduct.id}
                id={relatedProduct.id}
                name={relatedProduct.name}
                description={relatedProduct.description}
                price={relatedProduct.price}
                imageUrl={relatedProduct.imageUrl}
                rating={relatedProduct.rating}
                reviewCount={relatedProduct.reviewCount}
                isNew={relatedProduct.isNew}
                onSale={relatedProduct.onSale}
                originalPrice={relatedProduct.originalPrice}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
