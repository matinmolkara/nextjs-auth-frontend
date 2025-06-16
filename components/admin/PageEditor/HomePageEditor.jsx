"use client";
import React, { useEffect, useState } from "react";
import { getPageBySlug, updatePage, uploadImage } from "@/app/api/api";
import Image from "next/image";

export default function HomePageEditor() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [pageId, setPageId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const res = await getPageBySlug("home");
      setContent(res.data.content || {});
      setPageId(res.data.id);
      setLoading(false);
    })();
  }, []);

  const updateField = (section, field, value) => {
    setContent((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const updateArray = (section, items) => {
    setContent((prev) => ({
      ...prev,
      [section]: items,
    }));
  };

  const handleSave = async () => {
    await updatePage(pageId, {
      slug: "home",
      title: "صفحه اصلی",
      published: true,
      content,
    });
    setMessage("✅ با موفقیت ذخیره شد");
    setTimeout(() => setMessage(""), 2000);
  };

  if (loading) return <div className="p-5 text-center">در حال بارگذاری...</div>;

  return (
    <div className="container py-4">
      <h3 className="mb-4">🎛 مدیریت محتوای صفحه اصلی</h3>

      {/* پیام موفقیت */}
      {message && <div className="alert alert-success">{message}</div>}

      {/* HERO */}
      <section className="mb-5 border rounded p-3">
        <h5 className="fw-bold">Hero</h5>
        <div className="row g-2">
          <div className="col-md-6">
            <label className="form-label">عنوان بزرگ</label>
            <input
              className="form-control"
              value={content.hero?.title || ""}
              onChange={(e) => updateField("hero", "title", e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">زیرعنوان</label>
            <input
              className="form-control"
              value={content.hero?.subtitle || ""}
              onChange={(e) => updateField("hero", "subtitle", e.target.value)}
            />
          </div>
          <div className="col-12">
            {/* <label className="form-label">آدرس تصویر</label>
            <input
              className="form-control"
              value={content.hero?.image || ""}
              onChange={(e) => updateField("hero", "image", e.target.value)}
            /> */}

            <label className="form-label">تصویر</label>
            <input
              className="form-control mb-1"
              type="text"
              placeholder="/images/hero/..."
              value={content.hero?.image || ""}
              onChange={(e) => updateField("hero", "image", e.target.value)}
            />
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;

                const formData = new FormData();
                formData.append("file", file);

                // ارسال به API آپلود
                const res = await uploadImage( {
                  method: "POST",
                  body: formData,
                });

                const data = await res.json();
                updateField("hero", "image", data.path); // مثال: "/uploads/hero123.png"
              }}
            />
          </div>
        </div>
      </section>

      {/* BANNER */}
      <section className="mb-5 border rounded p-3">
        <h5 className="fw-bold">بنر محصولات منتخب</h5>
        {(content.banner || []).map((item, i) => (
          <div key={i} className="border rounded p-2 mb-2">
            <input
              className="form-control mb-1"
              placeholder="عنوان"
              value={item.title}
              onChange={(e) =>
                updateArray("banner", [
                  ...content.banner.slice(0, i),
                  { ...item, title: e.target.value },
                  ...content.banner.slice(i + 1),
                ])
              }
            />

            <input
              className="form-control mb-1"
              placeholder="لینک (href)"
              value={item.href}
              onChange={(e) =>
                updateArray("banner", [
                  ...content.banner.slice(0, i),
                  { ...item, href: e.target.value },
                  ...content.banner.slice(i + 1),
                ])
              }
            />
            <input
              className="form-control mb-1"
              placeholder="آدرس تصویر (imgSrc)"
              value={item.imgSrc}
              onChange={(e) =>
                updateArray("banner", [
                  ...content.banner.slice(0, i),
                  { ...item, imgSrc: e.target.value },
                  ...content.banner.slice(i + 1),
                ])
              }
            />
            <input
              className="form-control mb-1"
              placeholder="متن جایگزین (imgAlt)"
              value={item.imgAlt}
              onChange={(e) =>
                updateArray("banner", [
                  ...content.banner.slice(0, i),
                  { ...item, imgAlt: e.target.value },
                  ...content.banner.slice(i + 1),
                ])
              }
            />
            <input
              className="form-control mb-1"
              placeholder="عنوان محصول"
              value={item.title}
              onChange={(e) =>
                updateArray("banner", [
                  ...content.banner.slice(0, i),
                  { ...item, title: e.target.value },
                  ...content.banner.slice(i + 1),
                ])
              }
            />
            <input
              className="form-control mb-1"
              placeholder="قیمت اصلی (realPrice)"
              value={item.realPrice}
              onChange={(e) =>
                updateArray("banner", [
                  ...content.banner.slice(0, i),
                  { ...item, realPrice: e.target.value },
                  ...content.banner.slice(i + 1),
                ])
              }
            />
            <input
              className="form-control mb-1"
              placeholder="درصد تخفیف (offPercent)"
              value={item.offPercent}
              onChange={(e) =>
                updateArray("banner", [
                  ...content.banner.slice(0, i),
                  { ...item, offPercent: e.target.value },
                  ...content.banner.slice(i + 1),
                ])
              }
            />
            <input
              className="form-control mb-1"
              placeholder="قیمت نهایی (finalPrice)"
              value={item.finalPrice}
              onChange={(e) =>
                updateArray("banner", [
                  ...content.banner.slice(0, i),
                  { ...item, finalPrice: e.target.value },
                  ...content.banner.slice(i + 1),
                ])
              }
            />

            <div className="d-flex justify-content-end">
              <button
                className="btn btn-danger btn-sm"
                onClick={() =>
                  updateArray("banner", [
                    ...content.banner.slice(0, i),
                    ...content.banner.slice(i + 1),
                  ])
                }
              >
                حذف
              </button>
            </div>
          </div>
        ))}
        <button
          className="btn btn-outline-success"
          onClick={() =>
            updateArray("banner", [
              ...(content.banner || []),
              { title: "", image: "" },
            ])
          }
        >
          + افزودن بنر جدید
        </button>
      </section>

      {/* SERVICES */}
      <section className="mb-5 border rounded p-3">
        <h5 className="fw-bold">خدمات ما</h5>
        {(content.services || []).map((s, i) => (
          <div key={i} className="border rounded p-2 mb-2">
            <input
              className="form-control mb-1"
              placeholder="عنوان"
              value={s.title}
              onChange={(e) =>
                updateArray("services", [
                  ...content.services.slice(0, i),
                  { ...s, title: e.target.value },
                  ...content.services.slice(i + 1),
                ])
              }
            />
            <input
              className="form-control mb-1"
              placeholder="توضیح"
              value={s.desc}
              onChange={(e) =>
                updateArray("services", [
                  ...content.services.slice(0, i),
                  { ...s, desc: e.target.value },
                  ...content.services.slice(i + 1),
                ])
              }
            />
            <input
              className="form-control mb-1"
              placeholder="آدرس تصویر"
              value={s.image}
              onChange={(e) =>
                updateArray("services", [
                  ...content.services.slice(0, i),
                  { ...s, image: e.target.value },
                  ...content.services.slice(i + 1),
                ])
              }
            />
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-danger btn-sm"
                onClick={() =>
                  updateArray("services", [
                    ...content.services.slice(0, i),
                    ...content.services.slice(i + 1),
                  ])
                }
              >
                حذف
              </button>
            </div>
          </div>
        ))}
        <button
          className="btn btn-outline-success"
          onClick={() =>
            updateArray("services", [
              ...(content.services || []),
              { title: "", desc: "", image: "" },
            ])
          }
        >
          + افزودن خدمت جدید
        </button>
      </section>

      {/* FEATURED */}
      <section className="mb-5 border rounded p-3">
        <h5 className="fw-bold">محصولات ویژه</h5>
        <textarea
          className="form-control"
          rows="2"
          placeholder="[101, 102, 103]"
          value={JSON.stringify(content.featured || [])}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              if (Array.isArray(parsed)) updateArray("featured", parsed);
            } catch (_) {}
          }}
        />
      </section>

      <button onClick={handleSave} className="btn btn-primary">
        💾 ذخیره‌سازی محتوا
      </button>
    </div>
  );
}
