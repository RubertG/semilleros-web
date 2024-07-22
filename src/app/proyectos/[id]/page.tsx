import { ButtonLink } from "@/src/components/common/button"
import { Database } from "@/src/types/db/supabase"
import { Error } from "@/src/components/common/error"
import { Popup } from "@/src/components/common/popup"
import Link from "next/link"
import { defaultUrl } from "@/src/const/common/consts"

interface Props {
  params: {
    id: string
  }
  searchParams: {
    formulario: string
  }
}

type Proyecto = Database["public"]["Tables"]["Proyecto"]["Row"]

interface DataFetch extends Proyecto {
  mensaje?: string
  semillero: {
    nombre: Database["public"]["Tables"]["Semillero"]["Row"]["nombre"]
    descripcion: Database["public"]["Tables"]["Semillero"]["Row"]["descripcion"]
    id: Database["public"]["Tables"]["Semillero"]["Row"]["id"]
    coordinador: {
      id: Database["public"]["Tables"]["Usuario"]["Row"]["id"]
      nombre: Database["public"]["Tables"]["Usuario"]["Row"]["nombre"]
    }
  }
  tutor: {
    id: Database["public"]["Tables"]["Usuario"]["Row"]["id"]
    nombre: Database["public"]["Tables"]["Usuario"]["Row"]["nombre"]
  }
  carrera: {
    id: Database["public"]["Tables"]["Carrera"]["Row"]["id"]
    nombre: Database["public"]["Tables"]["Carrera"]["Row"]["nombre"]
  }
}

const getData = async (id: string) => {
  const res = await fetch(`${defaultUrl}/api/proyecto/${id}`, { cache: 'no-store' })
  const data: DataFetch = await res.json()
  return data
}

export default async function ProjectPage({
  params: { id },
  searchParams: { formulario }
}: Props) {
  const data = await getData(id)

  if ('error' in data && typeof data.error === 'string') {
    return (
      <Error message={data.error} />
    )
  }

  return (
    <main className="pl-16 pr-4 max-w-4xl lg:px-0 mx-auto">
      <h1
        className="text-3xl lg:text-4xl font-bold text-primary-100 text-center mt-6 lg:mt-10"
      >{data.nombre}</h1>
      <p className="text-text-100 mt-7">
        {data.descripcion}
      </p>
      <p className="text-text-100 mt-3 mb-8">
        {data.carrera.nombre} | {data.tutor.nombre}
      </p>
      <ButtonLink href="?formulario=true">Postularse</ButtonLink>
      <h2
        className="text-2xl lg:text-3xl font-bold text-primary-100 text-center mt-6 lg:mt-10"
      >
        {data.semillero.nombre}
      </h2>
      <p className="text-text-100 mt-7">
        {data.semillero.descripcion}
      </p>
      <p className="text-text-100 mt-3 mb-16">
        {data.semillero.coordinador.nombre}
      </p>
      {
        formulario && (
          <Popup>
            <form
              className="bg-white shadow-md rounded-lg px-6 py-10 mb-4 w-5/6 max-w-md"
            >
              <label
                className="block text-text-100 mb-3"
                htmlFor="justification">
                ¿Por qué te quieres postular?
              </label>
              <textarea
                className="w-full border border-border-50 rounded-lg px-4 py-2 mb-4 shadow-sm focus:outline-primary-100"
                id="justification"
                placeholder="Aquí tu justificación..." />
              <footer className="flex justify-end items-center gap-4">
                <Link
                  className="text-text-200 hover:text-primary-100 transition-colors text-sm lg:text-base"
                  href={`/proyectos/${id}`}>Volver</Link>
                <ButtonLink href={`/proyectos/${id}`}>Postularse</ButtonLink>
              </footer>
            </form>
          </Popup>
        )
      }
    </main>
  )
}