import { createClient } from "@/src/utils/supabase/server";
import { NextResponse } from "next/server";

/*
post /api/proyecto/[id]

creamos un proyecto
*/

export async function POST(request: Request) {

  const params = await request.json();
  const supabase = createClient();

  const { data: proyecto } = await supabase.from("Proyecto").insert([{
    nombre: params.nombre,
    descripcion: params.descripcion,
    estado: params.estado,
    id_semillero: params.id_semillero,
    id_tutor: params.id_tutor,
    id_carrera: params.id_carrera
  }]).select();

  if (proyecto) {
    return NextResponse.json(proyecto);
  }
  else {
    return NextResponse.json({ mensaje: "No fue posible crear el proyecto" }, { status: 500 });
  }

}