import { ProjectContainer } from "@/src/components/faculties/projects-container";
import { Faculty, ProjectType } from "@/src/types/faculties/faculties";
import { Error } from "@/src/components/common/error";
import { getRol } from "@/src/utils/supabase/get-rol-server";
import { ButtonLink } from "@/src/components/common/button";
import { Nav } from "@/src/components/common/nav";
import { Popup } from "@/src/components/common/popup";
import { AddProjectForm } from "@/src/components/projects/common/add-project-form";

interface FetchType extends Faculty {
  proyectos: ProjectType[]
}

const getData = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/facultad/proyectos/${id}`, { cache: 'no-store' })
  return res.json() as Promise<FetchType>
}

async function FacultiesPage({
  params: { id },
  searchParams: { formulario }
}: {
  params: { id: string },
  searchParams: { formulario: string }
}) {
  const data = await getData(id)
  const { rol } = await getRol({ idProject: "" })

  if ('error' in data && typeof data.error === 'string') {
    return (
      <Error message={data.error} />
    )
  }

  return (
    <>
      <Nav />
      <main className="px-4 max-w-6xl lg:px-0 mx-auto">
        <h1
          className="text-3xl lg:text-4xl font-bold text-primary-100 text-center mt-2"
        >{data.nombre}</h1>
        <ProjectContainer projects={data.proyectos} className="my-10" />
        {
          rol === "tutor" && (
            <ButtonLink
              className="my-10"
              href={`/facultades/${id}?formulario=true`}
            >
              Agregar proyecto
            </ButtonLink>
          )
        }
        {
          formulario && (
            <Popup>
              <AddProjectForm />
            </Popup>
          )
        }
      </main>
    </>
  )
}

export default FacultiesPage