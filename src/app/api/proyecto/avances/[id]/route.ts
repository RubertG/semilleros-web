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

/*
POST /api/proyecto/avances/[idProyecto]

Crear un nuevo avance en ese proyecto
*/
export async function POST(request: Request, context: Context) {
  const { id } = context.params;
  const params = await request.json();
  const supabase = createClient();

  const { data: avance } = await supabase.from("Avance").insert([
    {
      nombre: params.nombre,
      fecha: params.fecha,
      contenido: params.contenido,
      id_proyecto: id
    }])
    .select();
  
  if (avance) {
    return NextResponse.json(avance);
  }
  return NextResponse.json([]);
}

/*
PUT /api/proyecto/avances/[idProyecto]

Actualizar un avance de un proyecto
*/
export async function PUT(request: Request, context: Context) {
  const params = await request.json();
  const supabase = createClient();

  const { data: avance } = await supabase.from("Avance").update({
      nombre: params.nombre,
      fecha: params.fecha,
      contenido: params.contenido
  })
  .eq("id", params.id)
  .select();

  if (avance) {
    return NextResponse.json(avance);
  }
  return NextResponse.json([]);
}

/*
DELETE /api/proyecto/avances/[idProyecto]

Eliminar un avance de un proyecto
*/
export async function DELETE(request: Request, context: Context) {
  const params = await request.json();
  const supabase = createClient();

  const { data: avance } = await supabase.from("Avance").delete().eq("id", params.id).select();

  if (avance) {
    return NextResponse.json(avance);
  }
  return NextResponse.json([]);
}