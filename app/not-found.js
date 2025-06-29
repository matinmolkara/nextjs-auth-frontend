"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Custom404() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // تولید ذرات فقط در کلاینت
    const particleData = [...Array(12)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setParticles(particleData);
  }, []);

  return (
    <div className="error-404-container">
      {/* Animated Background Elements */}
      <div className="background-elements">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Floating Particles */}
      <div className="particles-container">
        {particles.length > 0 &&
          particles.map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
              }}
            ></div>
          ))}
      </div>

      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-lg-8 col-md-10 col-12">
            <div className="text-center position-relative error-content">
              {/* Main 404 Content */}
              <div className="mb-5">
                {/* Animated 404 Number */}
                <div className="position-relative">
                  <h1 className="error-number">404</h1>
                  <div className="error-number-shadow">404</div>
                </div>

                {/* Main Title */}
                <div className="mt-4">
                  <h2 className="error-title">صفحه مورد نظر پیدا نشد</h2>
                </div>
              </div>

              {/* Description */}
              <div className="mb-5">
                <p className="error-description mb-4">
                  متأسفانه صفحه‌ای که دنبال آن می‌گردید وجود ندارد یا منتقل شده
                  است.
                </p>
                <p className="error-subtitle">
                  Could not find requested resource
                </p>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">
                <Link
                  href="/"
                  className="btn btn-primary btn-lg custom-btn-primary px-5 py-3"
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  بازگشت به خانه
                </Link>

                <button className="btn btn-outline-light btn-sm custom-btn-outline">
                  گزارش مشکل
                </button>
              </div>

              {/* Decorative Elements */}
              <div className="mt-5 d-flex justify-content-center gap-2">
                <div className="dot dot-1"></div>
                <div className="dot dot-2"></div>
                <div className="dot dot-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
