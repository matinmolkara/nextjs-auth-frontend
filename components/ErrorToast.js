"use client";
import { useError } from "@/context/ErrorContext";
import { ERROR_CODES } from "@/app/lib/errors";

export default function ErrorToast() {
  const { errors, removeError } = useError();

  if (errors.length === 0) return null;

  const getErrorIcon = (code, type) => {
    if (type === "success") return "✅";

    switch (code) {
      case ERROR_CODES.NETWORK_ERROR:
        return "🌐";
      case ERROR_CODES.EMAIL_NOT_VERIFIED:
        return "📧";
      case ERROR_CODES.INVALID_CREDENTIALS:
      case ERROR_CODES.WRONG_PASSWORD:
        return "🔒";
      case ERROR_CODES.USER_NOT_FOUND:
        return "👤";
      case ERROR_CODES.TOKEN_EXPIRED:
        return "⏰";
      case ERROR_CODES.SERVER_ERROR:
        return "⚠️";
      default:
        return "❌";
    }
  };

  const getToastClass = (code, type) => {
    if (type === "success") return "alert-success";

    switch (code) {
      case ERROR_CODES.NETWORK_ERROR:
        return "alert-warning";
      case ERROR_CODES.EMAIL_NOT_VERIFIED:
        return "alert-info";
      default:
        return "alert-danger";
    }
  };

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
      {errors.map((error) => (
        <div
          key={error.id}
          className={`alert ${getToastClass(
            error.code,
            error.type
          )} alert-dismissible fade show`}
          role="alert"
          style={{ minWidth: "300px" }}
        >
          <div className="d-flex align-items-center">
            <span className="me-2">{getErrorIcon(error.code, error.type)}</span>
            <div className="flex-grow-1">
              <strong>{error.message}</strong>
              {error.code && error.type !== "success" && (
                <small className="d-block text-muted">
                  کد خطا: {error.code}
                </small>
              )}
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => removeError(error.id)}
              aria-label="Close"
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
}
