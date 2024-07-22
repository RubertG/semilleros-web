import { createClient } from "./client";

export const getRol = async ({
  idProject
}: {
  idProject: string
}) => {
  const supabase = createClient();
  const { data: { user }, error: errorUser } = await supabase.auth.getUser();

  if (errorUser || !user) return {
    rol: null,
    inProject: false
  }

  const { data, error: errorRol } = await supabase
    .from('Usuario')
    .select('*')
    .eq('id', user.id)
    .single();

  if (errorRol || !data) return {
    rol: null,
    inProject: false
  }

  if (data.rol === "tutor") {
    const { data: tutorProyecto, error: errorTutorProyecto } = await supabase
      .from('Proyecto')
      .select('*')
      .eq('id', idProject)
      .eq('id_tutor', user.id)
      .single();

    if (errorTutorProyecto || !tutorProyecto) return {
      rol: null,
      inProject: false
    }

    return {
      rol: data.rol,
      inProject: true
    }
  }

  if (data.rol === "coordinador") return {
    rol: data.rol,
    inProject: true
  }

  const { data: estudianteProyecto, error: errorEstudianteProyecto } = await supabase
    .from('Estudiante_proyecto')
    .select('*')
    .eq('id_proyecto', idProject)
    .eq('id_estudiante', user.id)
    .single();

  if (errorEstudianteProyecto || !estudianteProyecto) return {
    rol: null,
    inProject: false
  }

  return {
    rol: data.rol,
    inProject: true
  };
}