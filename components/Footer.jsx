// Footer.js
import styles from "../styles/components/Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";

const FooterLinks = ({ title, links }) => (
  <div className="col-12 col-lg-3 d-flex justify-content-center">
    <div className={styles.footer01}>
      <h4>{title}</h4>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const FooterContact = () => (
  <div className="col-12 col-lg-3 d-flex justify-content-center">
    <div className={styles.footer01}>
      <h4>ارتباط با ما</h4>
      <ul>
        <li>
          <Link href="#">
            <Image
              src="/images/footer/phone.png"
              alt="Phone"
              width={16}
              height={16}
            />
          <span dir="ltr" className="text-left" style={{ direction: "ltr !important"}}>+98 936 525 1806</span>
          </Link>
        </li>
        <li>
          <Link href="#">
            <Image
              src="/images/footer/email.png"
              alt="Email"
              width={16}
              height={16}
            />
            zahramolkara@gmail.com
          </Link>
        </li>
        <li>
          <Link href="#">
            <Image
              src="/images/footer/location.png"
              alt="Location"
              width={16}
              height={16}
            />
            Iran-tehran
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

const FooterSocials = () => (
  <div className={styles.footer010}>
    <h4>مار ا دنبال کنید:</h4>
    <div className={styles.socialLinks}>
      {["facebook", "instagram", "whatsapp", "telegram"].map((platform) => (
        <Link href="#" key={platform}>
          <Image
            src={`/images/footer/${platform}.png`}
            alt={platform}
            width={34}
            height={34}
          />
        </Link>
      ))}
    </div>
  </div>
);

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer0}>
        <div className={styles.footer1}>
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-3">
                <div className={styles.footer01} id={styles.footer01}>
                  <div className="d-flex align-content-center justify-content-start">
                    <Logo />
                  </div>
                  <p>
                    فروشگاه اینترنتی ما با هدف ارائه بهترین تجربه خرید آنلاین
                    و دسترسی آسان به محصولات با کیفیت راه‌اندازی شده است. ما
                    متعهد به ارائه خدمات عالی و پشتیبانی مشتری هستیم.
                  </p>
                </div>
              </div>
              <FooterLinks
                title="لینک های مفید"
                links={[
                  { href: "/contactus", label: "تماس با ما" },
                  { href: "/", label: "والمارت" },
                  { href: "#", label: "نحوه همکاری" },
                  { href: "#", label: "سوالات متداول" },
                ]}
              />
              <FooterLinks
                title="حساب کاربری"
                links={[
                  { href: "/profile", label: "پنل کاربری" },
                  { href: "/users/login", label: "ورود" },
                  { href: "/users/register", label: "ثبت نام" },
                  { href: "/checkout/cart", label: "سبد خرید" },
                ]}
              />
              <FooterContact />
            </div>
            <div className="row">
              <div className="col-12 col-lg-3"></div>
              <div className="col-12 col-lg-9">
                <FooterSocials />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer2}>
        <p>© کپی رایت 1403. همه حقوق محقوظ است.</p>
      </div>
    </footer>
  );
};

export default Footer;
