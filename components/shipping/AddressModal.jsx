"use client"
import React, {useState, useContext, useEffect} from 'react';
import { ProductContext } from '@/context/ProductContext';

const AddressModal = ({ onSave, initialData = null }) => {
  const { provinces, cities } =
    useContext(ProductContext);

  const [filteredCities, setFilteredCities] = useState([]);
  const [newAddress, setNewAddress] = useState(
     {
      reciever: "",
      province_id: "",
      city_id: "",
      full_address: "",

      building_num: "",
      unit_num: "",
      zip_code: "",
      tel: "",
    }
  );
  const [successMessage, setSuccessMessage] = useState(""); // مدیریت پیام موفقیت
  // مقداردهی اولیه هنگام ویرایش
  useEffect(() => {
    if (initialData) {
      // const provinceId = provinces.find(
      //   (p) => p.name === initialData.province
      // )?.id;
      const filtered = cities.filter(
        (city) => city.province_id === initialData.province_id
      );
      setFilteredCities(filtered);
      setNewAddress(initialData);
    }
  }, [initialData, cities]);

  const handleChange = (e) => {
    const { name, value } = e.target;
     setNewAddress((prev) => ({
       ...prev,
       [name]: name === "province_id" || name === "city_id" ? +value : value,
     }));
  };
const handleKeyDown = (e) => {
  if (["-", "+", ".", "e"].includes(e.key)) {
    e.preventDefault(); // جلوگیری از ورود کاراکترهای نامطلوب
  }
};
 


const handleProvinceChange = (e) => {
  const province_id = +e.target.value;
  const filtered = cities.filter((city) => city.province_id === province_id);
  setFilteredCities(filtered);
  setNewAddress((prev) => ({
    ...prev,
    province_id,
    city_id: "",
  }));
};



const handleSave = async () => {
  const {
    reciever,
    province_id,
    city_id,
    full_address,
    building_num,
    zip_code,
    tel,
  } = newAddress;

  if (
    !reciever ||
    !tel ||
    !province_id ||
    !city_id ||
    !full_address ||
    !building_num ||
    !zip_code
  ) {
    alert("لطفاً تمام فیلدهای ضروری را پر کنید.");
    return;
  }

  try {
    const savedAddress = await onSave(newAddress);
    if (!savedAddress?.id) throw new Error("آدرس ذخیره شده id ندارد");

    setSuccessMessage(
      initialData ? "آدرس با موفقیت ویرایش شد." : "آدرس جدید با موفقیت ثبت شد."
    );

    const modal = document.getElementById("addressModal");
    const modalInstance = window.bootstrap.Modal.getInstance(modal);
    modalInstance.hide();

    setTimeout(() => setSuccessMessage(""), 3000);

    setNewAddress({
      reciever: "",
      province_id: "",
      city_id: "",
      full_address: "",
      building_num: "",
      unit_num: "",
      zip_code: "",
      tel: "",
    });
  } catch (error) {
    console.error("خطا در ذخیره آدرس:", error);
    alert("خطا در ذخیره آدرس. لطفاً دوباره تلاش کنید.");
  }
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
                    name="province_id"
                    value={newAddress.province_id}
                    onChange={ handleProvinceChange}
                  >
                    <option value="">انتخاب کنید</option>
                    {provinces.map((province) => (
                      <option key={province.id} value={province.id}>
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
                    name="city_id"
                    value={newAddress.city_id}
                    onChange={handleChange}
                  >
                    <option value="">انتخاب کنید</option>
                    {filteredCities.map((city) => (
                      <option key={city.id} value={city.id}>
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
                    name="full_address"
                    value={newAddress.full_address}
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
                    name="building_num"
                    value={newAddress.building_num}
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
                    name="unit_num"
                    value={newAddress.unit_num}
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
                    name="zip_code"
                    value={newAddress.zip_code}
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