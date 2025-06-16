"use client";
import React, { useEffect, useState } from "react";
import { getSizes, createSize, deleteSize } from "@/app/api/api";
import Section from "@/components/admin/products/Section";
import Link from "next/link";
const SizesPage = () => {
  const [sizes, setSizes] = useState([]);
  const [filteredSizes, setFilteredSizes] = useState([]);
  const [sizeName, setSizeName] = useState("");
  const [sizeType, setSizeType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const fetchSizes = async () => {
    const data = await getSizes();
    setSizes(data || []);
    setFilteredSizes(data || []);
  };

  useEffect(() => {
    fetchSizes();
  }, []);

  const handleAddSize = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!sizeName.trim() || !sizeType.trim()) {
      setFormError("نام سایز و نوع آن الزامی است.");
      return;
    }

    try {
      await createSize(sizeName.trim(), sizeType.trim());
      setFormSuccess("سایز با موفقیت افزوده شد.");
      setSizeName("");
      setSizeType("");
      fetchSizes();
    } catch {
      setFormError("خطا در افزودن سایز.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("آیا از حذف مطمئن هستید؟")) return;
    try {
      await deleteSize(id);
      fetchSizes();
    } catch {
      alert("خطا در حذف سایز.");
    }
  };

  const handleSearch = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    const filtered = sizes.filter(
      (s) =>
        s.size.toLowerCase().includes(q.toLowerCase()) ||
        s.type.toLowerCase().includes(q.toLowerCase())
    );
    setFilteredSizes(filtered);
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>مدیریت سایز ها</h3>
        <Link href="/admin-panel/dashboard" className="btn btn-outline-dark">
          <i className="bi bi-house-door me-1"></i> بازگشت به داشبورد
        </Link>
      </div>

      <form onSubmit={handleAddSize}>
        <Section title="افزودن سایز جدید" id="section-add-size">
          <div className="row g-3 align-items-end">
            <div className="col-md-5">
              <label className="form-label">نام سایز</label>
              <input
                className="form-control"
                value={sizeName}
                onChange={(e) => setSizeName(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">نوع سایز (مثلاً کفش، لباس)</label>
              <input
                className="form-control"
                value={sizeType}
                onChange={(e) => setSizeType(e.target.value)}
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

      <Section title="لیست سایزها">
        <div className="mb-3">
          <input
            className="form-control"
            placeholder="جستجو بر اساس نام یا نوع..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>نام سایز</th>
              <th>نوع</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredSizes.map((s, i) => (
              <tr key={s.id}>
                <td>{i + 1}</td>
                <td>{s.size}</td>
                <td>{s.type}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(s.id)}
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

export default SizesPage;
