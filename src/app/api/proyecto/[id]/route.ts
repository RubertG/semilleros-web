import { createClient } from "@/src/utils/supabase/server";
import { error } from "console";
import { NextResponse } from "next/server";

interface Context {
  params: {
    id: string;
  };
}

/*
GET /api/proyecto/[id]

Traemos un proyecto
*/
export async function GET(request: Request, context: Context) {
  const { id } = context.params;
  const supabase = createClient();

  const { data: proyecto, error } = await supabase.from("Proyecto").select("*, semillero:id_semillero(nombre, descripcion, coordinador:id_coordinador(id,nombre)),tutor:id_tutor(id,nombre),carrera:id_carrera(id,nombre)").eq("id", id).single();

  if (proyecto && !error) {
    return NextResponse.json(proyecto);
  }

  return NextResponse.json({mensaje: "No fue posible obtener el proyecto"},{status: 500});
}

/*
PUT /api/proyecto/[id]

editamos un proyecto
*/

export async function PUT(request: Request, context: Context) {
  const { id } = context.params;
  const body = await request.json();
  const supabase = createClient();

  const { data: proyecto } = await supabase.from("Proyecto").update({
    nombre: body.nombre,
    descripcion: body.descripcion,
    estado: body.estado
  }).eq("id", id).select();

  if (proyecto) {
    return NextResponse.json(proyecto);
  }

  return NextResponse.json({mensaje: "No fue posible editar el proyecto"},{status: 500});
}

/*
DELETE /api/proyecto/[id]

eliminamos un proyecto
*/

export async function DELETE(request: Request, context: Context) {
  const { id } = context.params;
  const supabase = createClient();

  const { data: proyecto } = await supabase.from("Proyecto").delete().eq("id", id).select();
  if (proyecto) {
    return NextResponse.json(proyecto);
  }

  return NextResponse.json({mensaje: "No fue posible eliminar el proyecto"},{status: 500});
}