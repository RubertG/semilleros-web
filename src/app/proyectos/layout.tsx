import { Nav } from "@/src/components/projects/common/nav";
import { createClient } from "@/src/utils/supabase/server";

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = createClient();
  const { data: session } = await supabase.auth.getSession();

  return (
    <>
      {
        session?.session && (
          <Nav />
        )
      }
      {children}
    </>
  );
}