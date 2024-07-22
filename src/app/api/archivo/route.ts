import { createClient } from "@/src/utils/supabase/server";
import { NextResponse } from "next/server";

/*
DELETE /api/archivo

Eliminar un archivo de un avance
*/
export async function DELETE(request:Request) {
    const body = await request.json();
    const supabase = createClient();
  
    // Elimina archivos de la tabla
    const { data: archivo } = await supabase.from("Archivo")
      .delete()
      .eq("id", body.idArchivo)
      .select()
      .single();
  
    // Elimina archivos del storage
    if(archivo){
      const { data } = await supabase.storage
        .from("archivos-avances")
        .remove([archivo.ruta])
      return NextResponse.json(archivo);
    }
  
    return NextResponse.json(
      {"mensaje": "No se pudo eliminar el avance"},
      {"status": 500}
    );
  }