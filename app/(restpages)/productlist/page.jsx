"use client";
import React, { Suspense, useContext, useEffect } from "react";
import { ProductContext } from "@/context/ProductContext";
import { useSearchParams } from "next/navigation";

import "../../../styles/product.css";
import "../../../styles/productlist.css";
import { FilterProduct } from "@/components/productlist/FilterProduct";
import BrandList from "@/components/productlist/BrandList";
import PriceRange from "@/components/productlist/PriceRange";
import SpecialOffer from "@/components/productlist/SpecialOffer";
import AvailableProduct from "@/components/productlist/AvailableProduct";
// import BestSeller from "@/components/productlist/BestSeller"; // 💡 جدید
import Advertise from "@/components/Advertise";
import ListControl from "@/components/productlist/ListControl";
import Pagination from "@/components/productlist/Pagination";

const ProductList = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const brand = searchParams.get("brand");
  const available = searchParams.get("available");
  const discount = searchParams.get("discount");
  const bestSeller = searchParams.get("bestSeller");

  const { filteredProducts, handleFilterChange, fetchProducts } =
    useContext(ProductContext);

  useEffect(() => {
    const filters = {
      categoryId: categoryId || null,
      brand: brand || null,
      available: available === "true",
      discount: discount === "true",
      bestSeller: bestSeller === "true",
    };
    fetchProducts(filters);
  }, [categoryId, brand, available, discount, bestSeller, fetchProducts]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="gap"></div>
      <div className="productList">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-2">
              <FilterProduct title="فیلترها" />
              <FilterProduct title="انتخاب برند">
                <BrandList />
              </FilterProduct>
              <FilterProduct>
                <SpecialOffer />
              </FilterProduct>
              <FilterProduct>
                <AvailableProduct />
              </FilterProduct>
              {/* <FilterProduct>
                {" "}
           
                <BestSeller />
              </FilterProduct> */}
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
                <Pagination totalPages={5} products={filteredProducts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ProductList;
