
"use client";
import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "@/context/ProductContext"; // مسیر فرضی
import { getCategoryAttributes } from "@/app/api/api"; // مسیر فرضی
import Image from "next/image";
import Section from "@/components/admin/products/Section";
import { addProduct } from "@/app/api/api";
import Link from "next/link";
import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";
const AddProductPage = () => {
;
  const {
    categories,
    brands,
    sizes: mockSizesFromContext, // تغییر نام برای جلوگیری از تداخل
    colors: mockColorsFromContext, // تغییر نام برای جلوگیری از تداخل
  } = useContext(ProductContext);
  const router = useRouter();


  



  // State ها از کد اول و دوم ترکیب شده‌اند
  const [productTitle, setProductTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const [categoryAttributes, setCategoryAttributes] = useState([]); // ویژگی‌های بارگذاری شده از دسته
 


  const [commonAttributes, setCommonAttributes] = useState([]);
  const [customAttributes, setCustomAttributes] = useState([]);
  const [commonFeatures, setCommonFeatures] = useState({});
  const [customFeatures, setCustomFeatures] = useState({});






  const [detailedDescriptionTitle, setDetailedDescriptionTitle] = useState("");
  const [detailedDescriptionText, setDetailedDescriptionText] = useState("");
  const [price, setPrice] = useState("");
  const [discountType, setDiscountType] = useState("percentage"); // 'percentage' or 'fixed'
  const [discountValue, setDiscountValue] = useState("");
  const [isSpecialOffer, setIsSpecialOffer] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [stock, setStock] = useState("");
  const [productImages, setProductImages] = useState([]); // آرایه‌ای از آبجکت‌های File

  const [formErrors, setFormErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState("");

  // بارگذاری ویژگی‌های دسته بندی هنگام تغییر دسته
  useEffect(() => {
    if (!selectedCategory) {
      setCommonAttributes([]);
      setCustomAttributes([]);
      setCommonFeatures({});
      setCustomFeatures({});
      return;
    }
    getCategoryAttributes(selectedCategory)
      .then((data) => {
        const common = (data || []).filter((a) => !a.is_custom);
        const custom = (data || []).filter((a) => a.is_custom);

        setCommonAttributes(common);
        setCustomAttributes(custom);

        // مقداردهی اولیه به state
        const commonInit = {};
        const customInit = {};
        common.forEach((attr) => (commonInit[attr.id] = ""));
        custom.forEach((attr) => (customInit[attr.id] = ""));
        setCommonFeatures(commonInit);
        setCustomFeatures(customInit);
      })
      .catch((err) => {
        console.error("خطا در دریافت ویژگی‌ها:", err);
        setCommonAttributes([]);
        setCustomAttributes([]);
        setCommonFeatures({});
        setCustomFeatures({});
      });
  }, [selectedCategory]);

  // توابع مربوط به ویژگی‌های خاص (customFeatures)


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

  // // مدیریت آپلود تصاویر
  // const handleImageUpload = (event) => {
  //   const files = Array.from(event.target.files);
  //   // اینجا می‌توانید محدودیت‌هایی برای تعداد یا حجم فایل‌ها اعمال کنید
  //   const newImages = files.filter(
  //     (file) =>
  //       !productImages.some((existingFile) => existingFile.name === file.name)
  //   ); // جلوگیری از انتخاب تکراری با نام یکسان
  //   setProductImages((prevImages) => [...prevImages, ...newImages]);
  //   if (formErrors.productImages && newImages.length > 0) {
  //     setFormErrors((prev) => ({ ...prev, productImages: null }));
  //   }
  // };




  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const uploadedUrls = [];

    for (const file of files) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `products/${fileName}`;

      const { error } = await supabase.storage
        .from("product-images")
        .upload(filePath, file);

      if (error) {
        console.error("خطا در آپلود:", error.message);
        continue;
      }

      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      uploadedUrls.push({
        name: file.name,
        url: data.publicUrl,
      });
    }

    if (uploadedUrls.length > 0) {
      setProductImages((prev) => [...prev, ...uploadedUrls]);
      if (formErrors.productImages) {
        setFormErrors((prev) => ({ ...prev, productImages: null }));
      }
    }
  };

  // const handleRemoveImage = (imageName) => {
  //   setProductImages((prevImages) =>
  //     prevImages.filter((img) => img.name !== imageName)
  //   );
  // };
  const handleRemoveImage = (imageName) => {
    setProductImages((prevImages) =>
      prevImages.filter((img) => img.name !== imageName)
    );
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
    if (productImages.length === 0)
      errors.productImages = "حداقل یک تصویر برای محصول آپلود کنید.";

    // اعتبارسنجی ویژگی‌های مشترک الزامی (اگر type شامل isRequired باشد)
    categoryAttributes.forEach((attr) => {
      if (attr.isRequired && !commonFeatures[attr.id]?.trim()) {
        errors[
          `common_feature_${attr.id}`
        ] = `مقدار برای ${attr.name} الزامی است.`;
      }
    });
    commonAttributes.forEach((attr) => {
      if (attr.is_required && !commonFeatures[attr.id]?.trim()) {
        errors[
          `common_feature_${attr.id}`
        ] = `مقدار برای ${attr.name} الزامی است.`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ارسال فرم
  const handleSubmit = async (event, isDraft = false) => {
    event.preventDefault();
    setFormSuccess("");
    setFormErrors({});

    if (!isDraft && !validateForm()) {
 
      // پیدا کردن اولین فیلد با خطا و اسکرول به آن (اختیاری)
      const firstErrorField = Object.keys(formErrors)[0];
      if (firstErrorField) {
        let elementId = firstErrorField;
        if (firstErrorField.startsWith("common_feature_")) {
          elementId = "section-product-features"; // اسکرول به بخش ویژگی ها
        } else if (firstErrorField === "productImages") {
          elementId = "section-product-images";
        } else if (
          firstErrorField === "selectedCategory" ||
          firstErrorField === "selectedBrand"
        ) {
          elementId = "section-category-brand";
        }
        // ... می‌توانید برای سایر فیلدها نیز ID در نظر بگیرید
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
      return;
    }

    // محاسبه تخفیف و قیمت واقعی
    const numericPrice = parseFloat(price);
    let realPrice = numericPrice;
    let discount = 0;

    if (discountValue) {
      const value = parseFloat(discountValue);
      if (discountType === "percentage") {
        discount = value;
        realPrice = numericPrice - (numericPrice * value) / 100;
      } else {
        discount = value;
        realPrice = numericPrice - value;
      }
    }

    // آماده‌سازی ویژگی‌ها
    const attributes = [];

    // مشترک‌ها
    Object.entries(commonFeatures).forEach(([attribute_id, value]) => {
      if (value.trim()) {
        attributes.push({ attribute_id: Number(attribute_id), value });
      }
    });

    // خاص‌ها
    Object.entries(customFeatures).forEach(([attribute_id, value]) => {
      if (value.trim()) {
        attributes.push({
          attribute_id: Number(attribute_id),
          value,
        });
      }
    });

    const descriptions = [
      {
        title: detailedDescriptionTitle,
        content: detailedDescriptionText,
      },
    ];


    const formData = new FormData();
 
    formData.append("title", productTitle);
    formData.append("description", shortDescription);
    formData.append("price", numericPrice);
    formData.append("real_price", realPrice);
    formData.append("discount", discount);
    formData.append("inventory", parseInt(stock));
    formData.append("category_id", selectedCategory);
    formData.append("brand_id", selectedBrand || null);
    formData.append("special_offer", isSpecialOffer);
    formData.append("best_seller", isBestSeller);

    formData.append("has_color", selectedColors.length > 0);
    formData.append("has_size", selectedSizes.length > 0);
    formData.append("color_ids", JSON.stringify(selectedColors));
    formData.append("sizes", JSON.stringify(selectedSizes));
    formData.append("attributes", JSON.stringify(attributes));
    formData.append("descriptions", JSON.stringify(descriptions));


    productImages.forEach((img) => formData.append("images", img)); // نام فیلد باید با بک‌اند هماهنگ باشد

    if (isDraft) {
      formData.append("status", "draft");
    }

    try {
      await addProduct(formData); // فرض بر اینکه در فایل api تعریف شده
      setFormSuccess(
        isDraft ? "پیش‌نویس با موفقیت ذخیره شد!" : "محصول با موفقیت اضافه شد!"
      );
    } catch (err) {
      console.error("❌ خطا در ارسال محصول:", err);
      setFormErrors({ api: "خطا در ذخیره محصول. لطفاً مجدد تلاش کنید." });
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>افزودن محصول جدید</h3>
        <Link href="/admin-panel/products" className="btn btn-outline-dark">
          <i className="bi bi-box-seam me-1"></i> بازگشت به لیست محصولات
        </Link>
      </div>
      {formSuccess && (
        <div
          className="alert alert-success d-flex align-items-center"
          role="alert"
        >
          {/* <CheckCircleIcon className="me-2" /> یا <i className="bi bi-check2-circle me-2"></i> */}
          <i className="bi bi-check2-circle me-2"></i>
          {formSuccess}
        </div>
      )}
      {Object.keys(formErrors).length > 0 && !formSuccess && (
        <div className="alert alert-danger" role="alert">
          لطفاً خطاهای فرم را برطرف کنید.
        </div>
      )}

      <form onSubmit={(e) => handleSubmit(e, false)} noValidate>
        {/* بخش اطلاعات پایه */}
        <Section title="۱. اطلاعات پایه محصول" id="section-basic-info">
          <div className="mb-3">
            <label htmlFor="productTitle" className="form-label">
              عنوان محصول{" "}
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
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="selectedCategory" className="form-label">
                دسته‌بندی محصول{" "}
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
                className="form-select" // برند می‌تواند اختیاری باشد
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
                ویژگی‌های مشترک دسته‌بندی:{" "}
                {categories.find((cat) => cat.id === selectedCategory)?.name}
              </h6>

              {commonAttributes.map((attr) => (
                <div key={attr.attribute_id} className="mb-3">
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

              {customAttributes.map((attr) => (
                <div key={attr.attribute_id} className="mb-3">
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
            <div className="form-text">
              برای امکانات ویرایش پیشرفته‌تر (مانند افزودن عکس، لیست، تغییر فونت
              و...)، می‌توانید از یک ویرایشگر متن غنی (Rich Text Editor) مانند
              ReactQuill یا Editor.js استفاده کنید.
            </div>
          </div>
        </Section>

        {/* بخش قیمت‌گذاری و موجودی */}
        <Section title="۶. قیمت‌گذاری و موجودی" id="section-pricing-stock">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="price" className="form-label">
                قیمت اصلی (تومان){" "}
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
                    {" "}
                    {/* d-block to show with input-group */}
                    {formErrors.discountValue}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="stock" className="form-label">
              تعداد موجودی{" "}
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

        {/* بخش تصاویر محصول */}
        <Section title="۷. تصاویر محصول" id="section-product-images">
          <div className="mb-3">
            <label htmlFor="productImagesInput" className="form-label">
              آپلود تصاویر محصول{" "}
              {formErrors.productImages && (
                <span className="text-danger">*</span>
              )}
            </label>
            <div className="p-4 border-2 border-dashed rounded text-center mb-2 bg-light">
              {" "}
              {/* سبک شبیه کد اول */}
              {/* <UploadCloudIcon className="display-4 text-muted mb-2" /> یا آیکون مشابه */}
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
                  className="d-none" // مخفی چون با لیبل کنترل می‌شود
                  multiple
                  onChange={handleImageUpload}
                  accept="image/*"
                />
                <span className="mx-1">
                  یا بکشید و رها کنید (Drag & Drop هنوز پیاده‌سازی نشده)
                </span>
              </p>
              <p className="text-muted small">PNG, JPG, GIF تا ۱۰ مگابایت</p>
            </div>
            {formErrors.productImages && (
              <div className="d-block text-danger small mt-1">
                {/* <AlertCircleIcon className="me-1" /> */}
                <i className="bi bi-exclamation-circle me-1"></i>
                {formErrors.productImages}
              </div>
            )}
          </div>

          {productImages.length > 0 && (
            <div className="mt-3">
              <h6>تصاویر انتخاب شده:</h6>
              <div className="row g-2">
                {productImages.map((image, index) => (
                  <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2">
                    <div className="card h-100 position-relative shadow-sm">
                      <Image
                        src={image.url}
                        alt={`پیش‌نمایش ${image.name}`}
                        className="card-img-top"
                        style={{ height: "100px", objectFit: "cover" }}
                        width={436}
                        height={407}
                      />
                      <button
                        type="button"
                        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 p-0 lh-1"
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                        }}
                        onClick={() => handleRemoveImage(image.name)}
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
        </Section>

        {/* بخش تنظیمات اضافی */}
        <Section title="۸. تنظیمات اضافی" id="section-additional-settings">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="isSpecialOffer"
              checked={isSpecialOffer}
              onChange={(e) => setIsSpecialOffer(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="isSpecialOffer">
              نمایش به عنوان پیشنهاد ویژه{" "}
              {/* <StarIcon className="text-warning mb-1" style={{fontSize: '0.9em'}} /> */}
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
            type="button"
            onClick={() => router.push("/admin-panel/products")}
            className="btn btn-danger d-flex align-items-center me-3"
          >
            <i className="bi bi-x-circle me-1"></i>
            لغو
          </button>
          <button
            type="submit"
            className="btn btn-primary d-flex align-items-center"
          >
            {/* <CheckCircleIcon className="me-1" /> */}
            <i className="bi bi-check2-circle me-1"></i>
            انتشار محصول
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
