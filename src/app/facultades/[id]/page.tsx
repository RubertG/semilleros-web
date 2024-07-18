import { ProjectContainer } from "@/src/components/faculties/projects-container";
import { defaultUrl } from "../../layout"
import { Faculty, ProjectType } from "@/src/types/faculties/faculties";

interface FetchType extends Faculty {
  proyectos: ProjectType[]
}

const getData = async (id: string) => {
  const res = await fetch(`${defaultUrl}/api/facultad/proyectos/${id}`, { cache: 'no-store' })
  return res.json() as Promise<FetchType>
}

async function FacultiesPage({
  params: { id }
}: {
  params: { id: string }
}) {
  const data = await getData(id)

  if ('error' in data && typeof data.error === 'string') {
    return (
      <main className="px-4 h-dvh flex flex-col items-center justify-center -mt-5">
        <h1
          className="text-3xl lg:text-4xl font-bold text-primary-100 text-center mt-6 lg:mt-10"
        >Ups, hubo un error :(</h1>
        <p className="text-center mt-3 text-text-100">{data.error}</p>
      </main>
    )
  }

  return (
    <main className="px-4 max-w-6xl mx-auto">
      <h1
        className="text-3xl lg:text-4xl font-bold text-primary-100 text-center mt-6 lg:mt-10"
      >{data.nombre}</h1>
      <ProjectContainer projects={data.proyectos} className="mt-10" />
    </main>
  )
}

export default FacultiesPage