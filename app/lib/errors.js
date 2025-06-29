export const ERROR_CODES = {
  // Authentication Errors
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  EMAIL_NOT_VERIFIED: "EMAIL_NOT_VERIFIED",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  WRONG_PASSWORD: "WRONG_PASSWORD",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",

  // API Errors
  NETWORK_ERROR: "NETWORK_ERROR",
  SERVER_ERROR: "SERVER_ERROR",
  BAD_REQUEST: "BAD_REQUEST",

  // Validation Errors
  REQUIRED_FIELD: "REQUIRED_FIELD",
  INVALID_EMAIL: "INVALID_EMAIL",
  WEAK_PASSWORD: "WEAK_PASSWORD",
};

export const ERROR_MESSAGES = {
  [ERROR_CODES.INVALID_CREDENTIALS]: "ایمیل یا رمز عبور اشتباه است.",
  [ERROR_CODES.EMAIL_NOT_VERIFIED]: "لطفاً ایمیل خود را تایید کنید.",
  [ERROR_CODES.USER_NOT_FOUND]: "کاربر یافت نشد.",
  [ERROR_CODES.WRONG_PASSWORD]: "رمز عبور نادرست است.",
  [ERROR_CODES.TOKEN_EXPIRED]: "نشست شما منقضی شده است.",
  [ERROR_CODES.UNAUTHORIZED]: "دسترسی غیرمجاز.",
  [ERROR_CODES.FORBIDDEN]: "شما اجازه دسترسی به این بخش را ندارید.",
  [ERROR_CODES.NETWORK_ERROR]: "مشکل در اتصال به اینترنت.",
  [ERROR_CODES.SERVER_ERROR]: "خطای سرور. لطفاً دوباره تلاش کنید.",
  [ERROR_CODES.BAD_REQUEST]: "درخواست نامعتبر.",
  [ERROR_CODES.REQUIRED_FIELD]: "این فیلد الزامی است.",
  [ERROR_CODES.INVALID_EMAIL]: "فرمت ایمیل صحیح نیست.",
  [ERROR_CODES.WEAK_PASSWORD]: "رمز عبور باید حداقل 8 کاراکتر باشد.",
};
