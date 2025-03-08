"use client"
import { useState } from "react";
import AddressModal from "./AddressModal";

import styles from "../../styles/components/Address.module.css";

const AddressItem = ({
  address,
  onSelectAddress,
  onDeleteAddress,
  onEditAddress,
  isShippingPage,
}) => {
  const {
    id,
    reciever,
    province,
    city,
    fullAddress,
    buildingNum,
    unitNum,
    zipCode,
    tel,
  } = address; // دریافت ویژگی‌های محصول

//  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// const handleEdit = (updatedAddress) => {
//   onEditAddress(id, updatedAddress); // ارسال آدرس ویرایش‌شده به تابع والد
//   setIsEditModalOpen(false); // بستن مودال پس از ویرایش
// };
//   const formatPrice = (price) => {
//     return `${price.toLocaleString("fa-IR")} تومان`;
//   };

  return (
    <>
      <tr>
        {isShippingPage && (
          <td>
            <div className="form-check">
              <label
                className="form-check-label d-none"
                htmlFor={`flexRadioDefault${id}`}
              ></label>
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id={`flexRadioDefault${id}`}
                onChange={() => onSelectAddress(province)} // ارسال هزینه ارسال به تابع والد
              />
            </div>
          </td>
        )}

        <td className="align-middle">{reciever}</td>

        <td className={`${styles.cartTitle} align-middle`}>
          {`${province} - ${city} - ${fullAddress} - پلاک : ${buildingNum} - واحد: ${unitNum} - کدپستی: ${zipCode}`}
        </td>
        <td className="align-middle">{tel}</td>
        <td className="align-middle">
          <button
            className="btn"
            data-bs-toggle="modal"
            data-bs-target="#addressModal"
            onClick={() => onEditAddress(address)} // ارسال آدرس به والد
          >
            <i className="bi bi-pen"></i>
          </button>
          <button className="btn" onClick={() => onDeleteAddress(id)}>
            <i className="bi bi-x"></i>
          </button>
        </td>
      </tr>
      {/* {isEditModalOpen && (
        <AddressModal
          onSave={handleEdit}
          initialData={address} // ارسال اطلاعات اولیه به مودال
        />
      )} */}
    </>
  );
};

export default AddressItem;
