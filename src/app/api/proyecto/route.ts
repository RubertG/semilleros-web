import { createClient } from "@/src/utils/supabase/server";
import { NextResponse } from "next/server";

/*
post /api/proyecto/[id]

creamos un proyecto
*/

export async function POST(request: Request) {

  const body = await request.json();
  const supabase = createClient();

  const { data: proyecto } = await supabase.from("Proyecto").insert([{
    nombre: body.nombre,
    descripcion: body.descripcion,
    estado: body.estado,
    id_semillero: body.id_semillero,
    id_tutor: body.id_tutor,
    id_carrera: body.id_carrera
  }]).select();

  if (proyecto) {
    return NextResponse.json(proyecto);
  }
  else {
    return NextResponse.json({ mensaje: "No fue posible crear el proyecto" }, { status: 500 });
  }
}