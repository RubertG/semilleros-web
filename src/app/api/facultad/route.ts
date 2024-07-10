import { createClient } from "@/src/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request, response: Response) {
  const supabase = createClient();

  const {data: facultades} = await supabase.from("Facultad").select("*");

  return NextResponse.json(facultades);
}