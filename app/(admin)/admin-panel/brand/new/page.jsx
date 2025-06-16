"use client";
import React, { useState, useEffect } from "react";
import { getBrands, createBrand } from "@/app/api/api";
import Section from "@/components/admin/products/Section";
import { useRouter } from "next/navigation";
import Link from "next/link";
const BrandAddPage = () => {
  const [brandName, setBrandName] = useState("");
  const [allBrands, setAllBrands] = useState([]);
 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAllBrands = async () => {
      setLoading(true);
      try {
        const brandsData = await getBrands();
        setAllBrands(brandsData);
      } catch (err) {
        setError("در دریافت لیست دسته‌بندی‌ها خطایی رخ داده است.");
        console.error("Error fetching all brands:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBrands();
  }, []);

 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newBrand = await createBrand(brandName);

      router.push("/admin-panel/brand"); // بعد از ایجاد موفقیت‌آمیز به صفحه لیست دسته‌بندی‌ها برگرد
    } catch (err) {
      setError("در ایجاد برند خطایی رخ داده است.");
      console.error("Error creating brand:", err);
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
        <Link href="/admin-panel/brand" className="btn btn-outline-dark">
          <i className="bi bi-tag"></i> بازگشت به برندها
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <Section title="افزودن برند جدید" id="section-new-brand">
          <div className="row">
            <div className="col-md-12">
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
                  placeholder="مثال: نام برند را وارد کنید مثلا نایک"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                افزودن برند
              </button>
            </div>
          </div>
        </Section>
      </form>
    </div>
  );
};

export default BrandAddPage;
