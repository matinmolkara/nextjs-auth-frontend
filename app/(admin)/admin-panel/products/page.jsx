// app/products/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { getProducts, getCategories } from "@/app/api/api";
import Link from "next/link";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 15;




  const fetchProducts = async () => {
    const response = await getProducts({
      search,
      categoryId: categoryFilter || undefined,
      page: currentPage,
      pageSize,
    });
    setProducts(response.products);
    setTotalCount(response.totalCount);
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories({ pageSize: 1000 });
      
      setCategories(data.categories);

    } catch (error) {
      console.error("خطا در دریافت دسته‌بندی‌ها:", error);
    }
  };

  // const handleDelete = async (id) => {
  //   if (!confirm("آیا از حذف این محصول مطمئن هستید؟")) return;
  //   await deleteProduct(id);
  //   fetchProducts();
  // };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "---";
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [search, categoryFilter, currentPage]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>مدیریت محصولات</h3>
        <Link href="/admin-panel/dashboard" className="btn btn-outline-dark">
          <i className="bi bi-house-door me-1"></i> بازگشت به داشبورد
        </Link>
      </div>

      {/* فیلترها */}
      <div className="row g-3 mb-3">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="جستجو براساس عنوان محصول"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="col-md-5">
          <select
            className="form-select"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">همه دسته‌بندی‌ها</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <Link
            href="/admin-panel/products/new"
            className="btn btn-sm btn-primary w-100"
          >
            <i className="bi bi-plus-lg"></i> افزودن محصول
          </Link>
        </div>
      </div>

      {/* جدول محصولات */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>عنوان</th>
              <th>دسته‌بندی</th>
              <th>قیمت</th>
              <th className="text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  محصولی یافت نشد
                </td>
              </tr>
            ) : (
              products.map((p, index) => (
                <tr key={p.id}>
                  <td>{(currentPage - 1) * pageSize + index + 1}</td>
                  <td>{p.title}</td>
                  <td>{getCategoryName(p.category_id)}</td>
                  <td>{p.real_price} تومان</td>
                  <td className="d-flex justify-content-center">
                    <Link
                      href={`/admin-panel/products/${p.id}/edit`}
                      className="btn btn-sm btn-primary me-2"
                    >
                      ✏️
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(p.id)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* صفحه‌بندی */}
      <nav className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              قبلی
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              if (totalPages <= 6) return true;
              if (currentPage <= 3) return page <= 5;
              if (currentPage >= totalPages - 2) return page >= totalPages - 4;
              return Math.abs(page - currentPage) <= 2;
            })
            .map((page) => (
              <li
                key={page}
                className={`page-item ${currentPage === page ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              </li>
            ))}

          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              بعدی
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductListPage;
