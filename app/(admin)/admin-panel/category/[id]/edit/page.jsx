"use client";
import React, { useState, useEffect } from "react";
import { getCategoryById, updateCategory } from "@/app/api/api";
import Section from "@/components/admin/products/Section";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
const CategoryEditPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [parentId, setParentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const category = await getCategoryById(id);
        setCategoryName(category.name);
        setParentId(category.parent_id);
      } catch (err) {
        setError("در دریافت اطلاعات دسته بندی خطایی رخ داده است.");
        console.error("Error fetching category:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCategory();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateCategory(id, { name: categoryName, parent_id: parentId });
      router.push("/admin-panel/category"); // بازگشت به لیست دسته بندیها
    } catch (err) {
      setError("در ویرایش دسته بندی خطایی رخ داده است.");
    }
  };

  if (loading) return <div>در حال دریافت اطلاعات...</div>;

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>ویرایش دسته بندی</h3>
        <Link href="/admin-panel/category" className="btn btn-outline-dark">
          <i className="bi bi-folder"></i> بازگشت به لیست دسته بندی
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <Section title="ویرایش دسته بندی" id="section-edit-category">
          <div className="row">
            <div className="col-md-12">
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3">
                <label htmlFor="categoryName" className="form-label">
                  نام دسته بندی
                </label>
                <input
                  type="text"
                  id="categoryName"
                  className="form-control"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="مثال: نایک"
                  required
                />
              </div>

              <button type="submit" className="btn btn-success">
                ذخیره تغییرات
              </button>
            </div>
          </div>
        </Section>
      </form>
    </div>
  );
};

export default CategoryEditPage;
