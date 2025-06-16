"use client";
import { useContext } from "react";
import { ProductContext } from "@/context/ProductContext";
import styles from "../../styles/components/Address.module.css";

const AddressItem = ({
  address,
  onSelectAddress,
  onDeleteAddress,
  onEditAddress,
  isShippingPage,
}) => {
  const { setDefaultAddress,provinces,cities } = useContext(ProductContext);
  const {
    id,
    reciever,
    province_id,
    city_id,
    full_address,
    building_num,
    unit_num,
    zip_code,
    tel,
    is_default
  } = address;


  const provinceName = provinces.find((p) => p.id === province_id)?.name || "";
  const cityName = cities.find((c) => c.id === city_id)?.name || "";
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
                onChange={async () => {
                  
                  await setDefaultAddress(id); // 👈 ارسال به سرور
                  onSelectAddress(province_id); // 👈 محاسبه هزینه ارسال
                }}
              />
            </div>
          </td>
        )}
        <td className="align-middle">
          {is_default && (
            <span className="badge bg-success">آدرس پیش‌فرض</span>
          )}
        </td>
        <td className="align-middle">{reciever}</td>
        <td className={`${styles.cartTitle} align-middle`}>
          {`${provinceName} - ${cityName} - ${full_address} - پلاک : ${building_num} - واحد: ${unit_num} - کدپستی: ${zip_code}`}
        </td>
        <td className="align-middle">{tel}</td>
        <td className="align-middle">
          <button
            className="btn"
            data-bs-toggle="modal"
            data-bs-target="#addressModal"
            onClick={() => onEditAddress(address)}
          >
            <i className="bi bi-pen"></i>
          </button>
          <button className="btn" onClick={() => onDeleteAddress(id)}>
            <i className="bi bi-x"></i>
          </button>
        </td>
      </tr>
    </>
  );
};

export default AddressItem;
