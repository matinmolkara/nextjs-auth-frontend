"use client";
import React, { useState, useContext, useEffect } from "react";
import { ProductContext } from "@/context/ProductContext";
import { usePathname } from "next/navigation";

import SectionTitle from "@/components/SectionTitle";
import ProductCard from "@/components/productlist/ProductCard";
import ProductImages from "@/components/product/ProductImages";
import ProductDetails from "@/components/product/ProductDetails";
import ProductOptions from "@/components/product/ProductOptions";
import AddToCart from "@/components/product/AddToCart";
import ProductTabs from "@/components/product/ProductTabs";

const Page = () => {
  const { products, getProductById, comments, relatedProducts } =
    useContext(ProductContext);
  const pathname = usePathname();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
     if (!products.length) return;
    const pathParts = pathname.split("/");
    const productId = pathParts[pathParts.length - 1];
    console.log("Product ID از URL:", productId);

    const foundProduct = getProductById(productId);
 
        if (foundProduct) setProduct(foundProduct);
     
  }, [pathname,getProductById,products]);

  if (!product) {
    return <p>محصول یافت نشد!</p>;
  }

  return (
    <div>
      <div className="product">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-5">
              <ProductImages images={product.image_urls} />
              {console.log(product.image_urls)}
            </div>
            <div className="col-12 col-lg-7">
              <ProductDetails product={product} comments={comments.length} />
              <ProductOptions
                productId={product.id}
                onColorSelect={setSelectedColor}
                onSizeSelect={setSelectedSize}
              />
              <AddToCart
                product={product}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
              />
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-12">
              <ProductTabs comments={comments} />
            </div>
          </div>
        </div>
        <SectionTitle title="محصولات مرتبط" />
        <div className="container">
          <div className="row">
            {relatedProducts.map((relatedProduct, index) => (
              <ProductCard key={index} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
