import React, { useEffect, useState } from "react";
import Link from "next/link";
// فرضی: این APIها باید تعریف شده باشند
import { getPages, deletePage } from "@/app/api/api"; // مسیر دلخواهت باشه

const PageContentManager = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = async () => {
    const res = await getPages();

    setPages(res.data || []);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("آیا از حذف این صفحه مطمئن هستید؟")) {
      await deletePage(id);
      fetchPages();
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">مدیریت محتوای صفحات</h4>
        <Link href="/admin-panel/site-management" className="btn btn-outline-primary">+ افزودن صفحه جدید</Link>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" />
        </div>
      ) : pages.length === 0 ? (
        <div className="alert alert-info">هیچ صفحه‌ای ثبت نشده است.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>عنوان صفحه</th>
                <th>وضعیت</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page, index) => (
                <tr key={page.id}>
                  <td>{index + 1}</td>
                  <td>{page.title}</td>
                  <td>
                    {page.published ? (
                      <span className="badge bg-success">منتشر شده</span>
                    ) : (
                      <span className="badge bg-secondary">پیش‌نویس</span>
                    )}
                  </td>
                  <td>
                    <Link href="/admin-panel/site-management/homepage/edit" className="btn btn-sm btn-outline-warning me-2">
                      ویرایش
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(page.id)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PageContentManager;
