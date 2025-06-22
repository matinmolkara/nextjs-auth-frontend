"use client";
export const dynamic = "force-dynamic";
import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "@/context/ProductContext";
import { getAllAttributes, saveCategoryAttributes } from "@/app/api/api";
import Section from "@/components/admin/products/Section";
import Link from "next/link";
const CategoryAttributesPage = () => {
  const { categories } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  useEffect(() => {
    getAllAttributes().then((data) =>
      setAttributes((data || []))
    );
  }, []);

  const handleAddAttribute = () => {
    setSelectedAttributes([
      ...selectedAttributes,
      { id: Date.now(), attribute_id: "", is_required: false },
    ]);
  };

  const handleRemoveAttribute = (id) => {
    setSelectedAttributes((prev) => prev.filter((a) => a.id !== id));
  };

  const handleChange = (id, field, value) => {
    setSelectedAttributes((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      selectedAttributes.some(
        (a) => !a.attribute_id || isNaN(Number(a.attribute_id))
      )
    ) {
      setFormErrors({ attributes: "همه ویژگی‌ها باید انتخاب شوند." });
      return;
    }
    await saveCategoryAttributes({
      category_id: selectedCategory,
      attributes: selectedAttributes.map((a) => ({
        attribute_id: a.attribute_id,
        is_required: a.is_required,
      })),
    });
    alert("ویژگی‌ها ذخیره شد");
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>ویزگی های مشترک دسته بندی ها</h3>
        <Link href="/admin-panel/dashboard" className="btn btn-outline-dark">
          <i className="bi bi-house-door me-1"></i> بازگشت به داشبورد
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <Section title="انتخاب دسته‌بندی">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- انتخاب دسته‌بندی --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </Section>

        <Section title="ویژگی‌ها">
          {selectedAttributes.map((attr) => (
            <div key={attr.id} className="row mb-3">
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={attr.attribute_id}
                  onChange={(e) =>
                    handleChange(attr.id, "attribute_id", e.target.value)
                  }
                >
                  <option value="">-- انتخاب ویژگی --</option>
                  {attributes.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={attr.is_required}
                  onChange={(e) =>
                    handleChange(attr.id, "is_required", e.target.checked)
                  }
                />
                <label className="ms-2">اجباری باشد؟</label>
              </div>
              <div className="col-md-3">
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleRemoveAttribute(attr.id)}
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAddAttribute}
          >
            + افزودن ویژگی
          </button>
        </Section>

        <div className="mt-4">
          <button className="btn btn-primary" type="submit">
            ذخیره
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryAttributesPage;
