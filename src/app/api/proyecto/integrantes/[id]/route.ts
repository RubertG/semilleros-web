import { createClient } from "@/src/utils/supabase/server";
import { NextResponse } from "next/server";

interface Context {
  params: {
    id: string;
  };
}

/*
POST /api/proyecto/integrantes/[idProyecto]

Añade un nuevo integrante al proyecto proyecto
*/
export async function POST(request: Request, context: Context) {
    const { id } = context.params;
    const body = await request.json();
    const supabase = createClient();

    const { data: estudiante } = await supabase.from("Usuario").select("*").eq("correo", body.correo).single();

    if (estudiante) {
        const { data: relacion } = await supabase.from("Estudiante_proyecto").insert({
            id_estudiante: estudiante.id,
            id_proyecto: id
        })
        .select();
        
        if (relacion) {
            return NextResponse.json(relacion);
        }
    }
    return NextResponse.json(
        {"mensaje": "No se encontraron integrantes para este proyecto"},
        {"status": 500}
    );

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

  return NextResponse.json({ mensaje: "No fue posible obtener los integrantes" }, { status: 500 });
}

/*
DELETE /api/proyecto/integrantes/[id]

elimina un integrante del proyecto

*/
export async function DELETE(request: Request, context: Context) {
  const { id } = context.params;
  const params = await request.json();
  const supabase = createClient();

  const { data: relacion } = await supabase
    .from("Estudiante_proyecto")
    .delete()
    .eq("id_proyecto", id)
    .eq("id_estudiante", params.id_estudiante).select();


  if (relacion) {
    return NextResponse.json(relacion);
  }
  return NextResponse.json({ mensaje: "No fue posible eliminar el integrante" }, { status: 500 });
}