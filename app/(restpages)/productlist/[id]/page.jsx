"use client"
import React ,{ useState,useContext } from "react";
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
  const { getProductById, comments, productImages, relatedProducts } =
    useContext(ProductContext); // دریافت تابع از Context
 const pathname = usePathname(); // مسیر کامل URL

 // استخراج شناسه محصول از `pathname`
 const pathParts = pathname.split("/"); // مسیر را به آرایه تقسیم می‌کنیم
 const productId = pathParts[pathParts.length - 1]; // بخش آخر مسیر، شناسه محصول است

 // دریافت محصول بر اساس شناسه
 const product = getProductById(productId);
const [selectedColor, setSelectedColor] = useState(null);
const [selectedSize, setSelectedSize] = useState(null);
  // اگر محصول پیدا نشد
  if (!product) {
    return <p>محصول یافت نشد!</p>;
  }

  return (
    <div>
      <div className="product">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-5">
              <ProductImages images={productImages} />
            </div>
            <div className="col-12 col-lg-7">
              <ProductDetails comments={comments.length} />
              <ProductOptions
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
            {relatedProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
