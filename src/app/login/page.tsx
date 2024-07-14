import { Form } from "@/src/components/login/form";

export default function Login({
  searchParams,
}: {
  searchParams: { mensaje: string };
}) {

  return (
    <main className="flex flex-col items-center justify-center p-4 h-dvh">
      <section className="rounded-xl bg-bg-50 shadow-md px-6 py-7 max-w-lg border border-bg-300 border-opacity-10 w-full">
        <h1
          className="text-3xl font-semibold text-primary-100 mb-6 text-center"
        >Iniciar sesión</h1>
        <Form />
      </section>
      {searchParams.mensaje && (
        <p className="text-center mt-4 text-red-800 text-sm">{searchParams.mensaje}</p>
      )}
    </main>
  );
}
