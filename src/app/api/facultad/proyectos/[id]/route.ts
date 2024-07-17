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

  const { data: proyectos } = await supabase.from("Proyecto").select(`id, nombre,descripcion, estado , tutor:id_tutor(*),carrera:id_carrera(*)`);
  if (proyectos) {
    return NextResponse.json(proyectos);
  }



  return NextResponse.json({mensaje: "No fue posible obtener los proyectos"},{status: 500});

}





