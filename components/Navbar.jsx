"use client"
import React, { useState, useEffect } from "react";
import styles from "../styles/components/Navbar.module.css";
import Link from "next/link";


// تابع کمکی برای تبدیل لیست تخت (flat list) دسته‌بندی‌ها به ساختار درختی
const buildCategoryTree = (categories, parentId = null) => {
  const tree = [];
  for (const category of categories) {
    if (category.parent_id === parentId) {
      // این دسته‌بندی یک والد است (یا در بالاترین سطح قرار دارد)
      const children = buildCategoryTree(categories, category.id); // فرزندان آن را پیدا کن
      if (children.length > 0) {
        // اگر فرزند داشت، به آبجکت اضافه کن
        category.children = children;
      } else {
        // اگر فرزند نداشت، آرایه children خالی باشد یا اصلا پراپرتی children نداشته باشد
        // برای سادگی، اگر فرزند نداشت، children را null قرار می دهیم یا حذف می کنیم
        delete category.children; // یا category.children = null;
      }
      tree.push(category);
    }
  }
  return tree;
};




const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const fetchCategories = async () => {

      try {
        // آدرس API شما برای دریافت همه دسته‌بندی‌ها
        // مطمئن شوید که این آدرس صحیح است
        const res = await fetch(
          `${BASE_URL}/api/categories?all=true`
        ); // مثال: فرض کنید API شما در مسیر /api/categories قرار دارد
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        // تبدیل لیست تخت به ساختار درختی
        // فرض می کنیم دسته‌بندی‌های سطح بالا parent_id برابر null دارند
        const nestedCategories = buildCategoryTree(data.categories || []);
        setCategories(nestedCategories);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); // آرایه وابستگی خالی به معنای اجرای یک بار بعد از mount

  // تابع کمکی برای تبدیل ساختار درختی به ساختار مورد نیاز dropdownData
  // این تابع کمی پیچیده تر است زیرا نیاز داریم سطوح مختلف را به format dropdownData نگاشت کنیم
  const transformToDropdownData = (nestedCategories) => {
    return nestedCategories.map((level1) => ({
      title: level1.name, // دسته‌بندی سطح 1 نام آن عنوان اصلی dropdown است
      sections: level1.children
        ? level1.children.map((level2) => ({
            // دسته‌بندی‌های سطح 2 بخش‌ها (sections) هستند
            heading: level2.name, // نام سطح 2 عنوان بخش (heading) است
            links: level2.children
              ? level2.children.map((level3) => ({
                  // دسته‌بندی‌های سطح 3 لینک‌های داخل بخش هستند
                  label: level3.name, // نام سطح 3 لیبل لینک است
                  // href باید به صفحه لیست محصولات اشاره کند و ID دسته‌بندی را بفرستد
                  href: `/productlist?categoryId=${level3.id}`,
                }))
              : [], // اگر سطح 2 فرزندی نداشت، لینک‌ها خالی هستند
          }))
        : [], // اگر سطح 1 فرزندی (سطح 2) نداشت، بخش‌ها خالی هستند
    }));
  };

  const dropdownData = transformToDropdownData(categories);

  if (loading) {
    return <div>در حال بارگذاری دسته‌بندی‌ها...</div>; // یا یک Spinner
  }

  if (error) {
    return <div>خطا در بارگذاری دسته‌بندی‌ها: {error}</div>;
  }

  // JSX برای رندر کردن نوار ناوبری

  return (
    <>
      <div className={`navbar ${styles.navbar}`}>
        <Link href="/" className={styles.active}>
          خانه
        </Link>
        <Link href="/contactus">تماس</Link>

        {dropdownData.map((dropdown, index) => (
          <div key={index} className={`dropdown ${styles.dropdown}`}>
            <button className={styles.dropbtn}>{dropdown.title}</button>
            <div className={styles.dropdownContent}>
              <div className="d-flex justify-content-start flex-wrap">
                {dropdown.sections.map((section, idx) => (
                  <div key={idx} className="">
                    <h6>{section.heading}</h6>
                    {section.links.map((link, linkIdx) => (
                      <Link key={linkIdx} href={link.href}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Navbar;
