import { createClient } from "@/src/utils/supabase/server";
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

  const { data: proyecto } = await supabase.from("Proyecto").select("id,nombre, descripcion, estado, semillero:id_semillero(id,nombre),tutor:id_tutor(id,nombre),carrera:id_carrera(id,nombre)").eq("id", id);

  if (proyecto) {
    return NextResponse.json(proyecto);
  }

  return NextResponse.json([]);
}

/*
PUT /api/proyecto/[id]

editamos un proyecto
*/

export async function PUT(request: Request, context: Context) {
  const { id } = context.params;
  const params = await request.json();
  const supabase = createClient();

  const { data: proyecto } = await supabase.from("Proyecto").update({
    nombre: params.nombre,
    descripcion: params.descripcion,
    estado: params.estado,
    id_semillero: params.id_semillero,
    id_tutor: params.id_tutor,
    id_carrera: params.id_carrera
  }).eq("id", id).select();

  if (proyecto) {
    return NextResponse.json(proyecto);
  }

  return NextResponse.json([]);
}

/*
PUT /api/proyecto/[id]

eliminamos un proyecto
*/

export async function DELETE(request: Request, context: Context) {
  const { id } = context.params;
  const supabase = createClient();

  const { data: proyecto } = await supabase.from("Proyecto").delete().eq("id", id).select();
  if(proyecto){
    return NextResponse.json(proyecto);
  }

  return NextResponse.json([]);
}