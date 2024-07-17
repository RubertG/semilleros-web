import { Nav } from "@/src/components/projects/common/nav";

export default function Layout({
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