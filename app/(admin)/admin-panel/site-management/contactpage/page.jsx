"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getContactMessages, deleteContactMessage } from "@/app/api/api";

const ContactMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    fetchMessages();
  }, [search, currentPage]);

  const fetchMessages = async () => {
    try {
      const data = await getContactMessages();
      let filtered = data;
      if (search.trim()) {
        filtered = data.filter((msg) =>
          msg.full_name.toLowerCase().includes(search.toLowerCase())
        );
      }
      setMessages(filtered);
    } catch (err) {
      console.error("خطا در دریافت پیام‌ها:", err);
    }
  };


const handleDelete = async (id) => {
    const confirmDelete = window.confirm("آیا از حذف پیام مطمئن هستید؟");
    if (!confirmDelete) return;
    try {
      // فرض کنید تابع deleteContactMessage برای حذف پیام‌ها وجود دارد
      await deleteContactMessage(id);
      setMessages(messages.filter((msg) => msg.id !== id));
      alert("پیام با موفقیت حذف شد.");
    } catch (err) {
      console.error("خطا در حذف پیام:", err);
      alert("خطا در حذف پیام.");
    }
  };





  // صفحه‌بندی دستی
  const paginatedMessages = messages.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>مدیریت پیام‌های تماس با ما</h3>
        <Link href="/admin-panel/dashboard" className="btn btn-outline-dark">
          <i className="bi bi-house-door me-1"></i> بازگشت به داشبورد
        </Link>
      </div>

      {/* فیلترها و جستجو */}
      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="جستجو براساس نام ارسال‌کننده"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* جدول */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>کد پیام</th>
              <th>نام ارسال‌کننده</th>
              <th>ایمیل</th>
              <th>شماره تماس</th>
              <th>تاریخ ارسال</th>
              <th className="text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMessages.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  پیامی یافت نشد
                </td>
              </tr>
            ) : (
              paginatedMessages.map((msg) => (
                <tr key={msg.id}>
                  <td>{msg.id}</td>
                  <td>{msg.full_name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.phone}</td>
                  <td>
                    {new Date(msg.created_at).toLocaleDateString("fa-IR")}
                  </td>
                  <td className="text-center">
                    <Link
                      href={`/admin-panel/site-management/contactpage/message/${msg.id}`}
                      className="btn btn-sm btn-primary"
                    >
                      مشاهده
                    </Link>

                    <button
                      className="btn btn-sm btn-danger ms-2"
                      onClick={() => handleDelete(msg.id)}
                    >
                      حذف پیام  <i className="bi bi-trash3 ms-1"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* صفحه‌بندی */}
      <nav className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              قبلی
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">{currentPage}</span>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() =>
                setCurrentPage((prev) =>
                  prev * pageSize < messages.length ? prev + 1 : prev
                )
              }
            >
              بعدی
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ContactMessagesPage;
