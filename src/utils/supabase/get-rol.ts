import { createClient } from "./server";

export const getRol = async ({
  idProject
}: {
  idProject: string
}) => {
  const supabase = createClient();
  const { data: { user }, error: errorUser } = await supabase.auth.getUser();

  if (errorUser || !user) return null
  
  const { data, error: errorRol } = await supabase
  .from('Usuario')
  .select('*')
  .eq('id', user.id)
  .single();

  if (errorRol || !data) return null

  if (data.rol === "tutor") {
    const { data: tutorProyecto, error: errorTutorProyecto } = await supabase
      .from('Proyecto')
      .select('*')
      .eq('id', idProject)
      .eq('id_tutor', user.id)
      .single();

    if (errorTutorProyecto || !tutorProyecto) return null

    return data.rol
  }

  if (data.rol === "coordinador") return data.rol

  const { data: estudianteProyecto, error: errorEstudianteProyecto } = await supabase
    .from('Estudiante_proyecto')
    .select('*')
    .eq('id_proyecto', idProject)
    .eq('id_estudiante', user.id)
    .single();

  if (errorEstudianteProyecto || !estudianteProyecto) return null



  return data.rol;
}