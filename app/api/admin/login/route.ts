
import { NextRequest, NextResponse } from "next/server";
import {
  createAdminToken,
  isValidAdminPassword,
} from "../../../lib/adminAuth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const password = body?.password;

    if (
      typeof password !== "string" ||
      !isValidAdminPassword(password)
    ) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("admin_session", createAdminToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
