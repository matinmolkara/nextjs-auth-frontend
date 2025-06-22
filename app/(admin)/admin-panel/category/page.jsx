"use client";
export const dynamic = "force-dynamic";
import React, { useState, useEffect } from "react";
import {
  getCategories, // This will need to be updated in your api.js
  deleteCategory,
  getProductCategoriesByCategoryId,
} from "@/app/api/api";
import Link from "next/link";

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]); // To store all categories for parent name lookup
  const [search, setSearch] = useState("");
  const [level1Filter, setLevel1Filter] = useState("");
  const [level2Filter, setLevel2Filter] = useState("");
  const [level3Filter, setLevel3Filter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 15;

  // Helper to get category name by ID
  const getCategoryName = (categoryId) => {
    const category = allCategories.find((cat) => cat.id === categoryId);
    return category ? category.name : "---";
  };

  // Function to determine category level (assuming parent_id is null for level 1)
  const getCategoryLevel = (categoryId) => {
    let level = 0;
    let currentCategory = allCategories.find((cat) => cat.id === categoryId);
    while (currentCategory && currentCategory.parent_id !== null) {
      level++;
      currentCategory = allCategories.find(
        (cat) => cat.id === currentCategory.parent_id
      );
    }
    return level + 1; // Level 1 for top-level categories
  };

  const fetchCategories = async () => {
    try {
      // اول همه دسته‌بندی‌ها برای فیلترها (بدون صفحه‌بندی)
      const allDataResponse = await getCategories({ pageSize: 1000 }); // یا all=true در API شما
      setAllCategories(allDataResponse.categories);

      // سپس گرفتن دسته‌بندی‌ها برای جدول با صفحه‌بندی
      const response = await getCategories({
        search,
        level1_id: level1Filter || undefined,
        level2_id: level2Filter || undefined,
        level3_id: level3Filter || undefined,
        page: currentPage,
        pageSize,
      });

      setCategories(response.categories);
      setTotalCount(response.totalCount);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  

  const handleDelete = async (categoryId) => {
    const confirmDelete = window.confirm(
      "آیا مطمئن هستید؟ این عملیات برگشت‌پذیر نیست!"
    );
    if (!confirmDelete) return;

    // Check for child categories
    const hasChildren = allCategories.some((c) => c.parent_id === categoryId);
    if (hasChildren) {
      alert("این دسته‌بندی دارای زیردسته است و قابل حذف نیست.");
      return;
    }

    // Check for associated products
    try {
      const products = await getProductCategoriesByCategoryId(categoryId);
      if (products.length > 0) {
        alert("این دسته‌بندی به محصولات متصل است و قابل حذف نیست.");
        return;
      }

      await deleteCategory(categoryId);
      fetchCategories(); // Re-fetch categories after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [search, level1Filter, level2Filter, level3Filter, currentPage]);

  const totalPages = Math.ceil(totalCount / pageSize);

  // Filter options for Level 1, 2, and 3 categories
  const level1Categories = allCategories.filter(
    (cat) => cat.parent_id === null
  );
  const level2Categories = allCategories.filter(
    (cat) => cat.parent_id === parseInt(level1Filter)
  );
  const level3Categories = allCategories.filter(
    (cat) => cat.parent_id === parseInt(level2Filter)
  );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>مدیریت دسته‌بندی‌ها</h3>
        <Link href="/admin-panel/dashboard" className="btn btn-outline-dark">
          <i className="bi bi-house-door me-1"></i> بازگشت به داشبورد
        </Link>
      </div>

      {/* Filters and Add New Category Button */}
      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="جستجو براساس عنوان دسته‌بندی"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={level1Filter}
            onChange={(e) => {
              setLevel1Filter(e.target.value);
              setLevel2Filter(""); // Reset lower level filters
              setLevel3Filter("");
              setCurrentPage(1);
            }}
          >
            <option value="">دسته بندی سطح 1</option>
            {level1Categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={level2Filter}
            onChange={(e) => {
              setLevel2Filter(e.target.value);
              setLevel3Filter(""); // Reset lower level filters
              setCurrentPage(1);
            }}
            disabled={!level1Filter} // Disable if no level 1 filter is selected
          >
            <option value="">دسته بندی سطح 2</option>
            {level2Categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={level3Filter}
            onChange={(e) => {
              setLevel3Filter(e.target.value);
              setCurrentPage(1);
            }}
            disabled={!level2Filter} // Disable if no level 2 filter is selected
          >
            <option value="">دسته بندی سطح 3</option>
            {level3Categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <Link
            href="/admin-panel/category/new"
            className="btn btn-sm btn-primary w-100"
          >
            <i className="bi bi-plus-lg"></i> افزودن دسته‌بندی
          </Link>
        </div>
      </div>

      {/* Categories Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>عنوان</th>
              <th>والد</th>
              <th>سطح</th>
              <th className="text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  دسته‌بندی یافت نشد
                </td>
              </tr>
            ) : (
              categories.map((c, index) => (
                <tr key={c.id}>
                  <td>{(currentPage - 1) * pageSize + index + 1}</td>
                  <td>{c.name}</td>
                  <td>
                    {c.parent_id
                      ? getCategoryName(c.parent_id)
                      : "دسته بندی اصلی"}
                  </td>
                  <td>{getCategoryLevel(c.id)}</td>
                  <td className="d-flex justify-content-center">
                    <Link
                      href={`/admin-panel/category/${c.id}/edit`}
                      className="btn btn-sm btn-primary me-2"
                    >
                      ✏️
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(c.id)}
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

      {/* Pagination */}
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

export default CategoryListPage;
