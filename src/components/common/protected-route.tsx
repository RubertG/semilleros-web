import { createClient } from "@/src/utils/supabase/server";
import { notFound } from "next/navigation";

export const ProtectedRoute = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    return notFound();
  }

  return <>{children}</>;
} 