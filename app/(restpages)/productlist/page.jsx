"use client"
import React, { useContext } from "react";
import { ProductContext } from "@/context/ProductContext";

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
   
   const {products,filteredProducts, handleFilterChange} = useContext(ProductContext);

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
                <Pagination totalPages={5} products={products}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList