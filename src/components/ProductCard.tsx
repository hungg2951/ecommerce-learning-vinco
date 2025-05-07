import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useCart } from "./context/CartContext";
import StarRating from "./StarRating";

const ProductCard = ({
  id,
  name,
  description,
  price,
  imageUrl,
  rating,
  reviewCount,
  isNew = false,
  onSale = false,
  originalPrice = null,
}: TProduct) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { addToCart } = useCart();

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, imageUrl, quantity: 1 });
  };
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden group">
      <div className="relative aspect-square bg-gray-100">
        <Link href={`/products/${id}`}>
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="absolute top-2 right-2">
          <button
            onClick={toggleFavorite}
            className="bg-white h-10 w-10 hover:bg-gray-100 cursor-pointer shadow-md hover:text-pink-500 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorited ? "fill-pink-500 text-pink-500" : ""
              }`}
            />
          </button>
        </div>
        {isNew && (
          <div className="absolute top-2 left-2">
            <div className="bg-emerald-500 hover:bg-emerald-600 text-white inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              New
            </div>
          </div>
        )}
        {onSale && (
          <div className="absolute top-2 left-2">
            <div className="bg-red-500 hover:bg-red-600 text-white inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              Sale
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <Link href={`/products/${id}`}>
          <h3 className="font-medium text-gray-900 mb-1 hover:text-blue-600">
            {name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-2">
          {description.split(".")[0]}
        </p>
        <div className="flex items-center mb-2">
          <StarRating rating={parseFloat(rating)} />
          <span className="text-gray-500 text-sm ml-1">({reviewCount})</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="font-bold text-lg">${price}</span>
            {onSale && originalPrice && (
              <span className="text-gray-500 text-sm line-through ml-2">
                ${originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 cursor-pointer text-white py-2 px-4 font-medium rounded-lg text-sm hover:bg-blue-700 transition-colors flex gap-2"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
