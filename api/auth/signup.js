import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/db/connection";
import { SignupFormSchema } from "@/app/lib/definitions";

export async function POST(req) {
  try {
    const body = await req.json();
    const validation = SignupFormSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        { message: "داده‌های نامعتبر" },
        { status: 400 }
      );

    const { name, email, password } = validation.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { rowCount } = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashedPassword]
    );

    if (rowCount === 1)
      return NextResponse.json(
        { message: "ثبت‌نام موفقیت‌آمیز بود" },
        { status: 201 }
      );

    return NextResponse.json({ message: "خطایی رخ داد" }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ message: "مشکل در سرور" }, { status: 500 });
  }
}
