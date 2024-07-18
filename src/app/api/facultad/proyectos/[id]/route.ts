import { createClient } from "@/src/utils/supabase/server";
import { NextResponse } from "next/server";

interface Context {
  params: {
    id: string;
  };
}

export const dynamic = "force-dynamic";

/*
GET /api/facultad/[id]

Traemos todos los proyectos de la facultad dada 
*/
export async function GET(request: Request, context: Context) {
  const { id } = context.params;
  const supabase = createClient();

  const [facultad, resCarreras] = await Promise.all([
    await supabase
      .from("Facultad")
      .select("*")
      .eq("id", id)
      .single()
    , await supabase
      .from("Carrera")
      .select("id")
      .eq("id_facultad", id)
  ])

  const { data: carreras, error: errorCarreras } = resCarreras

  if (errorCarreras || !carreras) {
    return NextResponse.json({ error: "Error al obtener las carreras" }, { status: 500 });
  }

  const { data: semillero, error: errorSemillero } = await supabase
    .from("Semillero")
    .select("*")
    .in("id_carrera", carreras.map((carrera) => carrera.id));

  if (errorSemillero || !semillero) {
    return NextResponse.json({ error: "Error al obtener los semilleros" }, { status: 500 });
  }

  const { data: proyectos, error } = await supabase
    .from("Proyecto")
    .select(`id, nombre, descripcion, estado, tutor:id_tutor(*), carrera:id_carrera(*)`)
    .in("id_semillero", semillero.map((semillero) => semillero.id));

  console.log(proyectos);

  if (error || !proyectos) {
    return NextResponse.json({ error: "Error al obtener los proyectos" }, { status: 500 });
  }

  return NextResponse.json({
    ...facultad.data,
    proyectos
  });
}





