
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isValidAdminToken } from "../../../lib/adminAuth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    // Check whether the admin is logged in
    const token = request.cookies.get("admin_session")?.value;

    if (!isValidAdminToken(token)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Create a server-side Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Retrieve the recommendations
    const { data, error } = await supabase
      .from("song_recommendations")
      .select("*");

    if (error) {
      console.error("Supabase song retrieval error:", error);

      return NextResponse.json(
        { error: "Unable to retrieve recommendations" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { recommendations: data || [] },
      { headers: { "Cache-Control": "no-store" } }
    );

  } catch (error) {
    console.error("Song API error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
