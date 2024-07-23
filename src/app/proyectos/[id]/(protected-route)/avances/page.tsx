import { ButtonLink } from "@/src/components/common/button"
import { ProgressContainer } from "@/src/components/projects/progress/progress-container"
import { getRol } from "@/src/utils/supabase/get-rol-server"

interface Props {
  params: {
    id: string
  }
}

export default async function ProgressPage({
  params: { id }
}: Props) {
  const { rol } = await getRol({ idProject: id })

  return (
    <main className="pl-16 pr-4 max-w-4xl lg:px-0 mx-auto">
      <h1
        className="text-3xl lg:text-4xl font-bold text-primary-100 text-center mt-6 lg:mt-10"
      >Avances</h1>
      <ProgressContainer id={id} className="mt-6 max-w-3xl mx-auto" />
      <section className="max-w-3xl mx-auto mt-6 mb-10">
        {
          rol === "tutor" && (
            <ButtonLink
              href={`/proyectos/${id}/avances/#`}>
              Agregar avance
            </ButtonLink>
          )
        }
      </section>
    </main>
  )
}