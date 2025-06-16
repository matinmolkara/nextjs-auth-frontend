"use client";
import React, { useEffect, useState } from "react";
import { getPageBySlug, getProductById } from "@/app/api/api";
import styles from "../styles/components/Featured.module.css";
import Image from "next/image";
import Link from "next/link";

const Featured = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const page = await getPageBySlug("home");
        const ids = page?.data?.content?.bestSellers || [];
        const fetched = await Promise.all(ids.map((id) => getProductById(id)));
        const validProducts = fetched.filter((p) => p && p.id);
        setProducts(validProducts);
      } catch (err) {
        console.error("❌ خطا در دریافت پرفروش‌ترین‌ها:", err);
      }
    };
    loadFeatured();
  }, []);

  return (
    <div className={styles.featured}>
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-12 col-lg-6 col-xl-4">
              <Link
                href={`/product/${product.slug || product.id}`}
                className={styles.featuredCardLink}
              >
                <div className={styles.featuredCard}>
                  <div className={styles.featuredCardImage}>
                    <Image
                      src={product.image_urls?.[0] || "/placeholder.jpg"}
                      alt={product.title}
                      width={155}
                      height={155}
                    />
                  </div>
                  <div className={styles.featuredCardDetial}>
                    <div className="">
                      <h6>{product.title}</h6>
                      <div className={styles.brandCartRankingStar}>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star"></i>
                      </div>
                      <div className={styles.brandCartFirstOffPercent}>
                        <span className={styles.brandCartOffPercent}>
                          {product.final_price || product.price} تومان
                        </span>
                        {Number(product.discount) > 0 && (
                          <span className={styles.brandCartRealPrice}>
                            {product.real_price} تومان
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;


