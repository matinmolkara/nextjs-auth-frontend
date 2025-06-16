"use client";
import React, { useEffect, useState } from "react";
import {
  getPageBySlug,
  updatePage,
  uploadImage,
  getProducts,
  getCategories,
  getProductCategoriesByCategoryId,
  getProductById,
} from "@/app/api/api";

export default function HomePageEditPage() {
  const [loading, setLoading] = useState(true);
  const [pageId, setPageId] = useState(null);
  const [content, setContent] = useState({});
  const [message, setMessage] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const res = await getPageBySlug("home");
        setPageId(res.data.id);
        setContent(res.data.content || {});
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories({pageSize:1000});
        const leafCategories = data.categories.filter(
          (cat) => !cat.has_children
        );
        setAllCategories(leafCategories);
      } catch (err) {
        console.error("خطا در دریافت دسته‌ها:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBestSellerProducts = async () => {
      try {
        const data = await getProducts({ pageSize: 1000 }); // اگر API پشتیبانی می‌کنه، بهتره فیلتر isBestSeller=true هم اضافه کنی
        setAllProducts(data.products || []);
      } catch (err) {
        console.error("خطا در دریافت محصولات پرفروش:", err);
      }
    };
    fetchBestSellerProducts();
  }, []);
  

  const loadProductsForCategory = async (catId, tabIndex) => {
    try {
      const res = await getProductCategoriesByCategoryId(catId);
      const products = Array.isArray(res) ? res : res.products || [];

      // واکشی اطلاعات تکمیلی برای هر محصول
      const productsWithDetails = await Promise.all(
        products.map(async (product) => {
 
          const productDetails = await getProductById(product.product_id);
 
          return {
            ...product,
            title: productDetails?.title || "بدون عنوان", // اگر عنوان موجود نبود، مقدار پیش‌فرض
          };
        })
      );

      setCategoryProducts((prev) => ({
        ...prev,
        [tabIndex]: productsWithDetails,
      }));
    } catch (err) {
      console.error("خطا در دریافت محصولات دسته:", err);
    }
  };


  // const loadProductsForCategory = async (catId, tabIndex) => {
  //   try {
  //     const res = await getProductCategoriesByCategoryId(catId);
  //     const products = Array.isArray(res) ? res : res.products || [];
  //     setCategoryProducts((prev) => ({ ...prev, [tabIndex]: products }));

  //   } catch (err) {
  //     console.error("خطا در دریافت محصولات دسته:", err);
  //   }
  // };
  useEffect(() => {

  }, [categoryProducts]);
  



  const updateField = (section, field, value) => {
    setContent((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const updateArray = (section, items) => {
    setContent((prev) => ({ ...prev, [section]: items }));
  };

  const handleSave = async () => {
    await updatePage(pageId, {
      slug: "home",
      title: "صفحه اصلی",
      published: true,
      content,
    });
    setMessage("✅ اطلاعات با موفقیت ذخیره شد");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleImageUpload = async (cb) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const path = await uploadImage(file);


      cb(path);
    };
    fileInput.click();
  };

  if (loading) return <div className="p-5 text-center">در حال بارگذاری...</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">🎛 ویرایش صفحه اصلی</h2>
      {message && <div className="alert alert-success">{message}</div>}

      {/* HERO */}
      <section className="mb-4 border rounded p-3">
        <h5 className="fw-bold">Hero</h5>
        <input
          className="form-control mb-2"
          placeholder="عنوان بزرگ"
          value={content.hero?.title || ""}
          onChange={(e) => updateField("hero", "title", e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="زیرعنوان"
          value={content.hero?.subtitle || ""}
          onChange={(e) => updateField("hero", "subtitle", e.target.value)}
        />
        <div className="d-flex gap-2 align-items-center">
          <input
            className="form-control"
            placeholder="مسیر تصویر"
            value={content.hero?.image || ""}
            onChange={(e) => updateField("hero", "image", e.target.value)}
          />
          <button
            className="btn btn-secondary"
            onClick={() =>
              handleImageUpload((path) => updateField("hero", "image", path))
            }
          >
            آپلود تصویر
          </button>
        </div>
      </section>

      {/* BANNER */}
      <section className="mb-4 border rounded p-3">
        <h5 className="fw-bold">بنرها</h5>
        {(content.banner || []).map((item, i) => (
          <div key={i} className="border rounded p-2 mb-2">
            {[
              "title",
              "href",
              "imgAlt",
              "realPrice",
              "offPercent",
              "finalPrice",
            ].map((field) => (
              <input
                key={field}
                className="form-control mb-1"
                placeholder={field}
                value={item[field] || ""}
                onChange={(e) =>
                  updateArray("banner", [
                    ...content.banner.slice(0, i),
                    { ...item, [field]: e.target.value },
                    ...content.banner.slice(i + 1),
                  ])
                }
              />
            ))}
            <div className="d-flex gap-2">
              <input
                className="form-control"
                placeholder="imgSrc"
                value={item.imgSrc || ""}
                onChange={(e) =>
                  updateArray("banner", [
                    ...content.banner.slice(0, i),
                    { ...item, imgSrc: e.target.value },
                    ...content.banner.slice(i + 1),
                  ])
                }
              />
              <button
                className="btn btn-outline-secondary"
                onClick={() =>
                  handleImageUpload((path) => {
                    const updated = [...content.banner];
                    updated[i].imgSrc = path;
                    updateArray("banner", updated);
                  })
                }
              >
                آپلود
              </button>
            </div>
            <div className="text-end mt-1">
              <button
                className="btn btn-sm btn-danger"
                onClick={() =>
                  updateArray("banner", [
                    ...content.banner.slice(0, i),
                    ...content.banner.slice(i + 1),
                  ])
                }
              >
                حذف بنر
              </button>
            </div>
          </div>
        ))}
        <button
          className="btn btn-outline-success"
          onClick={() => updateArray("banner", [...(content.banner || []), {}])}
        >
          + افزودن بنر جدید
        </button>
      </section>

      {/* SERVICES */}
      <section className="mb-4 border rounded p-3">
        <h5 className="fw-bold">خدمات</h5>
        {(content.services || []).map((s, i) => (
          <div key={i} className="border rounded p-2 mb-2">
            {["title", "desc"].map((field) => (
              <input
                key={field}
                className="form-control mb-1"
                placeholder={field}
                value={s[field] || ""}
                onChange={(e) =>
                  updateArray("services", [
                    ...content.services.slice(0, i),
                    { ...s, [field]: e.target.value },
                    ...content.services.slice(i + 1),
                  ])
                }
              />
            ))}
            <div className="d-flex gap-2">
              <input
                className="form-control"
                placeholder="image"
                value={s.image || ""}
                onChange={(e) =>
                  updateArray("services", [
                    ...content.services.slice(0, i),
                    { ...s, image: e.target.value },
                    ...content.services.slice(i + 1),
                  ])
                }
              />
              <button
                className="btn btn-outline-secondary"
                onClick={() =>
                  handleImageUpload((path) => {
                    const updated = [...content.services];
                    updated[i].image = path;
                    updateArray("services", updated);
                  })
                }
              >
                آپلود
              </button>
            </div>
            <div className="text-end mt-1">
              <button
                className="btn btn-sm btn-danger"
                onClick={() =>
                  updateArray("services", [
                    ...content.services.slice(0, i),
                    ...content.services.slice(i + 1),
                  ])
                }
              >
                حذف خدمت
              </button>
            </div>
          </div>
        ))}
        <button
          className="btn btn-outline-success"
          onClick={() =>
            updateArray("services", [...(content.services || []), {}])
          }
        >
          + افزودن خدمت جدید
        </button>
      </section>

      {/* FEATURED */}
      <section className="mb-4 border rounded p-3">
        <h5 className="fw-bold">محصولات ویژه (IDها)</h5>
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
      {/* TOP BRANDS */}
      {/* TOP BRANDS */}
      {/* TOP BRANDS */}
      <section className="mb-4 border rounded p-3">
        <h5 className="fw-bold">محبوب‌ترین برندها</h5>
        {(content.topBrands || []).map((tab, i) => (
          <div key={i} className="border rounded p-2 mb-3">
            <input
              className="form-control mb-2"
              placeholder="عنوان تب (مثلاً کیف، کفش)"
              value={tab.label || ""}
              onChange={(e) =>
                updateArray("topBrands", [
                  ...content.topBrands.slice(0, i),
                  { ...tab, label: e.target.value },
                  ...content.topBrands.slice(i + 1),
                ])
              }
            />

            {/* انتخاب دسته */}
            <label className="form-label">انتخاب دسته‌بندی</label>
            <select
              className="form-select mb-2"
              value={tab.categoryId || ""}
              onChange={async (e) => {
                const newCategoryId = parseInt(e.target.value);
                const updatedTab = {
                  ...tab,
                  categoryId: newCategoryId,
                  productIds: [], // ریست محصولات
                };
                updateArray("topBrands", [
                  ...content.topBrands.slice(0, i),
                  updatedTab,
                  ...content.topBrands.slice(i + 1),
                ]);
                await loadProductsForCategory(newCategoryId, i);
              }}
            >
              <option value="">-- انتخاب کنید --</option>
              {allCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* انتخاب محصولات دسته */}

            {/* انتخاب محصولات دسته */}
            <label className="form-label">انتخاب حداکثر ۴ محصول</label>
            <div className="product-checkboxes">
              {(categoryProducts[i] || []).map((p, idx) => {
                const isChecked = tab.productIds?.includes(p.product_id); // بررسی انتخاب‌شدن محصول
                return (
                  <div
                    key={`prod-${p.product_id || idx}`}
                    className="form-check"
                  >
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`product-${p.product_id}`}
                      value={p.product_id}
                      checked={isChecked}
                      onChange={(e) => {
                        const selected = tab.productIds || [];
                        if (e.target.checked) {
                          // افزودن محصول در صورت انتخاب
                          if (selected.length < 4) {
                            updateArray("topBrands", [
                              ...content.topBrands.slice(0, i),
                              {
                                ...tab,
                                productIds: [
                                  ...selected,
                                  parseInt(e.target.value),
                                ],
                              },
                              ...content.topBrands.slice(i + 1),
                            ]);
                          } else {
                            alert("حداکثر می‌توانید ۴ محصول انتخاب کنید.");
                          }
                        } else {
                          // حذف محصول در صورت غیرفعال شدن
                          updateArray("topBrands", [
                            ...content.topBrands.slice(0, i),
                            {
                              ...tab,
                              productIds: selected.filter(
                                (id) => id !== parseInt(e.target.value)
                              ),
                            },
                            ...content.topBrands.slice(i + 1),
                          ]);
                        }
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`product-${p.product_id}`}
                    >
                      {p.title || "بدون عنوان"} {/* نمایش عنوان محصول */}
                    </label>
                  </div>
                );
              })}
            </div>

            <div className="text-end">
              <button
                className="btn btn-sm btn-danger"
                onClick={() =>
                  updateArray("topBrands", [
                    ...content.topBrands.slice(0, i),
                    ...content.topBrands.slice(i + 1),
                  ])
                }
              >
                حذف تب
              </button>
            </div>
          </div>
        ))}
        <button
          className="btn btn-outline-success"
          onClick={() =>
            updateArray("topBrands", [...(content.topBrands || []), {}])
          }
        >
          + افزودن تب برند جدید
        </button>
      </section>
      {/* ADVERTISE */}
      <section className="mb-4 border rounded p-3">
        <h5 className="fw-bold">تبلیغات (Banner Advertise)</h5>
        {(content.advertise || []).map((item, i) => (
          <div key={i} className="border rounded p-2 mb-2">
            <input
              className="form-control mb-2"
              placeholder="لینک (URL)"
              value={item.href || ""}
              onChange={(e) =>
                updateArray("advertise", [
                  ...content.advertise.slice(0, i),
                  { ...item, href: e.target.value },
                  ...content.advertise.slice(i + 1),
                ])
              }
            />
            <div className="d-flex gap-2 align-items-center">
              <input
                className="form-control"
                placeholder="آدرس تصویر"
                value={item.img || ""}
                onChange={(e) =>
                  updateArray("advertise", [
                    ...content.advertise.slice(0, i),
                    { ...item, img: e.target.value },
                    ...content.advertise.slice(i + 1),
                  ])
                }
              />
              <button
                className="btn btn-outline-secondary"
                onClick={() =>
                  handleImageUpload((path) => {
                    const updated = [...content.advertise];
                    updated[i].img = path;
                    updateArray("advertise", updated);
                  })
                }
              >
                آپلود تصویر
              </button>
            </div>
            <div className="text-end mt-2">
              <button
                className="btn btn-sm btn-danger"
                onClick={() =>
                  updateArray("advertise", [
                    ...content.advertise.slice(0, i),
                    ...content.advertise.slice(i + 1),
                  ])
                }
              >
                حذف تبلیغ
              </button>
            </div>
          </div>
        ))}
        <button
          className="btn btn-outline-success"
          onClick={() =>
            updateArray("advertise", [...(content.advertise || []), {}])
          }
        >
          + افزودن تبلیغ جدید
        </button>
      </section>

      {/* BEST SELLERS */}
      <section className="mb-4 border rounded p-3">
        <h5 className="fw-bold">پرفروش‌ترین‌ها</h5>
        <p className="text-muted mb-2">
          فقط محصولاتی که در بخش تنظیمات محصول به عنوان پرفروش‌ترین علامت زده
          شدن نمایش داده می‌شن.
        </p>

        {/* لیست محصولات پرفروش */}
        <div className="product-checkboxes">
          {(allProducts.filter((p) => p.best_seller) || []).map((p, idx) => {
            const isChecked = content.bestSellers?.includes(p.id);
            return (
              <div key={`best-${p.id || idx}`} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`best-seller-${p.id}`}
                  value={p.id}
                  checked={isChecked}
                  onChange={(e) => {
                    const selected = content.bestSellers || [];
                    if (e.target.checked) {
                      if (selected.length < 3) {
                        updateArray("bestSellers", [
                          ...selected,
                          parseInt(e.target.value),
                        ]);
                      } else {
                        alert("حداکثر می‌توانید ۳ محصول پرفروش انتخاب کنید.");
                      }
                    } else {
                      updateArray(
                        "bestSellers",
                        selected.filter((id) => id !== parseInt(e.target.value))
                      );
                    }
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`best-seller-${p.id}`}
                >
                  {p.title}
                </label>
              </div>
            );
          })}
        </div>
      </section>

      <button onClick={handleSave} className="btn btn-primary">
        💾 ذخیره‌سازی محتوا
      </button>
    </div>
  );
}
