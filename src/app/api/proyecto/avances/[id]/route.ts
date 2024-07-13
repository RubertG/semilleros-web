import { createClient } from "@/src/utils/supabase/server";
import { NextResponse } from "next/server";

interface Context {
  params: {
    id: string;
  };
}

/*
GET /api/proyecto/avances/[idProyecto]

Traemos todos los avances del proyecto
*/
export async function GET(request: Request, context: Context) {
  const { id } = context.params;
  const supabase = createClient();

  const { data: avances } = await supabase.from("Avance").select("*").eq("id_proyecto", id);

  if (avances) {
    return NextResponse.json(avances);
  }

  return NextResponse.json([]);
}