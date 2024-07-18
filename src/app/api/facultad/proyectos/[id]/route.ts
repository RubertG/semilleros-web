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
  
  const {data: carreras} = await supabase.from("Carrera").select(`id`).eq("id_facultad", id);
  if(carreras){
    const carreraIds = carreras.map(carrera => carrera.id);

    
    const { data: proyectos } = await supabase.from("Proyecto").select(`id, nombre,descripcion, estado , tutor:id_tutor(*),carrera:id_carrera(*)`).in("id_carrera", carreraIds);
    if (proyectos) {
    return NextResponse.json(proyectos);
  }
  }
  
  
  



  return NextResponse.json({mensaje: "No fue posible obtener los proyectos"},{status: 500});

}





