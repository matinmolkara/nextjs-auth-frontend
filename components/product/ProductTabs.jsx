import React from 'react'
import Comments from './Comments';
import tabStyles from "../../styles/components/Tabs.module.css"

 

  


const ProductTabs = ({comments}) => {
   
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
              <span>0</span>
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
                    <h5>هدفون، هدست و هندزفری انکر</h5>
                    <p>
                      امروزه هدفون تنها یک لوازم جانبی برای دستگاه‌های هوشمند
                      نیست، بلکه خود دستگاهی است که هنگام خرید آن باید بسیار دقت
                      کرد و مدل‌های متنوع آن را بررسی و مقایسه کرد. هدفون‌ها از
                      تنوع گسترده‌ای برخوردار هستند ولی به‌طور کلی می‌توان آن‌ها
                      را در دو گروه اصلی بی‌سیم و باسیم قرار داد. تا چند سال پیش
                      اکثر افراد هدفون‌های باسیم انتخاب می‌کردند و هدفون‌های
                      بی‌سیم، خیلی خوب نبودند.
                    </p>
                    <h6>انواع هدفون انکر</h6>
                    <p>
                      امروزه ده‌ها برند مطرح در زمینه‌ی طراحی و تولید انواع
                      هدفون و هدست فعال هستند. انکر Anker شرکت الکترونیکی چینی
                      مستقر در شنژن است. این شرکت به دلیل تولید لوازم جانبی
                      رایانه‌ای و سیار شامل شارژرهای تلفن، پاوربانک ها،
                      هدفون‌ها، بلندگوها، کابل‌های شارژ، چراغ قوه، محافظ صفحه و
                      موارد دیگر شناخته شده است. هدفون‌ها و هدست‌های این برند از
                      تکنولوژی روز دنیا، تناسب صدا و طراحی مناسب برخوردار هستند.
                      برند انکر دارای چند هدفون بی‌سیم بسیار خوب با ارزش خرید
                      است که شبیه به ایرپاد اپل است. مدل هدفون بی‌سیم انکر مدل
                      SoundCore Liberty Air 2 بهترین ترکیب صدا، کیفیت تماس، صدا
                      و قیمت را دارد و برای ساعت‌ها استفاده راحت است. این مدل از
                      طریق بلوتوث به دستگاه موبایل متصل می‌شود و از فرمت‌های
                      صوتی SBC ، AAC و aptX پشتیبانی می‌کند که با رنج قیمت خود
                      این کیفیت بسیار نادر است. از هر هدفون این مدل می‌توان
                      به‌طور مستقل استفاده کرد و همچنان صدای باکیفیتی را شنید.
                      به‌طور کلی هدفون‌های کاملاً بی‌سیم انکر که به هندزفری
                      بلوتوث معروف هستند، از همه نظر عالی و تقریباً با هر
                      بودجه‌ای می‌توان یکی از آن‌ها را تهیه کرد.
                    </p>
                    <h6>خرید آنلاین هدفون</h6>
                    <p>
                      ، هدست و هندزفری انکر برای خرید اینترنتی هندزفری انکر
                      می‌توان به فروشگاه اینترنتی مراجعه کرد. مجموعه‌ای از
                      جدیدترین و بهترین هدفون‌های برندهای ایرانی و خارجی را
                      گردآوری کرده است.
                    </p>
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
                    <ul>
                      <li className="mt-2">
                        مشخصات فنی
                        <ul>
                          <li className="d-flex mb-2">
                            <div className="tech_title p-2">
                              <span>ضد آب</span>
                            </div>
                            <div className="tech_value p-2">
                              <span>خیر</span>
                            </div>
                          </li>
                          <li className="d-flex mb-2">
                            <div className="tech_title p-2">
                              <span>کشور سازنده</span>
                            </div>
                            <div className="tech_value p-2">
                              <span>ایران</span>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li className="mt-2">
                        مشخصات ظاهری
                        <ul>
                          <li className="d-flex mb-2">
                            <div className="tech_title p-2">
                              <span>ضد آب</span>
                            </div>
                            <div className="tech_value p-2">
                              <span>خیر</span>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
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