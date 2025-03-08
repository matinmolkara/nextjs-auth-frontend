"use client"
// components/PaginationComponent.js

import { useState } from "react";

import ProductCard from "@/components/productlist/ProductCard";
const PaginationComponent = ({ totalPages = 6, productsPerPage = 10, products = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="container product-list-grid">
      <div className="row">
        {paginatedProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <div className="row">
        <div className="col-12">
          <div className="pagination-holder d-flex justify-content-center">
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &laquo;
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &raquo;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;
