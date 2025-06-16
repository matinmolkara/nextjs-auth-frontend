// components/Brands.jsx
"use client";
import React, { useEffect, useState } from "react";
import { getPageBySlug, getProductById } from "@/app/api/api";
import Link from "next/link";
import Image from "next/image";
import tabStyles from "../styles/components/Tabs.module.css";
import gridStyles from "../styles/components/ProductGrid.module.css";

const Brands = () => {
  const [tabsData, setTabsData] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const page = await getPageBySlug("home");
        const topBrands = page.data?.content?.topBrands || [];

        const productIds = topBrands.flatMap((tab) => tab.productIds || []);
        const uniqueIds = [...new Set(productIds)];

        const fetches = await Promise.all(
          uniqueIds.map((id) => getProductById(id))
        );
        const productDict = {};
        fetches.forEach((p) => {
         
          if (p && p.id) productDict[p.id] = p;
        });

        setTabsData(topBrands);
        setProductsMap(productDict);
      } catch (err) {
        console.error("خطا در دریافت برندها:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBrands();
  }, []);

  if (loading)
    return <div className="text-center py-5">در حال بارگذاری...</div>;
  if (!tabsData.length) return null;

  return (
    <div className="brand">
      <div className="faq-1">
        <div className={tabStyles.policy00}>
          <ul
            className={`nav nav-pills mb-3 justify-content-center ${tabStyles.navPills}`}
            id="pills-tab"
            role="tablist"
          >
            {tabsData.map((tab, index) => (
              <li className={`nav-item ${tabStyles.navItem}`} key={index}>
                <button
                  className={`nav-link ${tabStyles.navLink} ${
                    index === 0 ? "customNav active" : ""
                  }`}
                  id={`tab-${index}`}
                  data-bs-toggle="pill"
                  data-bs-target={`#pane-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={index === 0}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="tab-content" id="pills-tabContent">
            {tabsData.map((tab, index) => {
              const products = (tab.productIds || [])
                .map((pid) => productsMap[pid])
                .filter(Boolean);

              return (
                <div
                  key={index}
                  className={`tab-pane fade ${
                    index === 0 ? "show active" : ""
                  }`}
                  id={`pane-${index}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${index}`}
                >
                  <div className="container">
                    <div className="row">
                      {products.map((item, idx) => (
                        <div
                          key={idx}
                          className="col-12 col-lg-6 col-xl-3 d-flex justify-content-center justify-content-lg-start"
                        >
                          <div className={gridStyles.brandCart}>
                            <div className={gridStyles.brandCartOverlay}>
                              <div className={gridStyles.brandCartOverlayIcons}>
                                <Link href="#">
                                  <i className="bi bi-heart"></i>
                                </Link>
                                <Link href="#">
                                  <i className="bi biCart3"></i>
                                </Link>
                              </div>
                            </div>
                            {item.special_offer && (
                              <div className={gridStyles.brandCartOffSign}>
                                <span>فروش ویژه</span>
                              </div>
                            )}
                            <Image
                              src={item.image_urls[0]}
                              alt={item.title}
                              width={301}
                              height={261}
                            />
                            <div className={gridStyles.brandCartDetail}>
                              <div className={gridStyles.brandCartFirstTitle}>
                                <h4 className={gridStyles.brandCartTitle}>
                                  {item.title}
                                </h4>
                              </div>
                              <div className={gridStyles.brandCartRankingStar}>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star"></i>
                              </div>
                              {/* <div
                                className={gridStyles.brandCartFirstOffPercent}
                              >
                                <span className={gridStyles.brandCartPrice}>
                                  {item.price}
                                </span>
                                <span className={gridStyles.brandCartRealPrice}>
                                  {item.real_price}
                                </span>
                                <span
                                  className={gridStyles.brandCartOffPercent}
                                >
                                  {item.discount}
                                </span>
                              </div> */}

                              <div
                                className={gridStyles.brandCartFirstOffPercent}
                              >
        
                                {item.discount &&
                                String(item.discount).replace("%", "").trim() !=
                                  "0" ? (
                                  // --- حالت 1: محصول تخفیف دارد ---
                                  <>
                                    {/* قیمت نهایی (با تخفیف) */}
                                    <span className={gridStyles.brandCartPrice}>
                                      {item.price}
                                    </span>
                                    {/* قیمت اصلی محصول (معمولاً خط خورده نمایش داده می‌شود) */}
                                    <span
                                      className={gridStyles.brandCartRealPrice}
                                    >
                                      {item.real_price}
                                    </span>
                                    {/* متن یا مقدار تخفیف */}
                                    <span
                                      className={gridStyles.brandCartOffPercent}
                                    >
                                      {item.discount}
                                    </span>
                                  </>
                                ) : (
                                  // --- حالت 2: محصول تخفیف ندارد (یا تخفیف صفر است) ---
                                  // فقط قیمت واقعی محصول به عنوان قیمت اصلی نمایش داده می‌شود
                                  <span className={gridStyles.brandCartPrice}>
                                    {item.real_price}
                                  </span>
                                )}
                              </div>






                              <button className="btn btn-dark">
                                <Link href="#">
                                  <i className="bi bi-arrow-left-short text-white"></i>
                                </Link>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {products.length > 0 && (
                      <div className="row">
                        <div className="col-12">
                          <div className="d-flex justify-content-center">
                            <h5 className={gridStyles.more}>
                              <Link href="#"> مشاهده بیشتر </Link>
                            </h5>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
