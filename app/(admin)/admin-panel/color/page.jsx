"use client";
import React, { useEffect, useState } from "react";
import { getColors, createColor } from "@/app/api/api";
import Section from "@/components/admin/products/Section";
import Link from "next/link";
const ColorsPage = () => {
  const [colors, setColors] = useState([]);
  const [filteredColors, setFilteredColors] = useState([]);
  const [colorName, setColorName] = useState("");
  const [colorCode, setColorCode] = useState("#000000");
  const [searchQuery, setSearchQuery] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const fetchColors = async () => {
    const data = await getColors();
    setColors(data || []);
    setFilteredColors(data || []);
  };

  useEffect(() => {
    fetchColors();
  }, []);

  const handleAddColor = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!colorName.trim()) {
      setFormError("نام رنگ الزامی است.");
      return;
    }

    if (!/^#[0-9A-F]{6}$/i.test(colorCode)) {
      setFormError("کد رنگ معتبر نیست (مثال: #FF0000).");
      return;
    }

    try {
      await createColor(colorName.trim(), colorCode);
      setFormSuccess("رنگ با موفقیت افزوده شد.");
      setColorName("");
      setColorCode("#000000");
      fetchColors();
    } catch {
      setFormError("خطا در افزودن رنگ.");
    }
  };

  const handleSearch = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    const filtered = colors.filter(
      (c) =>
        c.name.toLowerCase().includes(q.toLowerCase()) ||
        c.code.toLowerCase().includes(q.toLowerCase())
    );
    setFilteredColors(filtered);
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>مدیریت رنگ ها</h3>
        <Link href="/admin-panel/dashboard" className="btn btn-outline-dark">
          <i className="bi bi-house-door me-1"></i> بازگشت به داشبورد
        </Link>
      </div>

      <form onSubmit={handleAddColor}>
        <Section title="افزودن رنگ جدید" id="section-add-color">
          <div className="row g-3 align-items-end">
            <div className="col-md-5">
              <label className="form-label">نام رنگ</label>
              <input
                className="form-control"
                value={colorName}
                onChange={(e) => setColorName(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">کد رنگ (HEX)</label>
              <input
                type="color"
                className="form-control form-control-color"
                value={colorCode}
                onChange={(e) => setColorCode(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <button className="btn btn-primary w-100">افزودن</button>
            </div>
          </div>
          {formError && <p className="text-danger mt-3">{formError}</p>}
          {formSuccess && <p className="text-success mt-3">{formSuccess}</p>}
        </Section>
      </form>

      <Section title="لیست رنگ‌ها">
        <div className="mb-3">
          <input
            className="form-control"
            placeholder="جستجو بر اساس نام یا کد رنگ..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>نام رنگ</th>
              <th>کد رنگ</th>
              <th>پیش‌نمایش</th>
            </tr>
          </thead>
          <tbody>
            {filteredColors.map((color, i) => (
              <tr key={color.id}>
                <td>{i + 1}</td>
                <td>{color.name}</td>
                <td>{color.code}</td>
                <td>
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      backgroundColor: color.code,
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  ></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
};

export default ColorsPage;
