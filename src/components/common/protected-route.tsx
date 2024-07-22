import { getRol } from "@/src/utils/supabase/get-rol-server";
import { notFound } from "next/navigation";

export const ProtectedRoute = async ({
  children, id
}: {
  children: React.ReactNode
  id: string
}) => {
  const { inProject, rol } = await getRol({ idProject: id });

  if (!inProject && (rol === "coordinador" || rol === "tutor")) {
    return notFound();
  }

  return <>{children}</>;
} 