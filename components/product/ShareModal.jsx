"use client"


const ShareModal = ({ platform, productLink, onClose }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(productLink); // کپی لینک به کلیپ‌بورد
    alert("لینک کپی شد!");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>اشتراک گذاری در {platform}</h3>
        <p>برای اشتراک‌گذاری، لینک زیر را کپی کنید:</p>
        <input
          type="text"
          value={productLink}
          readOnly
          className="link-input"
        />
        <button onClick={handleCopyLink} className="btn btn-copy">
          کپی لینک
        </button>
        <button onClick={onClose} className="btn btn-close">
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
  );
};

export default ShareModal;
