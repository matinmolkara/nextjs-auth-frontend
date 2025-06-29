"use client";
import { ERROR_CODES } from "@/app/lib/errors";

export default function ErrorDisplay({ error, onRetry, className = "" }) {
  if (!error) return null;

  const getErrorIcon = (code) => {
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
      default:
        return "⚠️";
    }
  };

  return (
    <div className={`col-12 ${className}`}>
      <div
        className="alert alert-danger d-flex align-items-center"
        role="alert"
      >
        <span className="me-2">{getErrorIcon(error.code)}</span>
        <div className="flex-grow-1">
          <p className="mb-0">{error.message}</p>
          {error.code === ERROR_CODES.NETWORK_ERROR && onRetry && (
            <button
              className="btn btn-outline-danger btn-sm mt-2"
              onClick={onRetry}
            >
              تلاش مجدد
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
