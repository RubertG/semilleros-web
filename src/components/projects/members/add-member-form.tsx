"use client"

import { useForm } from "@/src/hooks/common/use-form"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { z } from "zod"

interface Props {
  className?: string
  idProject: string
}

const Schema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es requerido" })
    .email({ message: "El email es invalido" })
    .refine((email) => email.includes("@unipamplona.edu.co"), {
      message: "El email debe ser de @unipamplona.edu.co",
    }),
})

interface Inputs {
  email: string
}

export const AddMemberForm = ({
  className,
  idProject
}: Props) => {
  const router = useRouter()
  const pathName = usePathname()
  const [error, setError] = useState("")
  const { errors, handleSubmit, register, loading } = useForm<Inputs>({
    schema: Schema,
    actionSubmit: async (formData) => {
      const res = await fetch(`/api/proyecto/integrantes/${idProject}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          correo: formData.email
        })
      })
      const data = await res.json()

      if (data?.mensaje) {
        setError(data.mensaje)
        return
      }

      router.push(`/proyectos/${idProject}/integrantes`)
      router.refresh()
    }
  })

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          await handleSubmit(e)
        }}
        className={`bg-white shadow-md rounded-lg px-6 py-8 mb-4 w-5/6 max-w-lg ${className}`}
      >
        <h2 className="text-2xl font-bold text-primary-100 text-center mb-7">Agregar integrante</h2>
        <label
          className="block text-text-100 mb-3"
          htmlFor="email">

        </label>
        <input
          className="w-full border border-border-50 rounded-lg px-4 py-2 mb-4 shadow-sm focus:outline-primary-100"
          placeholder="juanperez@unipamplona.edu.co"
          type="email"
          {...register("email")}
          id="email" />
        {errors.email?.message && <p className="text-red-800 -mt-2 mb-3 text-sm">{errors.email.message}</p>}

        <footer className="flex items-center gap-4">
          <button
            className="px-4 py-1.5 rounded-lg bg-primary-100 text-bg-50 lg:hover:bg-accent-200 lg:transition-colors"
            type="submit"
          >
            {loading ? "Agregando..." : "Agregar"}
          </button>
          <Link
            href={pathName}
            className="rounded-lg text-text-200 lg:hover:text-text-100 lg:transition-colors"
          >
            Cancelar
          </Link>
        </footer>
      </form>
      {error && <p className="text-red-800">{error}</p>}
    </>
  )
}