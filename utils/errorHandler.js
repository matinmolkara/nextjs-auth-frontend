import { ERROR_CODES, ERROR_MESSAGES } from "@/app/lib/errors";

export function handleApiError(error) {
  console.log("Processing error:", error); // برای debugging

  // اگر خطا از axios یا fetch باشد
  if (error.response) {
    const { status, data } = error.response;
    const serverMessage = data?.message || "";

    console.log("Server message:", serverMessage); // برای debugging

    // اول پیام‌های مشخص بک‌اند را بررسی می‌کنیم
    if (serverMessage.includes("ایمیل قبلاً ثبت شده است")) {
      return {
        message: "این ایمیل قبلاً ثبت شده است. لطفاً ایمیل دیگری استفاده کنید.",
        code: ERROR_CODES.EMAIL_ALREADY_EXISTS || "EMAIL_ALREADY_EXISTS",
        status,
      };
    }

    if (serverMessage.includes("تمام فیلدها اجباری هستند")) {
      return {
        message: "لطفاً تمام فیلدهای مورد نیاز را پر کنید.",
        code: ERROR_CODES.REQUIRED_FIELD,
        status,
      };
    }

    if (serverMessage.includes("ایمیل خود را تایید کنید")) {
      return {
        message: ERROR_MESSAGES[ERROR_CODES.EMAIL_NOT_VERIFIED],
        code: ERROR_CODES.EMAIL_NOT_VERIFIED,
        status,
      };
    }

    if (serverMessage.includes("کاربر یافت نشد")) {
      return {
        message: ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND],
        code: ERROR_CODES.USER_NOT_FOUND,
        status,
      };
    }

    if (serverMessage.includes("رمز عبور نادرست")) {
      return {
        message: ERROR_MESSAGES[ERROR_CODES.WRONG_PASSWORD],
        code: ERROR_CODES.WRONG_PASSWORD,
        status,
      };
    }

    // خطاهای عمومی بر اساس status code
    if (status === 401) {
      return {
        message: ERROR_MESSAGES[ERROR_CODES.INVALID_CREDENTIALS],
        code: ERROR_CODES.INVALID_CREDENTIALS,
        status,
      };
    }

    if (status === 400) {
      return {
        message: serverMessage || ERROR_MESSAGES[ERROR_CODES.BAD_REQUEST],
        code: ERROR_CODES.BAD_REQUEST,
        status,
      };
    }

    // اگر پیام مشخصی از سرور آمده، همان را نمایش می‌دهیم
    return {
      message: serverMessage || ERROR_MESSAGES[ERROR_CODES.SERVER_ERROR],
      code: ERROR_CODES.SERVER_ERROR,
      status,
    };
  }

  // اگر خطا از fetch API باشد
  if (error.status) {
    return {
      message: error.message || ERROR_MESSAGES[ERROR_CODES.SERVER_ERROR],
      code: ERROR_CODES.SERVER_ERROR,
      status: error.status,
    };
  }

  // خطای شبکه
  if (error.request || error.message?.includes("fetch")) {
    return {
      message: ERROR_MESSAGES[ERROR_CODES.NETWORK_ERROR],
      code: ERROR_CODES.NETWORK_ERROR,
      status: 0,
    };
  }

  // خطای عمومی
  return {
    message: error.message || ERROR_MESSAGES[ERROR_CODES.SERVER_ERROR],
    code: ERROR_CODES.SERVER_ERROR,
    status: 500,
  };
}
