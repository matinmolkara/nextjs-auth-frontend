"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUserById } from "@/app/api/api";
import { format } from "date-fns-jalali";
import Image from "next/image";
import Link from "next/link";

const UserDetailsPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(userId);
        setUser(data);
      } catch (err) {
        console.error("خطا در واکشی اطلاعات کاربر:", err);
        setError("خطا در واکشی اطلاعات کاربر.");
      }
    };
    fetchUser();
  }, [userId]);

  const formatDate = (date) => {
    if (!date) return "تنظیم نشده";
    return format(new Date(date), "yyyy/MM/dd HH:mm");
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!user) return <div className="text-center">در حال بارگذاری...</div>;

  return (
    <div className="bg-light min-vh-100 p-4 p-sm-6 p-lg-8 font-sans" dir="rtl">
      <div className="container">
        <div className="d-flex align-items-center mb-6 gap-3">
          <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle">
            <i className="bi bi-person-circle fs-4"></i>
          </div>
          <div>
            <h1 className="h3 fw-bold text-dark">جزئیات کاربر</h1>
            <p className="text-muted">نمایش اطلاعات کامل کاربر.</p>
          </div>
          <div className="ms-auto">
            <Link
              href="/admin-panel/usermanagement"
              className="btn btn-outline-dark"
            >
              <i className="bi bi-people"></i> بازگشت به لیست کاربران
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-4 shadow overflow-hidden">
          <div className="p-4 p-sm-5">
            <div className="row row-cols-1 row-cols-md-2 g-4 border-bottom border-muted pb-4 mb-4">
              <InfoItem label="نام کامل" icon="person-fill" value={user.name} />
              <InfoItem label="ایمیل" icon="envelope-fill" value={user.email} />
              <InfoItem
                label="شماره تماس"
                icon="telephone-fill"
                value={user.phone}
              />
              <InfoItem
                label="نقش"
                icon="person-badge-fill"
                value={user.role}
              />
              <InfoItem
                label="وضعیت حساب"
                icon="check-circle-fill"
                value={user.is_active ? "فعال" : "غیرفعال"}
              />
              <InfoItem
                label="تاریخ ایجاد"
                icon="calendar-fill"
                value={formatDate(user.created_at)}
              />
              <InfoItem
                label="تاریخ تولد"
                icon="calendar-heart-fill"
                value={formatDate(user.date_of_birth)}
              />
              <InfoItem
                label="آخرین ورود"
                icon="box-arrow-in-right"
                value={formatDate(user.last_login_at)}
              />
              <InfoItem
                label="جنسیت"
                icon="gender-ambiguous"
                value={user.gender || "ثبت نشده"}
              />
              <InfoItem
                label="کد ملی"
                icon="card-list"
                value={user.national_id || "ثبت نشده"}
              />
              <InfoItem
                label="آدرس"
                icon="geo-alt-fill"
                value={user.address || "ثبت نشده"}
              />
              <InfoItem
                label="تایید ایمیل"
                icon="envelope-check-fill"
                value={
                  user.email_verified_at
                    ? formatDate(user.email_verified_at)
                    : "تایید نشده"
                }
              />
              <InfoItem
                label="تایید تلفن"
                icon="phone-fill"
                value={
                  user.phone_verified_at
                    ? formatDate(user.phone_verified_at)
                    : "تایید نشده"
                }
              />
            </div>

            {/* پروفایل */}
            <div>
              <h3 className="h5 fw-bold text-dark mb-4">عکس پروفایل</h3>
              {user.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  alt="Avatar"
                  className="rounded-circle border"
                  width={100}
                  height={100}
                />
              ) : (
                <p>ثبت نشده</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, icon, value }) => (
  <div className="d-flex align-items-center">
    <i className={`bi ${icon} text-muted me-3 fs-5`}></i>
    <div>
      <p className="small text-muted mb-1">{label}</p>
      <p className="fw-semibold text-dark h6 mb-0">{value}</p>
    </div>
  </div>
);

export default UserDetailsPage;
