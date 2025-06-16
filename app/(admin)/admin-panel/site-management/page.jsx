"use client"
import React, { useState } from "react";
import { createPage, updatePage } from "@/app/api/api";


const PageForm = ({ mode = "create", pageData = {}, onSuccess }) => {
  const [slug, setSlug] = useState(pageData.slug || "");
  const [title, setTitle] = useState(pageData.title || "");
  const [content, setContent] = useState(
    JSON.stringify(pageData.content || {}, null, 2)
  );
  const [published, setPublished] = useState(!!pageData.published);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = {
        slug,
        title,
        content: JSON.parse(content),
        published,
      };

      let result;
      if (mode === "edit") {
        result = await updatePage(pageData.id, payload);
      } else {
        result = await createPage(payload);
      }

      onSuccess?.(result.data);
    } catch (err) {
      setError("خطا در ذخیره‌سازی اطلاعات");
      console.error("PageForm Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
        <h5 className="fw-bold mb-3">
          {mode === "edit" ? "ویرایش صفحه" : "افزودن صفحه جدید"}
        </h5>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Slug</label>
          <input
            type="text"
            className="form-control"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">عنوان</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">محتوا (فرمت JSON)</label>
          <textarea
            className="form-control"
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="published">
            انتشار
          </label>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading
            ? "در حال ذخیره‌سازی..."
            : mode === "edit"
            ? "بروزرسانی صفحه"
            : "افزودن صفحه"}
        </button>
      </form>
   
    </div>
  );
};

export default PageForm;
