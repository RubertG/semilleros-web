"use client"

import { FetchType } from "@/src/types/projects/projects"
import { SquareMinus } from "../../common/icons"
import Avvvatars from "avvvatars-react"
import { defaultUrl } from "@/src/const/common/consts"
import { useRouter } from "next/navigation"

interface Props extends FetchType { }

export const MembersCard = ({
  estudiante, proyecto
}: Props) => {
  const router = useRouter()

  const handleDelete = async () => {
    const res = await fetch(`${defaultUrl}/api/proyecto/integrantes/${proyecto.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_estudiante: estudiante.id
      })
    })

    if (res.ok) {
      router.refresh()
    }
  }

  return (
    <article className="flex items-center justify-between px-3.5 py-2.5 mb-1 lg:hover:bg-bg-200 rounded-lg lg:transition-colors">
      <div className="flex items-center gap-3 overflow-hidden">
        <Avvvatars value={estudiante.correo} size={50} />
        <div className="text-ellipsis overflow-hidden whitespace-nowrap">
          <p className="text-text-100 font-medium">{estudiante.nombre}</p>
          <p className="text-sm text-text-300">{estudiante.correo}</p>
        </div>
      </div>
      <button
        className="lg:hover:scale-125 lg:transition-transform"
        onClick={handleDelete}
      >
        <SquareMinus className="w-5 h-5 stroke-text-300" />
      </button>
    </article>
  )
}