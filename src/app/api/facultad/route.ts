import { createClient } from "@/src/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request, response: Response) {
  const supabase = createClient();

  const { data: facultades, error } = await supabase.from("Facultad").select("*");

  if (error) {
    return NextResponse.json(null, { status: 500 });
  }

  return NextResponse.json(facultades);
}