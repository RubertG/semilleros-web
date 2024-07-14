import { createClient } from "@/src/utils/supabase/server";
import { NextResponse } from "next/server";

interface Context {
  params: {
    id: string;
  };
}

/*
GET /api/proyecto/integrantes/[id]

Traemos los integrantes de un proyecto
*/
export async function GET(request: Request, context: Context) {
  const { id } = context.params;
  const supabase = createClient();

  const { data: proyecto } = await supabase.from("Estudiante_proyecto").select("cproyecto:id_proyecto(id,nombre),estudiante:id_estudiante(id,nombre)").eq("id_proyecto", id);

  if (proyecto) {
    return NextResponse.json(proyecto);
  }

  return NextResponse.json([]);
}