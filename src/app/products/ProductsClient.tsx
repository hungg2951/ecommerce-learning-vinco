"use client";
import ProductCard from "@/components/ProductCard";
import StarRating from "@/components/StarRating";
import { Button, Radio } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

const rangePrice = [
  {
    value: "under50",
    label: "Under $50",
  },
  {
    value: "50to100",
    label: "$50 - $100",
  },
  {
    value: "100to200",
    label: "$100 - $200",
  },
  {
    value: "over200",
    label: "Over $200",
  },
];

const ProductsClient = ({ products }: { products: TProduct[] }) => {
  const [selectedRatings, setSelectedRatings] = useState<number>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [sortPrice, setSortPrice] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const queryValue = searchParams.get("category");
  console.error("🚀 ~ ProductsClient ~ queryValue:", queryValue)

  const clearFilterData = () => {
    setPriceRange(null);
    setSelectedCategory(null);
    setSelectedRatings(0);
    setSortPrice("")
    router.push("/products");
  };

  useEffect(() => {
    if (queryValue) {
      setSelectedCategory(queryValue);
    }
  }, [queryValue]);
  const productsFilter = products
    .filter((product: TProduct) => {
      const price = parseFloat(product.price);
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      const matchesPriceRange =
        !priceRange ||
        (priceRange === "under50" && price < 50) ||
        (priceRange === "50to100" && price >= 50 && price <= 100) ||
        (priceRange === "100to200" && price > 100 && price <= 200) ||
        (priceRange === "over200" && price > 200);
      const matchesRating =
        !selectedRatings || parseFloat(product.rating) >= selectedRatings;
      return matchesCategory && matchesPriceRange && matchesRating;
    })
    .sort((a, b) => {
      if (sortPrice === "asc") return parseFloat(a.price) - parseFloat(b.price);
      if (sortPrice === "desc")
        return parseFloat(b.price) - parseFloat(a.price);
      return 0;
    });
  return (
    <div className="mx-auto container px-4">
      <h1 className="text-3xl font-bold mb-6">
        {selectedCategory && selectedCategory !== ""
          ? selectedCategory
          : "All Products"}
      </h1>
      <div className="flex flex-col lg:flex-row">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4 pr-0 lg:pr-8 mb-6 lg:mb-0">
          <div className="p-4 bg-white">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            {/* Categories Filter */}
            <div className="mb-4">
              <h4 className="font-medium">Categories</h4>
              <Radio.Group
                onChange={(e) => setSelectedCategory(e.target.value)}
                value={selectedCategory}
              >
                {["Electronics", "Fashion", "Home & Decor", "Accessories"].map(
                  (category) => (
                    <p key={category}>
                      <Radio value={category}>{category}</Radio>
                    </p>
                  )
                )}
              </Radio.Group>
            </div>

            {/* Price Range Filter */}
            <div className="mb-4">
              <h4 className="font-medium">Price Range</h4>
              <Radio.Group
                onChange={(e) => setPriceRange(e.target.value)}
                value={priceRange}
              >
                {rangePrice.map((range) => (
                  <p key={range.value}>
                    <Radio value={range.value}>{range.label}</Radio>
                  </p>
                ))}
              </Radio.Group>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Rating</h3>
              <div className="space-y-2">
                <Radio.Group
                  onChange={(e) => setSelectedRatings(e.target.value)}
                  value={selectedRatings}
                >
                  {[5, 4, 3].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <Radio value={rating}>
                        <div className="flex items-center">
                          <span>{rating}</span>
                          <StarRating rating={rating} />
                          <span className="ml-1">& up</span>
                        </div>
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>

            <button
              onClick={clearFilterData}
              className="text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          {productsFilter?.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">
                No products found matching your criteria.
              </p>
              <Button
                variant="link"
                onClick={clearFilterData}
                className="text-blue-600 hover:text-blue-800 mt-4"
              >
                Clear filters and try again
              </Button>
            </div>
          ) : (
            <div>
              <div className="my-10 flex gap-3">
                <h3 className="font-bold">Sắp xếp giá: </h3>
                <button
                  onClick={() => setSortPrice("asc")}
                  className={`flex items-center gap-2 cursor-pointer ${
                    sortPrice === "asc" ? "text-blue-600" : ""
                  }`}
                >
                  Low to Hight{" "}
                  <span>
                    <FaArrowUpLong />
                  </span>
                </button>
                <button
                  onClick={() => setSortPrice("desc")}
                  className={`flex items-center gap-2 cursor-pointer ${
                    sortPrice === "desc" ? "text-blue-600" : ""
                  }`}
                >
                  Hight to Low <FaArrowDownLong />
                </button>
              </div>
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}
              >
                {productsFilter?.map((product: TProduct) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    rating={product.rating || "0"}
                    reviewCount={product.reviewCount || 0}
                    isNew={product.isNew ?? undefined}
                    onSale={product.onSale ?? undefined}
                    originalPrice={product.originalPrice ?? null}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsClient;
