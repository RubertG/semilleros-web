"use client"

import { ProgressType } from "@/src/types/projects/projects"
import { SquareMinus } from "../../common/icons"
import { defaultUrl } from "@/src/const/common/consts"
import { useRouter } from "next/navigation"

interface Props {
  progress: ProgressType
}

export const ProgressCard = ({
  progress
}: Props) => {
  const router = useRouter()

  const handleDelete = async () => {
    const res = await fetch(`${defaultUrl}/api/proyecto/avances/${progress.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: progress.id
      })
    })

    if (res.ok) {
      router.refresh()
    }
  }

  return (
    <article className="flex items-center justify-between px-3.5 py-2.5 mb-1 lg:hover:bg-bg-200 rounded-lg lg:transition-colors">
      <div className="text-ellipsis overflow-hidden whitespace-nowrap">
        <p className="text-text-100 font-medium">{progress.nombre}</p>
        <p className="text-sm text-text-300">
          {new Date(progress.fecha).toLocaleDateString('es-ES', {
            month: 'long',
            year: 'numeric',
            day: 'numeric'
          })}
        </p>
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