"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export const DeleteButton = ({
  id
}: {
  id: string
}) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  return (
    <button
      onClick={async () => {
        setLoading(true)
        await fetch(`/api/proyecto/${id}`, {
          method: "DELETE",
        })
        router.push("/")
        router.refresh()
        setLoading(false)
      }}
      className="text-text-200 hover:text-red-800 transition-colors text-sm lg:text-base">
      {loading ? "Eliminando..." : "Eliminar"}
    </button>
  )
}