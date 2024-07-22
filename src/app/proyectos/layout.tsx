import { Nav } from "@/src/components/projects/common/nav";

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <Nav />
      {children}
    </>
  );
}