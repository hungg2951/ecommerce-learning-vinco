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
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const Product = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { id } = useParams();

  const router = useRouter();

  const [activeColor, setActiveColor] = useState("blue");
  const [isFavorited, setIsFavorited] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const { addToCart } = useCart();
  const { data: product, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/products/" + id,
    fetcher
  );

  const { data: products } = useSWR(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/products",
    fetcher
  );

  useEffect(() => {
    if (product) {
      document.title = `${product?.name} - NextShop`;
    }
  }, [product]);

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

  const addToCartHandler = (option: string) => {
    const payload = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: quantity,
    };
    addToCart(payload);
    setQuantity(1);
    if (option === "buy") router.push("/checkout");
  };

  const inscreaseHandler = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseHandler = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
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
                      ? "border-3 border-blue-600"
                      : "border-3 border-gray-300"
                  } focus:outline-none focus:ring-3 focus:ring-blue-500 cursor-pointer`}
                  onClick={() => setActiveColor("black")}
                ></button>
                <button
                  className={`w-8 h-8 rounded-full bg-white ${
                    activeColor === "white"
                      ? "border-3 border-blue-600"
                      : "border-3 border-gray-300"
                  } focus:outline-none focus:ring-3 focus:ring-blue-500 cursor-pointer`}
                  onClick={() => setActiveColor("white")}
                ></button>
                <button
                  className={`w-8 h-8 rounded-full bg-gray-500 ${
                    activeColor === "gray"
                      ? "border-3 border-blue-600"
                      : "border-3 border-gray-300"
                  } focus:outline-none focus:ring-3 focus:ring-blue-500 cursor-pointer`}
                  onClick={() => setActiveColor("gray")}
                ></button>
                <button
                  className={`w-8 h-8 rounded-full bg-red-500 ${
                    activeColor === "red"
                      ? "border-3 border-blue-600"
                      : "border-3 border-gray-300"
                  } focus:outline-none focus:ring-3 focus:ring-blue-500 cursor-pointer`}
                  onClick={() => setActiveColor("red")}
                ></button>
                <button
                  className={`w-8 h-8 rounded-full bg-blue-500 ${
                    activeColor === "blue"
                      ? "border-3 border-blue-600"
                      : "border-3 border-gray-300"
                  } focus:outline-none focus:ring-3 focus:ring-blue-500 cursor-pointer`}
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
                onClick={() => addToCartHandler("")}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </button>
              <button
                className="cursor-pointer flex-1 bg-emerald-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                onClick={() => addToCartHandler("buy")}
              >
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
        <div className="container mx-auto my-10">
          <div className="flex space-x-6 border-b border-gray-200">
            <button
              onClick={() => handleActiveTab("description")}
              className={`cursor-pointer pb-2 ${
                activeTab === "description"
                  ? "border-b-2 border-black font-medium text-black"
                  : "text-gray-500"
              } `}
            >
              Description
            </button>
            <button
              onClick={() => handleActiveTab("specifications")}
              className={`cursor-pointer pb-2 ${
                activeTab === "specifications"
                  ? "border-b-2 border-black font-medium text-black"
                  : "text-gray-500"
              } `}
            >
              Specifications
            </button>
            <button
              onClick={() => handleActiveTab("reviews")}
              className={`cursor-pointer pb-2 ${
                activeTab === "reviews"
                  ? "border-b-2 border-black font-medium text-black"
                  : "text-gray-500"
              } `}
            >
              Reviews (42)
            </button>
            <button
              onClick={() => handleActiveTab("faqs")}
              className={`cursor-pointer pb-2 ${
                activeTab === "faqs"
                  ? "border-b-2 border-black font-medium text-black"
                  : "text-gray-500"
              } `}
            >
              FAQs
            </button>
          </div>

          {activeTab === "description" && (
            <div className="mt-6 space-y-4 text-gray-700 text-base py-2">
              <p>
                Experience premium quality with our Wireless Headphones.
                Designed for comfort and durability, this product delivers
                exceptional performance for all your needs.
              </p>
              <p>
                Premium wireless headphones with high-quality sound, noise
                cancellation, and long battery life. Perfect for music lovers
                and professionals who need clear audio for calls and meetings.
              </p>
              <p>
                The ergonomic design provides comfort for extended use, while
                the premium materials ensure durability and style. Connect
                easily to your devices for a stable, high-quality experience.
              </p>
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-5">
              <div className="border-b border-gray-200 py-3">
                <span className="font-medium">Material:</span> Premium quality
              </div>
              <div className="border-b border-gray-200 py-3">
                <span className="font-medium">Dimensions:</span> 12 x 8 x 2
                inches
              </div>
              <div className="border-b border-gray-200 py-3">
                <span className="font-medium">Weight:</span> 1.2 lbs
              </div>
              <div className="border-b border-gray-200 py-3">
                <span className="font-medium">Warranty:</span> 1 year
              </div>
              <div className="border-b border-gray-200 py-3">
                <span className="font-medium">Country of Origin:</span> USA
              </div>
              <div className="border-b border-gray-200 py-3">
                <span className="font-medium">Model Number:</span> {product.id}
                XYZ
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6 py-5">
              <div className="flex items-start">
                <div className="mr-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="User"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <span className="font-medium mr-2">John D.</span>
                    <StarRating rating={5} />
                  </div>
                  <p className="text-gray-500 text-sm mb-2">
                    Verified Purchase • 2 weeks ago
                  </p>
                  <p className="text-gray-700">
                    This product exceeded my expectations! Great quality and
                    fast shipping. I would definitely recommend it to anyone
                    looking for a reliable product.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="User"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <span className="font-medium mr-2">Sarah M.</span>
                    <StarRating rating={4} />
                  </div>
                  <p className="text-gray-500 text-sm mb-2">
                    Verified Purchase • 1 month ago
                  </p>
                  <p className="text-gray-700">
                    Very good product for the price. It is comfortable and
                    durable. The only reason I am not giving 5 stars is because
                    the color was slightly different than what was shown in the
                    pictures.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "faqs" && (
            <div className="space-y-6 py-5">
              <div>
                <h4 className="font-medium text-lg mb-2">
                  Is this product covered by warranty?
                </h4>
                <p className="text-gray-600">
                  Yes, all our products come with a standard 1-year manufacturer
                  warranty against defects.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-lg mb-2">
                  How do I care for this product?
                </h4>
                <p className="text-gray-600">
                  For best results, follow the care instructions included with
                  the product. Generally, we recommend gentle cleaning with
                  appropriate materials for the specific product type.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-lg mb-2">
                  Can I return this if I am not satisfied?
                </h4>
                <p className="text-gray-600">
                  Absolutely! We offer a 30-day return policy on all our
                  products. If you are not completely satisfied, you can return
                  it for a full refund or exchange.
                </p>
              </div>
            </div>
          )}
        </div>

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
