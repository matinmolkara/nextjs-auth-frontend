import { SignupFormSchema, FormState } from "@/app/lib/definitions";
import { db } from "@/db/connection";
import bcrypt from "bcryptjs";

export async function register(formData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db
    .insert("users")
    .values({ name, email, password: hashedPassword });

  return user
    ? { message: "ثبت‌نام موفقیت‌آمیز بود!" }
    : { message: "خطایی رخ داد." };
}
