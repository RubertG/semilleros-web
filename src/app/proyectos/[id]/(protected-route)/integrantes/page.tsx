import { ButtonLink } from "@/src/components/common/button"
import { Popup } from "@/src/components/common/popup"
import { AddMemberForm } from "@/src/components/projects/members/add-member-form"
import { MembersContainer } from "@/src/components/projects/members/members-container"
import { getRol } from "@/src/utils/supabase/get-rol-server"

interface Props {
  params: {
    id: string
  }
  searchParams: {
    formulario: string
  }
}

export default async function MembersPage({
  params: { id },
  searchParams: { formulario }
}: Props) {
  const rol = await getRol({ idProject: id })

  return (
    <main className="pl-16 pr-4 max-w-4xl lg:px-0 mx-auto">
      <h1
        className="text-3xl lg:text-4xl font-bold text-primary-100 text-center mt-6 lg:mt-10"
      >Integrantes</h1>
      <MembersContainer id={id} className="mt-6 max-w-3xl mx-auto" />
      <section className="max-w-3xl mx-auto mt-6 mb-10">
        {
          rol === "tutor" && (
            <ButtonLink
              href={`/proyectos/${id}/integrantes?formulario=true`}>
              Agregar integrante
            </ButtonLink>
          )
        }
      </section>
      {
        formulario && (
          <Popup>
            <AddMemberForm idProject={id} />
          </Popup>
        )}
    </main>
  )
}