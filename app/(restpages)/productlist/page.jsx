"use client"
import React, { useContext, useEffect } from "react";
import { ProductContext } from "@/context/ProductContext";
import { useSearchParams } from 'next/navigation'; // اضافه کردن useSearchParams

import "../../../styles/product.css";
import "../../../styles/productlist.css";
import { FilterProduct } from '@/components/productlist/FilterProduct';
import BrandList from '@/components/productlist/BrandList';
import PriceRange from '@/components/productlist/PriceRange';

import SpecialOffer from '@/components/productlist/SpecialOffer';
import AvailableProduct from '@/components/productlist/AvailableProduct';
import Advertise from '@/components/Advertise';
import ListControl from '@/components/productlist/ListControl';
import Pagination from '@/components/productlist/Pagination';




const ProductList = () => {
  const searchParams = useSearchParams(); // استفاده از useSearchParams
  const categoryId = searchParams.get("categoryId"); // گرفتن categoryId از URL

  const { filteredProducts, handleFilterChange, fetchProducts } =
    useContext(ProductContext);

  // اضافه کردن useEffect برای دریافت محصولات بر اساس categoryId هنگام تغییر آن
  useEffect(() => {
    if (categoryId) {
      // فراخوانی تابعی در ProductContext برای فیلتر/دریافت محصولات بر اساس categoryId
      // شما باید این منطق را در ProductContext خود پیاده سازی کنید
      fetchProducts({ categoryId: categoryId }); // مثال: فرض کنید تابع fetchProducts یک آبجکت فیلتر می پذیرد
    } else {
      // اگر categoryId در URL نبود، شاید همه محصولات را نمایش دهید
      // یا منطق پیش فرض دیگری داشته باشید
      fetchProducts({}); // مثال: دریافت همه محصولات
    }
  }, [categoryId, fetchProducts]); // وابسته به categoryId و fetchProducts تا با تغییر آنها مجددا اجرا شود

  return (
    <>
      <div className="gap"></div>
      <div className="productList">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-2">
              <FilterProduct title="فیلترها" />
              <FilterProduct title="انتخاب برند">
                <BrandList />
              </FilterProduct>
              <FilterProduct title="محدوده قیمت">
                <PriceRange />
              </FilterProduct>

              <FilterProduct>
                <SpecialOffer />
              </FilterProduct>
              <FilterProduct>
                <AvailableProduct />
              </FilterProduct>
            </div>
            <div className="col-12 col-lg-10">
              <div className="productlist-advertise">
                <Advertise />
              </div>
              <ListControl
                products={filteredProducts}
                onFilterChange={handleFilterChange}
              />
              <div className="container product-list-grid">
                <Pagination
                  totalPages={5}
                  products={filteredProducts}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList