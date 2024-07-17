import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center p-4 gap-2 h-dvh">
      <h1
        className="text-2xl font-semibold text-primary-100 text-center"
      >No se encontró la página :(</h1>
      <Link 
        className="text-text-100 lg:hover:underline"
      href="/">Volver al inicio</Link>
    </main>
  );
}