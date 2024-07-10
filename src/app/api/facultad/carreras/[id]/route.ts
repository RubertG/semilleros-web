import { createClient } from "@/src/utils/supabase/server";
import { NextResponse } from "next/server";

interface Context {
  params: {
    id: string;
  };
}

/*
GET /api/facultad/[id]

Traemos todas las carreras de la facultad dada 
*/
export async function GET(request: Request, context: Context) {
  const { id } = context.params;
  const supabase = createClient();

  const { data: carreras } = await supabase.from("Carrera").select("*, facultad:Facultad(*)").eq("id_facultad", id);

  if (carreras) {
    return NextResponse.json(carreras);
  }

  return NextResponse.json([]);
}