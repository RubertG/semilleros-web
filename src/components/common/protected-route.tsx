import { getRol } from "@/src/utils/supabase/get-rol-server";
import { notFound } from "next/navigation";

export const ProtectedRoute = async ({
  children, id
}: {
  children: React.ReactNode
  id: string
}) => {
  const { inProject, rol } = await getRol({ idProject: id });
  console.log(inProject, rol);

  if (!inProject && rol === "estudiante") {
    return notFound();
  }

  if (!inProject && rol === "tutor") {
    return notFound();
  }

  return <>{children}</>;
} 