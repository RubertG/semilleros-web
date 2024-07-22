import { ProjectContainer } from "@/src/components/faculties/projects-container";
import { Faculty, ProjectType } from "@/src/types/faculties/faculties";
import { Error } from "@/src/components/common/error";
import { defaultUrl } from "@/src/const/common/consts";

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
      <Error message={data.error} />
    )
  }

  return (
    <main className="px-4 max-w-6xl lg:px-0 mx-auto">
      <h1
        className="text-3xl lg:text-4xl font-bold text-primary-100 text-center mt-6 lg:mt-10"
      >{data.nombre}</h1>
      <ProjectContainer projects={data.proyectos} className="my-10" />
    </main>
  )
}

export default FacultiesPage