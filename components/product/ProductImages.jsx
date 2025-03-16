"use client";
import React, { useState } from "react";
import Image from "next/image";

const ProductImages = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return <div>تصاویر موجود نیست.</div>;
  }

  return (
    <div className="container">
      <div className="mySlides">
        <Image
          src={images[currentIndex]}
          alt={`Product Image ${currentIndex + 1}`}
          width={436}
          height={407}
        />
      </div>

      <div className="row">
        {images.map((image, index) => (
          <div
            key={index}
            className={`column ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleThumbnailClick(index)}
          >
            <Image
              className="demo cursor"
              src={image}
              alt={`Thumbnail ${index + 1}`}
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
