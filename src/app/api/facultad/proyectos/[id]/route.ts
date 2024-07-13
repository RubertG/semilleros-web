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
    
    //const { data: carreras } = await supabase.from("Carrera").select("*").eq("id_facultad", id);
    
    // if (carreras) {
    //     const allProyectos = [];
    //     for (const carrera of carreras) {
    //         const { data: proyectos } = await supabase.from("Proyecto").select("*, carrera:Carrera(nombre), tutor:Usuario(*)").eq("id_carrera", carrera.id);
    //         if (proyectos) {
    //             allProyectos.push(...proyectos);
    //         }
    //     }
    
    

            const { data:proyectos } = await supabase.from("Proyecto").select(`id, nombre,descripcion, estado , tutor:id_tutor(*),carrera:id_carrera(*)`);
            return NextResponse.json(proyectos);
    

        return NextResponse.json([]);

    }
    
  
    
  
    
