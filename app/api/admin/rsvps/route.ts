
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isValidAdminToken } from "../../../lib/adminAuth";

export const runtime = "nodejs";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

function isAdmin(request: NextRequest) {
  const token = request.cookies.get("admin_session")?.value;
  return isValidAdminToken(token);
}

// GET: Retrieve all RSVP records
export async function GET(request: NextRequest) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("rsvps")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("RSVP retrieval error:", error);

      return NextResponse.json(
        { error: "Unable to retrieve guests" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { guests: data || [] },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("RSVP GET error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// PATCH: Update an RSVP record
export async function PATCH(request: NextRequest) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, name, total_guests, notes, additional_guests, side } = body;

    if (
      !Number.isSafeInteger(id) ||
      typeof name !== "string" ||
      !Number.isInteger(total_guests) ||
      !Array.isArray(additional_guests)
    ) {
      return NextResponse.json(
        { error: "Invalid RSVP data" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { error } = await supabase
      .from("rsvps")
      .update({
        name,
        total_guests,
        notes,
        additional_guests,
        side,
      })
      .eq("id", id);

    if (error) {
      console.error("RSVP update error:", error);

      return NextResponse.json(
        { error: "Unable to update guest" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RSVP PATCH error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// DELETE: Delete an RSVP record
export async function DELETE(request: NextRequest) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await request.json();

    if (!Number.isSafeInteger(id)) {
      return NextResponse.json(
        { error: "Invalid guest ID" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { error } = await supabase
      .from("rsvps")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("RSVP deletion error:", error);

      return NextResponse.json(
        { error: "Unable to delete guest" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RSVP DELETE error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
