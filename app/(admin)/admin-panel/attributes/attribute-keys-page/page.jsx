"use client";
import React, { useEffect, useState } from "react";
import {
  getAllAttributes,
  createAttributeKey,
  deleteAttributeKey,
} from "@/app/api/api";
import Section from "@/components/admin/products/Section";
import Link from "next/link";
const AttributeKeysPage = () => {
  const [attributes, setAttributes] = useState([]);
  const [newAttrName, setNewAttrName] = useState("");
  const [newAttrType, setNewAttrType] = useState("text");
  const [isCustom, setIsCustom] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const fetchAttributes = async () => {
    try {
      const data = await getAllAttributes();
      setAttributes(data || []);
    } catch (err) {
      console.error("خطا در دریافت ویژگی‌ها:", err);
    }
  };

  useEffect(() => {
    fetchAttributes();
  }, []);

  const handleAddAttribute = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    if (!newAttrName.trim()) {
      setFormError("نام ویژگی الزامی است.");
      return;
    }
    try {
      await createAttributeKey({
        name: newAttrName,
        input_type: newAttrType,
        is_custom: isCustom,
      });
      setFormSuccess("ویژگی با موفقیت ثبت شد.");
      setNewAttrName("");
      setNewAttrType("text");
      setIsCustom(false);
      fetchAttributes();
    } catch {
      setFormError("خطا در ثبت ویژگی.");
    }
  };

  const handleDeleteAttribute = async (id) => {
    if (!window.confirm("حذف شود؟")) return;
    await deleteAttributeKey(id);
    fetchAttributes();
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3> مدیریت ویژگی های </h3>
        <Link href="/admin-panel/dashboard" className="btn btn-outline-dark">
          <i className="bi bi-house-door me-1"></i> بازگشت به داشبورد
        </Link>
      </div>

      <form onSubmit={handleAddAttribute}>
        <Section title="افزودن ویژگی جدید" id="section-add-attr">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label">نام ویژگی</label>
              <input
                className="form-control"
                value={newAttrName}
                onChange={(e) => setNewAttrName(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">نوع ورودی</label>
              <select
                className="form-select"
                value={newAttrType}
                onChange={(e) => setNewAttrType(e.target.value)}
              >
                <option value="text">متنی</option>
                <option value="number">عدد</option>
                <option value="select">انتخابی</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">ویژگی خاص؟</label>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={isCustom}
                  onChange={() => setIsCustom(!isCustom)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <button className="btn btn-primary w-100">افزودن</button>
            </div>
          </div>
        </Section>
      </form>

      <Section title="لیست ویژگی‌ها">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>نام</th>
              <th>نوع</th>
              <th>خاص؟</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {attributes.map((a, i) => (
              <tr key={a.id}>
                <td>{i + 1}</td>
                <td>{a.name}</td>
                <td>{a.input_type}</td>
                <td>{a.is_custom ? "بله" : "خیر"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteAttribute(a.id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
};

export default AttributeKeysPage;
