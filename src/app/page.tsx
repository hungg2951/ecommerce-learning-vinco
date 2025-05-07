"use client";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import StarRating from "@/components/StarRating";
import { ArrowRight } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import useSWR from "swr";
// Categories data
const categories = [
  {
    name: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Fashion",
    imageUrl:
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Home & Decor",
    imageUrl:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
];
export default function Home() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/products",
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;
  if (!data) {
    notFound();
  }
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Discover Modern Essentials for Your Lifestyle
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Shop the latest trends with NextShop's curated collection of
                premium products.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => router.push("/products")}
                  className="cursor-pointer px-7 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Shop Now
                </button>
                <button className="cursor-pointer px-8 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Premium Products Showcase"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                name={category.name}
                imageUrl={category.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <button
              onClick={() => router.push("/products")}
              className="text-blue-600 hover:text-blue-800 font-medium flex gap-2 items-center"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">
                Failed to load products. Please try again later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data
                ?.filter((product: TProduct) => product.featured)
                .map((product: TProduct) => (
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
          )}
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-2">Summer Sale is On!</h2>
              <p className="text-blue-100">
                Get up to 40% off on selected items. Limited time offer.
              </p>
            </div>
            <button
              onClick={() => router.push("/products")}
              className="bg-white cursor-pointer text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 hover:text-black transition-colors"
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex text-yellow-400 mb-4">
                <StarRating rating={5} size="lg" />
              </div>
              <p className="text-gray-600 mb-4">
                "The quality of the products exceeds my expectations. Fast
                shipping and excellent customer service!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/women/12.jpg"
                    alt="Customer"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <p className="text-gray-500 text-sm">Loyal Customer</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex text-yellow-400 mb-4">
                <StarRating rating={5} size="lg" />
              </div>
              <p className="text-gray-600 mb-4">
                "I love how easy it is to navigate the website and find exactly
                what I'm looking for. Great selection of products!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Customer"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Michael Chen</h4>
                  <p className="text-gray-500 text-sm">New Customer</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex text-yellow-400 mb-4">
                <StarRating rating={4.5} size="lg" />
              </div>
              <p className="text-gray-600 mb-4">
                "The checkout process was smooth and hassle-free. My items
                arrived earlier than expected and in perfect condition."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/women/45.jpg"
                    alt="Customer"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Emily Rodriguez</h4>
                  <p className="text-gray-500 text-sm">Repeat Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
