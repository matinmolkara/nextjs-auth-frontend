"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getUsers } from "@/app/api/api";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    fetchUsers();
  }, [search, roleFilter, statusFilter, currentPage]);

  const fetchUsers = async () => {
    try {
      const res = await getUsers({
        
          search,
          role: roleFilter,
          status: statusFilter,
          page: currentPage,
          pageSize,
        withCredentials: true,
      });

      setUsers(res.users);
    } catch (error) {
      console.error("خطا در دریافت لیست کاربران:", error);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>مدیریت کاربران ها</h3>
        <Link href="/admin-panel/dashboard" className="btn btn-outline-dark">
          <i className="bi bi-house-door me-1"></i> بازگشت به داشبورد
        </Link>
      </div>

      {/* فیلترها */}
      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="جستجو براساس نام یا ایمیل"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">همه نقش‌ها</option>
            <option value="user">کاربر عادی</option>
            <option value="admin">ادمین</option>
            <option value="staff">پشتیبان</option>
            <option value="vendor">فروشنده</option>
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">همه وضعیت‌ها</option>
            <option value="active">فعال</option>
            <option value="inactive">غیرفعال</option>
          </select>
        </div>
        <div className="col-md-2">
          <Link
            href="/admin-panel/usermanagement/new"
            className="btn btn-sm btn-primary w-100"
          >
            <i className="bi bi-plus"></i>
            افزودن کاربر
          </Link>
        </div>
      </div>

      {/* جدول کاربران */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>نام کاربر</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>وضعیت</th>
              <th>آخرین ورود</th>
              <th className="text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  کاربری یافت نشد
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.is_active ? (
                      <span className="badge bg-success">فعال</span>
                    ) : (
                      <span className="badge bg-secondary">غیرفعال</span>
                    )}
                  </td>
                  <td>
                    {user.last_login_at
                      ? new Date(user.last_login_at).toLocaleString("fa-IR")
                      : "—"}
                  </td>
                  <td className="d-flex justify-content-center align-items-center">
                    <Link
                      href={`/admin-panel/usermanagement/${user.id}`}
                      className="btn btn-sm btn-primary me-2"
                    >
                      مشاهده
                    </Link>
                    <Link
                      href={`/admin-panel/usermanagement/${user.id}/edit`}
                      className="btn btn-sm btn-warning"
                    >
                      ویرایش
                    </Link>
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
              onClick={() => setCurrentPage(currentPage - 1)}
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
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              بعدی
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserListPage;
