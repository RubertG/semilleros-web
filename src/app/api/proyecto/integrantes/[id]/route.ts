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
    const params = await request.json();
    const supabase = createClient();

    const { data: estudiante } = await supabase.from("Usuario").select("*").eq("correo", params.correo).single();

    if (estudiante) {
        const { data: relacion } = await supabase.from("Estudiante_proyecto").insert([
            {
                id_estudiante: estudiante.id,
                id_proyecto: id
            }])
            .select();
        
        if (relacion) {
            return NextResponse.json(relacion);
        }
    }
    return NextResponse.json([]);
}