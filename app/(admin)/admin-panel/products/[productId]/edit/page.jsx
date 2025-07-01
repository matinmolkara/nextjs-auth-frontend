"use client";
import React, { useState, useEffect, useContext } from "react";

import { useParams } from "next/navigation";

import { ProductContext } from "@/context/ProductContext";
import {
  getCategoryAttributes,
  getProductById,
  updateProduct,
} from "@/app/api/api"; 
import Image from "next/image";
import Section from "@/components/admin/products/Section";
import Link from "next/link";

const EditProductPage = () => {
  const { productId } = useParams();

  const {
    categories,
    brands,
    sizes: mockSizesFromContext,
    colors: mockColorsFromContext,
  } = useContext(ProductContext);

  const [productToEdit, setProductToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [attributesLoaded, setAttributesLoaded] = useState(false);
  // State ها
  const [productTitle, setProductTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const [categoryAttributes, setCategoryAttributes] = useState([]);
  const [commonAttributes, setCommonAttributes] = useState([]);
  const [customAttributes, setCustomAttributes] = useState([]);
  const [commonFeatures, setCommonFeatures] = useState({});
  const [customFeatures, setCustomFeatures] = useState({});

  const [detailedDescriptionTitle, setDetailedDescriptionTitle] = useState("");
  const [detailedDescriptionText, setDetailedDescriptionText] = useState("");
  const [price, setPrice] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [isSpecialOffer, setIsSpecialOffer] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [stock, setStock] = useState("");

  const [existingImages, setExistingImages] = useState([]); // تصاویر موجود محصول
  const [productImages, setProductImages] = useState([]); // تصاویر جدید برای آپلود
  const [imagesToRemove, setImagesToRemove] = useState([]); // ID یا نام تصاویر برای حذف

  const [formErrors, setFormErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState("");
  const [apiError, setApiError] = useState("");

  // 1. بارگذاری اطلاعات محصول برای ویرایش
  useEffect(() => {
    if (productId) {
      setLoading(true);
      setApiError("");
      getProductById(productId)
        .then((data) => {
          console.log("Product data loaded:", data); // برای دیباگ
          setProductToEdit(data);
          setProductTitle(data.title || "");
          setShortDescription(data.description || "");
          setSelectedCategory(data.category_id || "");
          setSelectedBrand(data.brand_id || "");
          setSelectedSizes(data.sizes || []); // فرض: data.sizes آرایه‌ای از ID هاست
          setSelectedColors(data.color_ids || []); // فرض: data.color_ids آرایه‌ای از ID هاست

          setPrice(data.price ? String(data.price) : "");
          // برای تخفیف، باید نوع آن را هم از بک‌اند بگیرید یا منطقی برای تشخیص آن داشته باشید
          // در اینجا فرض می‌کنیم اگر data.discount وجود دارد، همان مقدار است و نوع را کاربر می‌تواند تغییر دهد
          if (data.discount && data.price) {
            if (data.real_price < data.price) {
              // یک تخمین ساده برای نوع تخفیف
              const diff = data.price - data.real_price;
              const percDiscount = (diff / data.price) * 100;
              if (
                Math.abs(percDiscount - data.discount) < 0.01 &&
                data.discount <= 100
              ) {
                // اگر مقدار دیسکانت شبیه درصد بود
                setDiscountType("percentage");
                setDiscountValue(String(data.discount));
              } else {
                setDiscountType("fixed");
                setDiscountValue(String(diff)); // مقدار ثابت تخفیف
              }
            } else {
              setDiscountValue("");
            }
          } else {
            setDiscountValue("");
          }

          setIsSpecialOffer(data.special_offer || false);
          setIsBestSeller(data.best_seller || false);
          setStock(data.inventory ? String(data.inventory) : "");
          setExistingImages(
            (data.image_urls || []).map((url, index) => ({
              id: index, // یا از url استخراج کن
              url,
              name: url.split("/").pop(), // فقط نام فایل
            }))
          );

          setInitialDataLoaded(true); // نشانگر بارگذاری اولیه اطلاعات
          setLoading(false);
        })
        .catch((err) => {
          console.error("خطا در دریافت اطلاعات محصول:", err);
          setApiError(
            "خطا در بارگذاری اطلاعات محصول. لطفاً صفحه را مجددا بارگذاری کنید."
          );
          setLoading(false);
        });
    } else {
      setLoading(false); // اگر productId وجود ندارد
    }
  }, [productId]);

  // useEffect جداگانه برای تنظیم توضیحات تفصیلی
  useEffect(() => {
    if (productToEdit && productToEdit.generalDescriptions) {
      if (productToEdit.generalDescriptions.length > 0) {
        setDetailedDescriptionTitle(
          productToEdit.generalDescriptions[0].title || ""
        );
        setDetailedDescriptionText(
          productToEdit.generalDescriptions[0].content || ""
        );
      } else {
        setDetailedDescriptionTitle("");
        setDetailedDescriptionText("");
      }
    }
  }, [productToEdit]);
  // 2. بارگذاری ویژگی‌های دسته بندی هنگام تغییر دسته یا پس از بارگذاری اولیه محصول
  useEffect(() => {
    if (!selectedCategory || !initialDataLoaded) {
      return;
    }

    console.log("Loading category attributes for category:", selectedCategory);
    getCategoryAttributes(selectedCategory)
      .then((data) => {
        console.log("Category attributes loaded:", data);
        const common = (data || []).filter((a) => !a.is_custom);
        const custom = (data || []).filter((a) => a.is_custom);

        setCommonAttributes(common);
        setCustomAttributes(custom);

        // مقداردهی اولیه به state ویژگی‌ها
        const commonInit = {};
        const customInit = {};
        common.forEach((attr) => (commonInit[attr.attribute_id] = "")); // از attr.id به attr.attribute_id در کد شما تغییر یافت
        custom.forEach((attr) => (customInit[attr.attribute_id] = "")); // از attr.id به attr.attribute_id در کد شما تغییر یافت

        // اگر اطلاعات محصول بارگذاری شده و ویژگی‌های محصول موجود است، آنها را پر کن
        // سپس اگر اطلاعات ویژگی‌های محصول موجود است، آنها را پر کن
        if (productToEdit.attributes && productToEdit.attributes.length > 0) {
          console.log("Product attributes from API:", productToEdit.attributes);

          productToEdit.attributes.forEach((prodAttr) => {
            // بر اساس نام ویژگی، attribute_id مربوطه را پیدا کن
            const matchingCommonAttr = common.find(
              (attr) => attr.name === prodAttr.name
            );
            const matchingCustomAttr = custom.find(
              (attr) => attr.name === prodAttr.name
            );

            if (matchingCommonAttr) {
              const attrId = matchingCommonAttr.attribute_id;
              const attrValue = prodAttr.value || "";
              commonInit[attrId] = attrValue;
              console.log(
                `Set common attribute ${attrId} (${prodAttr.name}) to:`,
                attrValue
              );
            }

            if (matchingCustomAttr) {
              const attrId = matchingCustomAttr.attribute_id;
              const attrValue = prodAttr.value || "";
              customInit[attrId] = attrValue;
              console.log(
                `Set custom attribute ${attrId} (${prodAttr.name}) to:`,
                attrValue
              );
            }
          });
        }
        console.log("Final common features:", commonInit);
        console.log("Final custom features:", customInit);

        setCommonFeatures(commonInit);
        setCustomFeatures(customInit);
        setAttributesLoaded(true);
      })
      .catch((err) => {
        console.error("خطا در دریافت ویژگی‌ها:", err);
        setCommonAttributes([]);
        setCustomAttributes([]);
        setCommonFeatures({});
        setCustomFeatures({});
        setApiError("خطا در بارگذاری ویژگی‌های دسته‌بندی.");
      });
  }, [selectedCategory, productToEdit, initialDataLoaded]); // productToEdit و initialDataLoaded اضافه شد

  // مدیریت انتخاب سایزها
  const handleSizeChange = (sizeId) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(sizeId)
        ? prevSizes.filter((s) => s !== sizeId)
        : [...prevSizes, sizeId]
    );
  };

  // مدیریت انتخاب رنگ‌ها
  const handleColorChange = (colorId) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(colorId)
        ? prevColors.filter((c) => c !== colorId)
        : [...prevColors, colorId]
    );
  };

  // مدیریت آپلود تصاویر جدید
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.filter(
      (file) =>
        !productImages.some(
          (existingFile) => existingFile.name === file.name
        ) &&
        !existingImages.some((existingImg) => existingImg.name === file.name) // جلوگیری از آپلود تکراری با تصاویر موجود
    );
    setProductImages((prevImages) => [...prevImages, ...newImages]);
    if (formErrors.productImages && newImages.length > 0) {
      setFormErrors((prev) => ({ ...prev, productImages: null }));
    }
  };

  // حذف یک تصویر جدید آپلود شده (از لیست productImages)
  const handleRemoveNewImage = (imageName) => {
    setProductImages((prevImages) =>
      prevImages.filter((img) => img.name !== imageName)
    );
  };

  const handleRemoveExistingImage = (imageUrlToRemove) => {
    setExistingImages((prevImages) =>
      prevImages.filter((img) => img.url !== imageUrlToRemove)
    );
    setImagesToRemove((prev) => [...prev, imageUrlToRemove]);
  };

  // اعتبارسنجی فرم
  const validateForm = () => {
    const errors = {};
    if (!productTitle.trim()) errors.productTitle = "عنوان محصول الزامی است.";
    if (!selectedCategory)
      errors.selectedCategory = "انتخاب دسته‌بندی الزامی است.";
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0)
      errors.price = "قیمت معتبر وارد کنید.";
    if (
      discountValue &&
      (isNaN(parseFloat(discountValue)) || parseFloat(discountValue) < 0)
    )
      errors.discountValue = "مقدار تخفیف معتبر وارد کنید.";
    if (discountType === "percentage" && parseFloat(discountValue) > 100)
      errors.discountValue = "درصد تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد.";
    if (!stock || isNaN(parseInt(stock)) || parseInt(stock) < 0)
      errors.stock = "موجودی معتبر وارد کنید.";

    // برای ویرایش، اگر هیچ تصویر موجودی نمانده و هیچ تصویر جدیدی هم آپلود نشده، خطا بده
    if (existingImages.length === 0 && productImages.length === 0)
      errors.productImages = "حداقل یک تصویر برای محصول الزامی است.";

    commonAttributes.forEach((attr) => {
      if (attr.is_required && !commonFeatures[attr.attribute_id]?.trim()) {
        errors[
          `common_feature_${attr.attribute_id}`
        ] = `مقدار برای ${attr.name} الزامی است.`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ارسال فرم
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSuccess("");
    setFormErrors({});
    setApiError("");

    if (!validateForm()) return;

    const numericPrice = parseFloat(price);
    let realPrice = numericPrice;
    let finalDiscountValue = 0;

    if (discountValue) {
      const value = parseFloat(discountValue);
      if (discountType === "percentage") {
        finalDiscountValue = value;
        realPrice = numericPrice - (numericPrice * value) / 100;
      } else {
        finalDiscountValue = value;
        realPrice = numericPrice - value;
      }
    }

    const attributes = [];

    Object.entries({ ...commonFeatures, ...customFeatures }).forEach(
      ([attribute_id, value]) => {
        attributes.push({
          attribute_id: Number(attribute_id),
          value: String(value || "").trim(), // حتی اگه خالی باشه هم بفرست
        });
      }
    );

    const descriptions = [];
    if (detailedDescriptionTitle.trim() || detailedDescriptionText.trim()) {
      descriptions.push({
        title: detailedDescriptionTitle.trim(),
        content: detailedDescriptionText.trim(),
      });
    }

    const formData = new FormData();
    formData.append("title", productTitle);
    formData.append("description", shortDescription);
    formData.append("price", numericPrice);
    formData.append("real_price", realPrice);
    formData.append("discount", finalDiscountValue);
    formData.append("discount_type", discountType);
    formData.append("inventory", parseInt(stock));
    formData.append("category_id", selectedCategory);
    formData.append("brand_id", selectedBrand || "");
    formData.append("special_offer", isSpecialOffer);
    formData.append("best_seller", isBestSeller);
    formData.append("has_color", selectedColors.length > 0);
    formData.append("has_size", selectedSizes.length > 0);

    // اگر انتخاب جدید انجام نشد، مقدار قبلی را مجدداً اضافه کن
    const effectiveColors = selectedColors.length
      ? selectedColors
      : productToEdit?.color_ids || [];
    const effectiveSizes = selectedSizes.length
      ? selectedSizes
      : productToEdit?.sizes || [];
    effectiveColors.forEach((id) => formData.append("color_ids", id));
    effectiveSizes.forEach((id) => formData.append("sizes", id));

    const effectiveAttributes = [];

    // ویژگی‌های سیستمی (غیرفردی)
    Object.entries(commonFeatures).forEach(([attribute_id, value]) => {
      if (String(value).trim()) {
        effectiveAttributes.push({
          attribute_id: Number(attribute_id),
          value: String(value).trim(),
          isCustom: false,
        });
      }
    });

    // ویژگی‌های سفارشی (custom)
    Object.entries(customFeatures).forEach(([attribute_id, value]) => {
      if (String(value).trim()) {
        effectiveAttributes.push({
          attribute_id: Number(attribute_id),
          value: String(value).trim(),
          isCustom: true,
          key:
            customAttributes.find(
              (a) => a.attribute_id === Number(attribute_id)
            )?.name || "",
        });
      }
    });

    // فقط اگر ویژگی‌ای وجود داره ارسال کن
    if (effectiveAttributes.length > 0) {
      formData.append("attributes", JSON.stringify(effectiveAttributes));
    }

    const effectiveDescriptions = descriptions.filter(
      (desc) => desc.title.trim() || desc.content.trim()
    );
    formData.append("descriptions", JSON.stringify(effectiveDescriptions));

    // تصاویر جدید
    productImages.forEach((img) => formData.append("images", img));

    // تصاویر حذف‌شده
    const removedFilenames = imagesToRemove.map((url) => url.split("/").pop());
    if (removedFilenames.length > 0) {
      formData.append("removed_image_ids", JSON.stringify(removedFilenames));
    }

    formData.append("status", "published");

    try {
      setLoading(true);
      await updateProduct(productId, formData);
      setFormSuccess("محصول با موفقیت به‌روزرسانی و منتشر شد!");
      const updated = await getProductById(productId);
      setProductToEdit(updated);
      setExistingImages(
        (updated.image_urls || []).map((url, i) => ({
          id: i,
          url,
          name: url.split("/").pop(),
        }))
      );
      setProductImages([]);
      setImagesToRemove([]);
    } catch (err) {
      console.error("❌ خطا در به‌روزرسانی:", err);
      setApiError(
        err.response?.data?.message || "خطای ناشناخته هنگام ارسال فرم."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading && !initialDataLoaded) {
    // فقط لودینگ اولیه صفحه
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">
            در حال بارگذاری اطلاعات محصول...
          </span>
        </div>
        <p className="mt-2">در حال بارگذاری اطلاعات محصول...</p>
      </div>
    );
  }

  if (apiError && !productToEdit) {
    // اگر خطای اساسی در دریافت محصول وجود دارد
    return (
      <div className="container my-5">
        <div className="alert alert-danger">{apiError}</div>
        <Link href="/admin-panel/products" className="btn btn-outline-dark">
          بازگشت به لیست محصولات
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>ویرایش محصول: {productToEdit?.title || ""}</h3>
        <Link href="/admin-panel/products" className="btn btn-outline-dark">
          <i className="bi bi-box-seam me-1"></i> بازگشت به لیست محصولات
        </Link>
      </div>

      {formSuccess && (
        <div
          className="alert alert-success d-flex align-items-center"
          role="alert"
        >
          <i className="bi bi-check2-circle me-2"></i>
          {formSuccess}
        </div>
      )}
      {apiError &&
        !formSuccess && ( // نمایش خطای API اگر پیام موفقیت وجود ندارد
          <div className="alert alert-danger" role="alert">
            {apiError}
          </div>
        )}
      {Object.keys(formErrors).length > 0 &&
        !formSuccess &&
        !formErrors.api && (
          <div className="alert alert-danger" role="alert">
            لطفاً خطاهای فرم را برطرف کنید.
          </div>
        )}

      <form onSubmit={(e) => handleSubmit(e, false)} noValidate>
        {/* بخش اطلاعات پایه */}
        <Section title="۱. اطلاعات پایه محصول" id="section-basic-info">
          {/* فیلدهای productTitle و shortDescription مشابه قبل */}
          <div className="mb-3">
            <label htmlFor="productTitle" className="form-label">
              عنوان محصول
              {formErrors.productTitle && (
                <span className="text-danger">*</span>
              )}
            </label>

            <input
              type="text"
              id="productTitle"
              className={`form-control ${
                formErrors.productTitle ? "is-invalid" : ""
              }`}
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              placeholder="مثال: گوشی موبایل سامسونگ مدل Galaxy S25"
            />

            {formErrors.productTitle && (
              <div className="invalid-feedback">{formErrors.productTitle}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="shortDescription" className="form-label">
              توضیحات خلاصه
            </label>

            <textarea
              id="shortDescription"
              className={`form-control ${
                formErrors.shortDescription ? "is-invalid" : ""
              }`}
              rows="3"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="یک توضیح کوتاه و جذاب در مورد محصول (حداکثر ۲۵۵ کاراکتر)"
            />

            {formErrors.shortDescription && (
              <div className="invalid-feedback">
                {formErrors.shortDescription}
              </div>
            )}
          </div>
        </Section>

        {/* بخش دسته‌بندی و برند */}
        <Section title="۲. دسته‌بندی و برند" id="section-category-brand">
          {/* فیلدهای selectedCategory و selectedBrand مشابه قبل */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="selectedCategory" className="form-label">
                دسته‌بندی محصول
                {formErrors.selectedCategory && (
                  <span className="text-danger">*</span>
                )}
              </label>

              <select
                id="selectedCategory"
                className={`form-select ${
                  formErrors.selectedCategory ? "is-invalid" : ""
                }`}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">--- انتخاب دسته‌بندی ---</option>

                {categories &&
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>

              {formErrors.selectedCategory && (
                <div className="invalid-feedback">
                  {formErrors.selectedCategory}
                </div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="selectedBrand" className="form-label">
                برند محصول
              </label>

              <select
                id="selectedBrand"
                className="form-select"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">--- انتخاب برند (اختیاری) ---</option>

                {brands &&
                  brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </Section>

        {/* بخش تنوع محصول (سایز و رنگ) */}
        <Section title="۳. تنوع محصول (سایز و رنگ)" id="section-variations">
          {/* منطق انتخاب سایز و رنگ مشابه قبل */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">سایزهای موجود</label> 
              <div
                className="border p-2 rounded"
                style={{ maxHeight: "150px", overflowY: "auto" }}
              >
                {mockSizesFromContext && mockSizesFromContext.length > 0 ? (
                  mockSizesFromContext.map((size) => (
                    <div key={size.id} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`size-${size.id}`}
                        checked={selectedSizes.includes(size.id)}
                        onChange={() => handleSizeChange(size.id)}
                      />

                      <label
                        className="form-check-label"
                        htmlFor={`size-${size.id}`}
                      >
                        {size.size}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-muted small">هیچ سایزی تعریف نشده است.</p>
                )}
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">رنگ‌های موجود</label> 
              <div
                className="border p-2 rounded"
                style={{ maxHeight: "150px", overflowY: "auto" }}
              >
                {mockColorsFromContext && mockColorsFromContext.length > 0 ? (
                  mockColorsFromContext.map((color) => (
                    <div key={color.id} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`color-${color.id}`}
                        checked={selectedColors.includes(color.id)}
                        onChange={() => handleColorChange(color.id)}
                      />

                      {color.code && (
                        <span
                          style={{
                            backgroundColor: color.code,
                            width: "1rem",
                            height: "1rem",
                            display: "inline-block",
                            marginLeft: "0.5rem",
                            border: "1px solid #ccc",
                            borderRadius: "50%",
                            verticalAlign: "middle",
                          }}
                        ></span>
                      )}

                      <label
                        className="form-check-label ms-1"
                        htmlFor={`color-${color.id}`}
                      >
                        {color.name}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-muted small">هیچ رنگی تعریف نشده است.</p>
                )}
              </div>
            </div>
          </div>
        </Section>

        {/* بخش ویژگی‌های محصول */}
        <Section title="۴. ویژگی‌های محصول" id="section-product-features">
          {/* ویژگی‌های مشترک دسته‌بندی */}
          {commonAttributes.length > 0 && (
            <div className="mb-4 p-3 border border-dashed rounded">
              <h6 className="mb-3">
                ویژگی‌های مشترک دسته‌بندی:
                {categories.find((cat) => cat.id === selectedCategory)?.name}
              </h6>
              {/* commonFeatures */}
              {commonAttributes.map((attr) => (
                <div key={attr.attribute_id} className="mb-3">
                  {/* کلید از attr.id به attr.attribute_id تغییر کرد */}

                  <label
                    htmlFor={`common_feature_${attr.attribute_id}`}
                    className="form-label"
                  >
                    {attr.name}
                    {attr.is_required && (
                      <span className="text-danger ms-1">*</span>
                    )}
                  </label>

                  <input
                    type={attr.input_type === "number" ? "number" : "text"}
                    id={`common_feature_${attr.attribute_id}`}
                    className={`form-control ${
                      formErrors[`common_feature_${attr.attribute_id}`]
                        ? "is-invalid"
                        : ""
                    }`}
                    value={commonFeatures[attr.attribute_id] || ""}
                    onChange={(e) =>
                      setCommonFeatures((prev) => ({
                        ...prev,
                        [attr.attribute_id]: e.target.value,
                      }))
                    }
                    placeholder={`مقدار برای ${attr.name}`}
                  />

                  {formErrors[`common_feature_${attr.attribute_id}`] && (
                    <div className="invalid-feedback">
                      {formErrors[`common_feature_${attr.attribute_id}`]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {/* ویژگی‌های خاص محصول */}
          {customAttributes.length > 0 && (
            <div className="mb-4 p-3 border border-dashed rounded">
              <h6 className="mb-3">ویژگی‌های خاص محصول</h6>
              {/* customFeatures */} _
              {customAttributes.map((attr) => (
                <div key={attr.attribute_id} className="mb-3">
                  {/* کلید از attr.id به attr.attribute_id تغییر کرد */}

                  <label
                    htmlFor={`custom_feature_${attr.attribute_id}`}
                    className="form-label"
                  >
                    {attr.name}
                  </label>

                  <input
                    type={attr.input_type === "number" ? "number" : "text"}
                    id={`custom_feature_${attr.attribute_id}`}
                    className="form-control"
                    value={customFeatures[attr.attribute_id] || ""}
                    onChange={(e) =>
                      setCustomFeatures((prev) => ({
                        ...prev,
                        [attr.attribute_id]: e.target.value,
                      }))
                    }
                    placeholder={`مقدار برای ${attr.name}`}
                  />
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* بخش توضیحات کلی محصول */}
        <Section
          title="۵. توضیحات جامع محصول"
          id="section-detailed-description"
        >
          {/* فیلدهای detailedDescriptionTitle و detailedDescriptionText مشابه قبل */}
          <div className="mb-3">
            <label htmlFor="detailedDescriptionTitle" className="form-label">
              عنوان برای بخش توضیحات
            </label>

            <input
              type="text"
              id="detailedDescriptionTitle"
              className="form-control"
              value={detailedDescriptionTitle}
              onChange={(e) => setDetailedDescriptionTitle(e.target.value)}
              placeholder="مثال: نقد و بررسی تخصصی، معرفی کامل محصول"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="detailedDescriptionText" className="form-label">
              متن اصلی توضیحات
            </label>

            <textarea
              id="detailedDescriptionText"
              className="form-control"
              rows="6"
              value={detailedDescriptionText}
              onChange={(e) => setDetailedDescriptionText(e.target.value)}
              placeholder="جزئیات کامل، مشخصات فنی، مزایا و معایب محصول را در این بخش وارد کنید..."
            />

            <div className="form-text">{/* ... */}</div>
          </div>
        </Section>

        {/* بخش قیمت‌گذاری و موجودی */}
        <Section title="۶. قیمت‌گذاری و موجودی" id="section-pricing-stock">
          {/* فیلدهای price, discountType, discountValue, stock مشابه قبل */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="price" className="form-label">
                قیمت اصلی (تومان)
                {formErrors.price && <span className="text-danger">*</span>}
              </label>

              <input
                type="number"
                id="price"
                className={`form-control ${
                  formErrors.price ? "is-invalid" : ""
                }`}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="مثال: 15000000"
                min="0"
              />

              {formErrors.price && (
                <div className="invalid-feedback">{formErrors.price}</div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">تخفیف</label>

              <div className="input-group">
                <select
                  className="form-select"
                  style={{ flexGrow: 0, width: "auto" }}
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value)}
                >
                  <option value="percentage">درصد</option>
                  <option value="fixed">مبلغ ثابت (تومان)</option>
                </select>

                <input
                  type="number"
                  className={`form-control ${
                    formErrors.discountValue ? "is-invalid" : ""
                  }`}
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  placeholder={
                    discountType === "percentage"
                      ? "مثال: 10 (برای ۱۰٪)"
                      : "مثال: 50000 (برای ۵۰,۰۰۰ تومان)"
                  }
                  min="0"
                />

                {formErrors.discountValue && (
                  <div className="invalid-feedback d-block">
                    {formErrors.discountValue}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="stock" className="form-label">
              تعداد موجودی
              {formErrors.stock && <span className="text-danger">*</span>}
            </label>

            <input
              type="number"
              id="stock"
              className={`form-control ${formErrors.stock ? "is-invalid" : ""}`}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="مثال: 50"
              min="0"
            />

            {formErrors.stock && (
              <div className="invalid-feedback">{formErrors.stock}</div>
            )}
          </div>
        </Section>

        <Section title="۷. تصاویر محصول" id="section-product-images">
          {/* تصاویر فعلی */}
          {existingImages.length > 0 && (
            <div className="mb-3">
              <h6>تصاویر فعلی محصول:</h6>
              <div className="row g-2">
                {existingImages.map((image) => (
                  <div
                    key={image.url}
                    className="col-6 col-sm-4 col-md-3 col-lg-2"
                  >
                    <div className="card h-100 position-relative shadow-sm">
                      <Image
                        src={image.url}
                        alt={image.name}
                        className="card-img-top"
                        style={{ height: "100px", objectFit: "cover" }}
                        width={100}
                        height={100}
                        unoptimized
                      />
                      <button
                        type="button"
                        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 p-0 lh-1"
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                        }}
                        onClick={() => handleRemoveExistingImage(image.url)} // حذف با URL
                        title="حذف تصویر"
                      >
                        <i className="bi bi-trash small"></i>
                      </button>
                      <div className="card-footer p-1">
                        <p
                          className="card-text small text-muted text-truncate"
                          title={image.name}
                        >
                          {image.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* آپلود تصاویر جدید */}
          <div className="mb-3">
            <label htmlFor="productImagesInput" className="form-label">
              آپلود تصاویر جدید
              {formErrors.productImages && (
                <span className="text-danger">*</span>
              )}
            </label>

            <div className="p-4 border-2 border-dashed rounded text-center mb-2 bg-light">
              <i className="bi bi-cloud-upload display-4 text-muted mb-2"></i> 
              <p className="mb-2">
                <label
                  htmlFor="productImagesInput"
                  className="btn btn-sm btn-outline-primary"
                >
                  فایل‌های خود را انتخاب کنید
                </label>
                <input
                  id="productImagesInput"
                  type="file"
                  className="d-none"
                  multiple
                  onChange={handleImageUpload}
                  accept="image/*"
                />
                <span className="mx-1">یا بکشید و رها کنید</span>
              </p>
              <p className="text-muted small">PNG, JPG, GIF تا ۱۰ مگابایت</p>
            </div>

            {formErrors.productImages && (
              <div className="d-block text-danger small mt-1">
                <i className="bi bi-exclamation-circle me-1"></i>
                {formErrors.productImages}
              </div>
            )}
          </div>

          {/* نمایش پیش‌نمایش تصاویر جدید */}
          {productImages.length > 0 && (
            <div className="mt-3">
              <h6>تصاویر جدید انتخاب شده:</h6>
              <div className="row g-2">
                {productImages.map((image, index) => (
                  <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2">
                    <div className="card h-100 position-relative shadow-sm">
                      <Image
                        src={URL.createObjectURL(image)}
                        alt={`پیش‌نمایش ${image.name}`}
                        className="card-img-top"
                        style={{ height: "100px", objectFit: "cover" }}
                        width={100}
                        height={100}
                      />
                      <button
                        type="button"
                        className="btn btn-warning btn-sm position-absolute top-0 end-0 m-1 p-0 lh-1"
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                        }}
                        onClick={() => handleRemoveNewImage(image.name)}
                        title="لغو آپلود این تصویر"
                      >
                        <i className="bi bi-x small"></i>
                      </button>
                      <div className="card-footer p-1">
                        <p
                          className="card-text small text-muted text-truncate"
                          title={image.name}
                        >
                          {image.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Section>

        {/* بخش تنظیمات اضافی */}
        <Section title="۸. تنظیمات اضافی" id="section-additional-settings">
          {/* فیلد isSpecialOffer مشابه قبل */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="isSpecialOffer"
              checked={isSpecialOffer}
              onChange={(e) => setIsSpecialOffer(e.target.checked)}
            />

            <label className="form-check-label" htmlFor="isSpecialOffer">
              نمایش به عنوان پیشنهاد ویژه
              <i
                className="bi bi-star-fill text-warning mb-1"
                style={{ fontSize: "0.9em" }}
              ></i>
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="isBestSeller"
              checked={isBestSeller}
              onChange={(e) => setIsBestSeller(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="isBestSeller">
              نمایش در لیست پرفروش‌ترین‌ها
            </label>
          </div>
        </Section>

        {/* دکمه‌های عملیاتی */}
        <div className="mt-4 pt-3 border-top d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-primary d-flex align-items-center"
            disabled={loading}
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <i className="bi bi-check2-circle me-2"></i>
            )}
            ذخیره و انتشار تغییرات
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
