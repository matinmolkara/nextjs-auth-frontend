"use client"

import ShareModal from './ShareModal';
import React, { useState ,useContext } from "react";
import { ProductContext } from "@/context/ProductContext";
import { useRouter } from "next/navigation";

const AddToCart = ({ product, selectedColor, selectedSize }) => {
  const { addToCart } = useContext(ProductContext);
  const router = useRouter();
  const [addedToCart, setAddedToCart] = useState(false); // آیا محصول به سبد اضافه شده؟
  
  const [cartModalVisible, setCartModalVisible] = useState(false); // مدال افزودن به سبد خرید
  const [showModal, setShowModal] = useState(false);
  const [platform, setPlatform] = useState("");
  const productLink = "https://example.com/product/123"; // لینک محصول

  const handleShareClick = (platform) => {
    setPlatform(platform);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCloseCartModal = () => {
    setCartModalVisible(false); // مدال را می‌بندد
  };

  const goToCart = () => {
    router.push("/checkout/cart"); // هدایت به صفحه سبد خرید
  };
  const handleAddToCart = () => {
   if (!product) {
      console.error("محصول تعریف نشده است!");
      return;
    }
    if (!selectedColor || !selectedSize) {
      console.error("لطفاً سایز و رنگ را انتخاب کنید!");
      return;
    }
      
      setAddedToCart(true); // وضعیت افزودن به سبد خرید را تغییر می‌دهد
      setCartModalVisible(true); // مدال را نمایش می‌دهد
      addToCart(product, selectedColor, selectedSize); // محصول را به سبد اضافه می‌کند
    
  };
  return (
    <div>
      <div className="product-detail-shop">
        <div className="product-detail-shop-quantity">
          <div className="product-detail-shop-btn me-auto">
            {!addedToCart ? (
      
                
                <button className="btn" onClick={handleAddToCart}>
                  <i className="bi bi-cart3"></i>
                  افزودن به سبد خرید
                </button>
          
            ) : (
              <button className="btn" onClick={goToCart}>
                رفتن به سبد خرید
              </button>
            )}
            <button className="btn">
              <i className="bi bi-heart"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="product-detail-shop">
        <div className="product-detail-shop-share">
          <button
            className="btn btn-teleg"
            onClick={() => handleShareClick("تلگرام")}
          >
            <i className="bi bi-telegram"></i>
            اشتراک گذاری در تلگرام
          </button>
          <button
            className="btn btn-insta"
            onClick={() => handleShareClick("اینستاگرام")}
          >
            <i className="bi bi-instagram"></i>
            اشتراک گذاری در اینستاگرام
          </button>
        </div>
      </div>
      {showModal && (
        <ShareModal
          platform={platform}
          productLink={productLink}
          onClose={handleCloseModal}
        />
      )}

      {cartModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>محصول به سبد خرید اضافه شد!</p>
            <button className="btn" onClick={goToCart}>
              رفتن به سبد خرید
            </button>
            <button className="btn" onClick={handleCloseCartModal}>
              بستن
            </button>
          </div>
          <style jsx>{`
            .modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.5);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 1000;
            }

            .modal-content {
              background: #fff;
              padding: 20px;
              border-radius: 8px;
              text-align: center;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
              width: 90%;
              max-width: 400px;
            }

            .link-input {
              width: 100%;
              padding: 8px;
              margin: 10px 0;
              border: 1px solid #ccc;
              border-radius: 4px;
              font-size: 14px;
            }

            .btn {
              padding: 10px 15px;
              margin: 5px;
              font-size: 14px;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            }

            .btn-copy {
              background: #0070f3;
              color: #fff;
              font-size: 13px;
            }

            .btn-close {
              background: #f44336;
              color: #fff;
              font-size: 13px;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default AddToCart