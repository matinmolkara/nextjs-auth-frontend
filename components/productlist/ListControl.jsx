import React, { useState } from "react";

const ListControl = ({ products, onFilterChange }) => {
  const [sortOption, setSortOption] = useState("default");
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    onFilterChange(value); // ارسال نوع فیلتر به کامپوننت والد
  };

  const totalProducts = products.length;
  const productsPerPage = 24;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  return (
    <div className="product-list-control">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="product-list-control-filter">
              <div className="product-list-control-filter-icon">
                <span>
                  <i className="bi bi-sort-down"></i>
                  مرتب سازی بر اساس:
                </span>
              </div>
              <div className="product-list-control-filter-icon me-auto">
                <div className="category-filter-section-1">
                  <select
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    value={sortOption}
                    onChange={handleSortChange}
                  >
                    <option value="default">مرتب سازی پیش فرض</option>
                    <option value="price">مرتب سازی بر اساس قیمت</option>
                    <option value="newest">مرتب سازی بر اساس جدیدترین</option>
                    <option value="bestseller">
                      مرتب سازی بر اساس پر فروش ترین
                    </option>
                  </select>
                </div>
              </div>
              <div className="product-list-control-filter-icon">
                <div className="category-filter-section-0">
                  <span> نمایش </span>
                  <span> 1-{Math.min(productsPerPage, totalProducts)} </span>
                  <span className="ms-2"> از {totalProducts} نتیجه </span>
                  <span className="ms-3"> | تعداد صفحات: {totalPages} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListControl