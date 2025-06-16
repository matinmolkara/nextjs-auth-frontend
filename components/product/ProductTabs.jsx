import React, { useContext } from "react";
import Comments from './Comments';
import tabStyles from "../../styles/components/Tabs.module.css"

 import { ProductContext } from "@/context/ProductContext";


  


const ProductTabs = ({comments}) => {
   const { productDescriptions, productAttributes } =
     useContext(ProductContext);
  return (
    <div className="product-info">
      <div className={tabStyles.policy00}>
        <ul
          className={`nav nav-pills mb-3 ${tabStyles.navPills}`}
          id="pills-tab"
          role="tablist"
        >
          <li className={`nav-item ${tabStyles.navItem}`} role="presentation">
            <button
              className={`nav-link ${tabStyles.navLink}`}
              id="pills-invest-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-invest"
              type="button"
              role="tab"
              aria-controls="pills-invest"
              aria-selected="true"
            >
              مشخصات کلی
            </button>
          </li>
          <li className={`nav-item ${tabStyles.navItem}`} role="presentation">
            <button
              className={`nav-link ${tabStyles.navLink}`}
              id="pills-depo-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-depo"
              type="button"
              role="tab"
              aria-controls="pills-depo"
              aria-selected="false"
            >
              مشخصات فنی
            </button>
          </li>
          <li className={`nav-item ${tabStyles.navItem}`} role="presentation">
            <button
              className={`nav-link ${tabStyles.navLink}`}
              id="pills-draw-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-draw"
              type="button"
              role="tab"
              aria-controls="pills-draw"
              aria-selected="false"
            >
              نظرات
              <span>{comments?.length || 0}</span>
            </button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-invest"
            role="tabpanel"
            aria-labelledby="pills-invest-tab"
            tabIndex="0"
          >
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="product-info-text">
                    {productDescriptions?.length > 0 ? (
                      productDescriptions.map((desc) => (
                        <div key={desc.id} className="mb-3">
                          <h5>{desc.title}</h5>
                          <p>{desc.content}</p>
                        </div>
                      ))
                    ) : (
                      <p>توضیحاتی برای این محصول ثبت نشده است.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-depo"
            role="tabpanel"
            aria-labelledby="pills-depo-tab"
            tabIndex="0"
          >
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="product-info-property">
                    {productAttributes?.length > 0 ? (
                      <ul>
                        {productAttributes.map((attr) => (
                          <li key={attr.id} className="d-flex mb-2">
                            <div className="tech_title p-2">
                              <span>{attr.name}</span>
                            </div>
                            <div className="tech_value p-2">
                              <span>{attr.value}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>مشخصات فنی برای این محصول موجود نیست.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-draw"
            role="tabpanel"
            aria-labelledby="pills-draw-tab"
            tabIndex="0"
          >
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <Comments comments={comments} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTabs