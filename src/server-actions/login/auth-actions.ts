"use server";

import { SignInInputs, SignUpInputs } from "@/src/types/login/login";
import { createClient } from "@/src/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signIn = async (data: SignInInputs) => {

  const email = data.email;
  const password = data.password;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/login?mensaje=Usuario o contrase%C3%B1a incorrectos");
  }

  return redirect("/proyectos");
};

export const signUp = async (data: SignUpInputs) => {

  const origin = headers().get("origin");
  const email = data.email;
  const password = data.password;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect("/login/register?mensaje=No se pudo guardar al usuario");
  }

  const { error: errorSaveUser } = await supabase.from("Usuario").insert({
    nombre: data.name,
    rol: "estudiante",
    correo: data.email,
    id_carrera: data.career,
  });

  if (errorSaveUser) {
    return redirect("/login/register?mensaje=Correo registrado previamente");
  }

  return redirect("/login/register?mensaje-confirmacion=Mira tu correo para confirmar tu cuenta");
};