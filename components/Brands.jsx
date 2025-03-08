import React from 'react'
import tabStyles from "../styles/components/Tabs.module.css";
import gridStyles from "../styles/components/ProductGrid.module.css";
import Image from "next/image";
import Link from "next/link";
const Brands = () => {
 const navTabs = [
   {
     id: "pills-invest-tab",
     target: "#pills-invest",
     ariaControls: "pills-invest",
     label: "همه",
     isActive: true,
   },
   {
     id: "pills-depo-tab",
     target: "#pills-depo",
     ariaControls: "pills-depo",
     label: "کیف",
     isActive: false,
   },
   {
     id: "pills-draw-tab",
     target: "#pills-draw",
     ariaControls: "pills-draw",
     label: "کفش",
     isActive: false,
   },
   {
     id: "pills-belt-tab",
     target: "#pills-belt",
     ariaControls: "pills-belt",
     label: "کمربند",
     isActive: false,
   },
   {
     id: "pills-glass-tab",
     target: "#pills-glass",
     ariaControls: "pills-glass",
     label: "عینک دودی",
     isActive: false,
   },
 ];
 const tabs = [
   {
     id: "pills-invest",
     ariaLabelledBy: "pills-invest-tab",
     isActive: true,
     content: [
       {
         imgSrc: "/images/hero/bestoffer3.png",
         title: "کفش فوتسال مردانه تن زیب مدل TID9602",
         price: "1,386,000 تومان",
         realPrice: "1800,000 تومان",
         discount: "24%",
         specialOffer: true,
       },
       {
         imgSrc: "/images/brands/1.png",
         title: "کفش فوتسال مردانه تن زیب مدل TID9602",
         price: "1,386,000 تومان",
         realPrice: "1800,000 تومان",
         discount: "24%",
         specialOffer: false,
       },
       {
         imgSrc: "/images/brands/2.png",
         title: "کفش فوتسال مردانه تن زیب مدل TID9602",
         price: "1,386,000 تومان",
         realPrice: "1800,000 تومان",
         discount: "24%",
         specialOffer: true,
       },
     ],
   },
   {
     id: "pills-depo",
     ariaLabelledBy: "pills-depo-tab",
     isActive: false,
     content: [],
   },
   {
     id: "pills-draw",
     ariaLabelledBy: "pills-draw-tab",
     isActive: false,
     content: [],
   },
   {
     id: "pills-belt",
     ariaLabelledBy: "pills-belt-tab",
     isActive: false,
     content: [],
   },
   {
     id: "pills-glass",
     ariaLabelledBy: "pills-glass-tab",
     isActive: false,
     content: [],
   },
 ];
  return (
    <div className="brand">
      <div className="faq-1">
        <div className={tabStyles.policy00}>
          <ul
            className={`nav nav-pills mb-3 justify-content-center ${tabStyles.navPills}`}
            id="pills-tab"
            role="tablist"
          >
            {navTabs.map((tab, index) => (
              <li
                className={`nav-item ${tabStyles.navItem}`}
                role="presentation"
                key={index}
              >
                <button
                  className={`nav-link ${tabStyles.navLink} ${
                    tab.isActive ? "customNav active" : ""
                  }`}
                  id={tab.id}
                  data-bs-toggle="pill"
                  data-bs-target={tab.target}
                  type="button"
                  role="tab"
                  aria-controls={tab.ariaControls}
                  aria-selected={tab.isActive}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="tab-content" id="pills-tabContent">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`tab-pane fade ${tab.isActive ? "show active" : ""}`}
                id={tab.id}
                role="tabpanel"
                aria-labelledby={tab.ariaLabelledBy}
                tabIndex="0"
              >
                <div className="container">
                  <div className="row">
                    {tab.content.map((item, idx) => (
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
                          {item.specialOffer && (
                            <div className={gridStyles.brandCartOffSign}>
                              <span>فروش ویژه</span>
                            </div>
                          )}
                          <Image src={item.imgSrc} alt={item.title} width={301} height={261}/>
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
                            <div className={gridStyles.brandCartFirstOffPercent}>
                              <span className={gridStyles.brandCartPrice}>
                                {item.price}
                              </span>
                              <span className={gridStyles.brandCartRealPrice}>
                                {item.realPrice}
                              </span>
                              <span className={gridStyles.brandCartOffPercent}>
                                {item.discount}
                              </span>
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
                  {tab.content.length > 0 && (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brands