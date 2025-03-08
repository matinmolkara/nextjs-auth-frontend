import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "@/db/connection";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ message: "لطفاً تمام فیلدها را پر کنید" }, { status: 400 });

    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (rows.length === 0) return NextResponse.json({ message: "کاربر یافت نشد" }, { status: 401 });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ message: "رمز عبور نادرست است" }, { status: 401 });

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const response = NextResponse.json({ message: "ورود موفقیت‌آمیز", user: { id: user.id, name: user.name, email } });
    response.headers.set("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=604800`);
    
    return response;
  } catch (error) {
    return NextResponse.json({ message: "مشکل در سرور" }, { status: 500 });
  }
}
