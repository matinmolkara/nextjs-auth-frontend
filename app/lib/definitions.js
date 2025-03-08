import { z } from "zod";

// تعریف مدل فرم ثبت‌نام و ورود
export const SignupFormSchema = z.object({
  name: z.string().min(2, { message: "نام باید حداقل ۲ حرف باشد" }).trim(),
  email: z.string().email({ message: "ایمیل معتبر وارد کنید" }).trim(),
  password: z
    .string()
    .min(8, { message: "رمز عبور حداقل ۸ کاراکتر باشد" })
    .trim(),
});


