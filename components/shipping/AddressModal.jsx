"use client"
import React, {useState, useContext, useEffect} from 'react';
import { ProductContext } from '@/context/ProductContext';

const AddressModal = ({ onSave, initialData = null }) => {
  const {
    provinces,
    cities,
    selectedAddress,
    setSelectedAddress,
    isEditMode,
    setIsEditMode,
  } = useContext(ProductContext);

  const [filteredCities, setFilteredCities] = useState([]);
  const [newAddress, setNewAddress] = useState(
    initialData || {
      reciever: "",
      province: "",
      city: "",
      fullAddress: "",

      buildingNum: "",
      unitNum: "",
      zipCode: "",
      tel: "",
    }
  );
  const [successMessage, setSuccessMessage] = useState(""); // مدیریت پیام موفقیت
  // مقداردهی اولیه هنگام ویرایش
  useEffect(() => {
    if (initialData) {
      setNewAddress(initialData);
      const selectedProvince = provinces.find(
        (p) => p.name === initialData.province
      );
      if (selectedProvince) {
        setFilteredCities(
          cities.filter((city) => city.provinceId === selectedProvince.id)
        );
      }
    }
  }, [initialData, provinces, cities]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/[^0-9]/g, "");
     if (Number(value) < 0) return;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };
const handleKeyDown = (e) => {
  if (["-", "+", ".", "e"].includes(e.key)) {
    e.preventDefault(); // جلوگیری از ورود کاراکترهای نامطلوب
  }
};
  const handleProvinceChange = (provinceId) => {
    const provinceName =
      provinces.find((p) => p.id === +provinceId)?.name || "";
    setNewAddress((prev) => ({ ...prev, province: provinceName, city: "" }));
    setFilteredCities(cities.filter((city) => city.provinceId === +provinceId));
  };

  const handleSave = () => {
    // اعتبارسنجی برای جلوگیری از اضافه شدن آدرس خالی
    if (
      !newAddress.reciever ||
      !newAddress.tel ||
      !newAddress.province ||
      !newAddress.city ||
      !newAddress.fullAddress
    ) {
      alert("لطفاً تمام فیلدهای ضروری را پر کنید.");
      return;
    }
    onSave(newAddress);

    // نمایش پیام موفقیت
    setSuccessMessage(
      initialData ? "آدرس با موفقیت ویرایش شد." : "آدرس جدید با موفقیت ثبت شد."
    );

    // بستن مودال پس از ذخیره
    const modal = document.getElementById("addressModal");
    const modalInstance = window.bootstrap.Modal.getInstance(modal);
    modalInstance.hide();

    // پاک کردن پیام موفقیت پس از 3 ثانیه
    setTimeout(() => setSuccessMessage(""), 3000);

    // بازنشانی فرم

    setNewAddress({
      reciever: "",
      province: "",
      city: "",
      fullAddress: "",
      buildingNum: "",
      unitNum: "",
      zipCode: "",
      tel: "",
    });
  };

  return (
    <div
      className="modal fade"
      id="addressModal"
      tabIndex="-1"
      aria-labelledby="addressModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl modal-fullscreen-md-down">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">
              <i className="bi bi-pin"></i>
              {initialData ? "ویرایش آدرس" : "ثبت آدرس جدید"}
            </h4>
          </div>
          <div className="modal-body">
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            <form>
              <div className="row mx-auto">
                <div className="form-group col-12 col-md-6 mb-3">
                  <label htmlFor="nameRecv">
                    نام کامل گیرنده
                    <i
                      className="bi bi-star p-2"
                      style={{ color: "red", fontSize: "6px" }}
                    ></i>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameRecv"
                    name="reciever"
                    aria-describedby="recvHelp"
                    value={newAddress.reciever}
                    placeholder="نام گیرنده را وارد فرمایید"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group col-12 col-md-6 mb-3">
                  <label htmlFor="mobileRecv">
                    شماره موبایل
                    <i
                      className="bi bi-star p-2"
                      style={{ color: "red", fontSize: "6px" }}
                    ></i>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="mobileRecv"
                    name="tel"
                    placeholder="شماره همراه خود را وارد نمایید"
                    value={newAddress.tel}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  />
                </div>

                <div className="form-group col-12 col-md-6 mb-3">
                  <label htmlFor="inputState">
                    استان
                    <i
                      className="bi bi-star p-2"
                      style={{ color: "red", fontSize: "6px" }}
                    ></i>
                  </label>
                  <select
                    id="inputState"
                    className="form-control"
                    name="province"
                    value={newAddress.province}
                    onChange={(e) => {
                      handleProvinceChange(
                        provinces.find((p) => p.name === e.target.value)?.id
                      ); // یافتن آیدی استان
                      handleChange(e); // همزمان مقدار را در newAddress ذخیره می‌کند
                    }}
                  >
                    <option value="">انتخاب کنید</option>
                    {provinces.map((province) => (
                      <option key={province.id} value={province.name}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-12 col-md-6 mb-3">
                  <label htmlFor="inputcity">
                    شهر
                    <i
                      className="bi bi-star p-2"
                      style={{ color: "red", fontSize: "6px" }}
                    ></i>
                  </label>
                  <select
                    id="inputcity"
                    className="form-control"
                    name="city"
                    value={newAddress.city}
                    onChange={handleChange}
                  >
                    <option value="">انتخاب کنید</option>
                    {filteredCities.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group col-12 col-md-12 mb-3">
                  <label htmlFor="addRecv">
                    آدرس کامل
                    <i
                      className="bi bi-star p-2"
                      style={{ color: "red", fontSize: "6px" }}
                    ></i>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="addRecv"
                    name="fullAddress"
                    value={newAddress.fullAddress}
                    aria-describedby="addHelp"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-sm-6 col-md-4 mb-3">
                  <label htmlFor="plukRecv">
                    پلاک
                    <i
                      className="bi bi-star p-2"
                      style={{ color: "red", fontSize: "6px" }}
                    ></i>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="plukRecv"
                    name="buildingNum"
                    value={newAddress.buildingNum}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="form-groupcol-6 col-md-4 mb-3">
                  <label htmlFor="unitRecv">واحد</label>
                  <input
                    type="number"
                    className="form-control"
                    id="unitRecv"
                    name="unitNum"
                    value={newAddress.unitNum}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="form-groupcol-6 col-md-4 mb-3">
                  <label htmlFor="postRecv">
                    کدپستی
                    <i
                      className="bi bi-star p-2"
                      style={{ color: "red", fontSize: "6px" }}
                    ></i>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="postRecv"
                    name="zipCode"
                    value={newAddress.zipCode}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-close-custom"
              data-bs-dismiss="modal"
            >
              بستن
            </button>
            <button type="button" className="btn btn-save" onClick={handleSave}>
              ذخیره تغییرات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal