import { createClient } from "@/src/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request, response: Response) {
  const supabase = createClient();

  const { data: facultades } = await supabase.from("Facultad").select("*");

  if(facultades) {
    return NextResponse.json(facultades);
  }
  
  return NextResponse.json({mensaje: "No fue posible obtener las facultades"},{status: 500});

}