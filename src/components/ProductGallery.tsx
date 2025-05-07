import { useState } from "react";

interface ProductGalleryProps {
  mainImage: string;
  thumbnails: string[];
  productName: string;
}

export default function ProductGallery({
  mainImage,
  thumbnails,
  productName,
}: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(mainImage);

  const handleThumbnailClick = (imgSrc: string) => {
    setCurrentImage(imgSrc);
  };

  return (
    <div className="mb-8 lg:mb-0">
      <div className="mb-4">
        <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-square">
          <img
            src={currentImage}
            alt={productName}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {thumbnails.map((thumbnail, index) => (
          <div
            key={index}
            className={`rounded-lg overflow-hidden ${
              currentImage === thumbnail
                ? "border-2 border-blue-600"
                : "border border-gray-200"
            } bg-gray-100 aspect-square`}
          >
            <img
              onClick={() => handleThumbnailClick(thumbnail)}
              src={thumbnail}
              alt={`${productName} thumbnail ${index + 1}`}
              className="w-full h-full object-cover cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
