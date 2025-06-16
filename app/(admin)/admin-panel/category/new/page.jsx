"use client";
import React, { useState, useEffect } from "react";
import { getCategories, createCategory } from "@/app/api/api";
import Section from "@/components/admin/products/Section";
import { useRouter } from "next/navigation";
import Link from "next/link";
const CategoryAddPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [parent_id, setParentId] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [parentName, setParentName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAllCategories = async () => {
      setLoading(true);
      try {
        const categoriesData = await getCategories();
        setAllCategories(categoriesData.categories);
      } catch (err) {
        setError("در دریافت لیست دسته‌بندی‌ها خطایی رخ داده است.");
        console.error("Error fetching all categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategories();
  }, []);

  const handleParentChange = (event) => {
    const selectedName = event.target.value;
    setParentName(selectedName);
    const selectedCategory = allCategories.find(
      (cat) => cat.name === selectedName
    );
    setParentId(selectedCategory ? selectedCategory.id : null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newCategory = await createCategory(categoryName, parent_id);

      router.push("/category"); // بعد از ایجاد موفقیت‌آمیز به صفحه لیست دسته‌بندی‌ها برگرد
    } catch (err) {
      setError("در ایجاد دسته بندی خطایی رخ داده است.");
      console.error("Error creating category:", err);
    }
  };

  if (loading) {
    return <div>در حال دریافت اطلاعات...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>افزودن دسته بندی</h3>
        <Link href="/admin-panel/category" className="btn btn-outline-dark">
          <i className="bi bi-folder"></i> بازگشت به لیست دسته بندی
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <Section title="افزودن دسته بندی جدید" id="section-new-category">
          <div className="row">
            <div className="col-md-12">
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
                  placeholder="مثال: نام دسته بندی را وارد کنید مثلا کفش زنانه"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="parentCategory" className="form-label">
                  والد (اختیاری)
                </label>
                <select
                  id="parentCategory"
                  className="form-select"
                  value={parentName}
                  onChange={handleParentChange}
                >
                  <option value="">دسته بندی اصلی</option>
                  {allCategories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <small className="form-text text-muted">
                  اگر این دسته بندی سطح اول است، گزینه &apos;دسته بندی
                  اصلی&apos; را انتخاب کنید.
                </small>
              </div>

              <button type="submit" className="btn btn-primary">
                افزودن دسته بندی
              </button>
            </div>
          </div>
        </Section>
      </form>
    </div>
  );
};

export default CategoryAddPage;
