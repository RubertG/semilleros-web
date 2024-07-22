import { ProtectedRoute } from "@/src/components/common/protected-route";

export default function Layout({ 
  children,
  params: { id }
}: { 
  children: React.ReactNode,
  params: { id: string }
}) {
  return (
    <ProtectedRoute id={id}>
      {children}
    </ProtectedRoute>
  );
}