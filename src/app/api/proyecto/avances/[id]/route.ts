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

  const { data: avances } = await supabase.from("Avance").select("*, archivos: Archivo(*)").eq("id_proyecto", id);
  
  if (avances) {
    return NextResponse.json(avances);
  }
  return NextResponse.json(
    {"mensaje": "No se encontraron avances para este proyecto"},
    {"status": 500}
  );
}

/*
POST /api/proyecto/avances/[idProyecto]

Crear un nuevo avance en ese proyecto
*/
export async function POST(request: Request, context: Context) {
  const { id } = context.params;
  const body = await request.json();
  const supabase = createClient();

  const { data: proyecto } = await supabase.from("Proyecto").select("nombre").eq("id", id).single();
  const { data: avance } = await supabase.from("Avance").insert({
    nombre: body.nombre,
    fecha: body.fecha,
    contenido: body.contenido,
    id_proyecto: id
  })
  .select()
  .single();
  
  const misArchivos: File[] = body.archivos;

  if (misArchivos && avance) {
    await Promise.all(misArchivos.map(async (miArchivo) => {
      const { data } = await supabase.storage
        .from("archivos-avances")
        .upload(`${proyecto?.nombre}/${miArchivo.name}`, miArchivo);
      
    if(data){
      const { data: archivo } = await supabase.from("Archivo").insert({
        nombre: miArchivo.name,     // revisar si toca substring para quitar la extension del nombre
        ruta: data.path,
        id_avance: avance.id
      });
      
      if(!archivo){
        return NextResponse.json(
          {"mensaje": "No se pudo crear el archivo en el avance"},
          {"status": 500}
        );
      }
    }else{
      return NextResponse.json(
        {"mensaje": "No se pudo almacenar el archivo"},
        {"status": 500}
      );
    }
    }));
  }
  
  if (avance) {
    return NextResponse.json(avance);
  }
  return NextResponse.json(
    {"mensaje": "No se pudo crear el avance"},
    {"status": 500}
  );
}

/*
PUT /api/proyecto/avances/[idProyecto]

Actualizar un avance de un proyecto
*/
export async function PUT(request: Request, context: Context) {
  const { id } = context.params;
  const body = await request.json();
  const supabase = createClient();

  const { data: avance } = await supabase.from("Avance").update({
    nombre: body.nombre,
    fecha: body.fecha,
    contenido: body.contenido
  })
  .eq("id", body.id)
  .select("id, archivos: Archivo(id), rutas: Archivo(ruta)")
  .single();

  const { data: proyecto } = await supabase.from("Proyecto").select("nombre").eq("id", id).single();
  const misArchivos: File[] = body.archivos;
  const archivosName = misArchivos.map(archivo => archivo.name);

  if(misArchivos && avance){
    // archivosE => guarda los archivos existentes que estan en el PUT
    const archivosIds = avance.archivos.map(archivo => archivo.id);
    const { data: archivosE } = await supabase.from("Archivo")
      .select("id, nombre")
      .in("id", archivosIds)
      .in("nombre", archivosName);
    const archivosEIds = archivosE?.map(archivo => archivo.id);
    const archivosEName = archivosE?.map(archivo => archivo.nombre);

    // Agregar nuevos archivos al storage
    if(archivosEName){
      await Promise.all(misArchivos.map(async (miArchivo) => {
        if(!archivosEName.includes(miArchivo.name)){
          const { data } = await supabase.storage
            .from("archivos-avances")
            .upload(`${proyecto?.nombre}/${miArchivo.name}`, miArchivo);
          if(data){
          // Agregar nuevos archivos a la tabla
            await supabase.from("Archivo").insert({
              nombre: miArchivo.name,
              ruta: data.path,
              id_avance: avance.id
            });
          }
        }
      }));
    }

    // Eliminar todos los archivos de ese avance que no tengan id en archivosRIds
    const { data: eliminados } = await supabase.from("Archivo")
      .delete()
      .in("id", archivosIds)
      .not("id", "in", archivosEIds)
      .select();
    
    // Si encontro, elimina del storage esos archivos
    if(eliminados){
      await Promise.all(eliminados.map(async (eliminado) => {
        await supabase.storage
          .from("archivos-avances")
          .remove([eliminado.ruta]);
      }));
    }
  }

  if (avance) {
    return NextResponse.json(avance.id);
  }
  return NextResponse.json(
    {"mensaje": "No se pudo actualizar el avance"},
    {"status": 500}
  );
}

/*
DELETE /api/proyecto/avances/[idProyecto]

Eliminar un avance de un proyecto
*/
export async function DELETE(request: Request, context: Context) {
  const body = await request.json();
  const supabase = createClient();

  // Elimina avance y sus archivos relacionados
  const { data: rutas } = await supabase.from("Avance")
    .delete()
    .eq("id", body.id)
    .select("archivos: Archivo(ruta)")
    .single();

  // Elimina archivos del storage
  if(rutas){
    await Promise.all(rutas.archivos.map(async (archivo) => {
      const { data } = await supabase.storage
        .from("archivos-avances")
        .remove([archivo.ruta]);
    }));
    return NextResponse.json(rutas);
  }

  return NextResponse.json(
    {"mensaje": "No se pudo eliminar el avance"},
    {"status": 500}
  );
}