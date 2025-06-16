
"use client";
import React, { useState, useEffect } from "react";
import { getBrandById, updateBrand } from "@/app/api/api";
import Section from "@/components/admin/products/Section";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const BrandEditPage = () => {
  const [brandName, setBrandName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    const fetchBrand = async () => {
      
      try {
        const brand = await getBrandById(id);
        setBrandName(brand.name);
      } catch (err) {
        setError("در دریافت اطلاعات برند خطایی رخ داده است.");
        console.error("Error fetching brand:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBrand();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateBrand(id, brandName);
      router.push("/brand"); // بازگشت به لیست برندها
    } catch (err) {
      setError("در ویرایش برند خطایی رخ داده است.");
    }
  };

  if (loading) return <div>در حال دریافت اطلاعات...</div>;

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>مدیریت برند ها</h3>
        <Link href="/admin-panel/brand" className="btn btn-outline-dark">
          <i className="bi bi-tag"></i> بازگشت به لیست برندها
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <Section title="ویرایش برند" id="section-edit-brand">
          <div className="row">
            <div className="col-md-12">
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3">
                <label htmlFor="brandName" className="form-label">
                  نام برند
                </label>
                <input
                  type="text"
                  id="brandName"
                  className="form-control"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
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

export default BrandEditPage;
