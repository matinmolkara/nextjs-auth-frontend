// app/brands/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { getBrands, deleteBrand, getProductsByBrandId } from "@/app/api/api";
import Link from "next/link";

const BrandListPage = () => {
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 15;

  const fetchBrands = async () => {
    try {
      const response = await getBrands({
        search,
        page: currentPage,
        pageSize,
      });
      setBrands(response.brands);
      setTotalCount(response.totalCount);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const handleDelete = async (brandId) => {
    const confirmDelete = window.confirm("آیا از حذف برند مطمئن هستید؟");
    if (!confirmDelete) return;

    try {
      const products = await getProductsByBrandId(brandId);
      if (products.length > 0) {
        alert("این برند دارای محصول است و قابل حذف نیست.");
        return;
      }

      await deleteBrand(brandId);
      fetchBrands();
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [search, currentPage]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>مدیریت برندها</h3>
        <Link href="/admin-panel/dashboard" className="btn btn-outline-dark">
          <i className="bi bi-house-door me-1"></i> بازگشت به داشبورد
        </Link>
      </div>

      {/* فیلتر و افزودن */}
      <div className="row g-3 mb-3">
        <div className="col-md-10">
          <input
            type="text"
            className="form-control"
            placeholder="جستجو براساس عنوان برند"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="col-md-2">
          <Link
            href="/admin-panel/brand/new"
            className="btn btn-sm btn-primary w-100"
          >
            <i className="bi bi-plus-lg"></i> افزودن برند
          </Link>
        </div>
      </div>

      {/* جدول برندها */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>عنوان</th>
              <th className="text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {brands.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">
                  برندی یافت نشد
                </td>
              </tr>
            ) : (
              brands.map((b, index) => (
                <tr key={b.id}>
                  <td>{(currentPage - 1) * pageSize + index + 1}</td>
                  <td>{b.name}</td>
                  <td className="d-flex justify-content-center">
                    <Link
                      href={`/admin-panel/brand/${b.id}/edit`}
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      <i className="bi bi-pen text-dark"></i>
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(b.id)}
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* صفحه‌بندی عددی */}
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

export default BrandListPage;
