"use client"

import { Database } from "@/src/types/db/supabase"
import { createClient } from "@/src/utils/supabase/client"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "@/src/hooks/common/use-form"
import { z } from "zod"
import { Selector } from "../../common/icons"

interface Props {
  className?: string
  idProject: string
}

const Schema = z.object({
  nombre: z.string().min(1, { message: "El nombre es requerido" }),
  estado: z.string().min(1, { message: "El estado es requerido" }),
  descripcion: z.string().min(1, { message: "La descripción es requerida" }),
})

interface Inputs {
  nombre: string
  descripcion: string
  estado: string
}

export const EditProjectForm = ({
  className, idProject
}: Props) => {
  const [error, setError] = useState("")
  const [defaultValues, setDefaultValues] = useState<{
    nombre: string
    descripcion: string
    estado: Database["public"]["Enums"]["estado"] | ""
  }>({
    nombre: "",
    estado: "",
    descripcion: ""
  })
  const [states, setStates] = useState<Database["public"]["Enums"]["estado"][]>(["nuevo", "continuacion", "finalizado"])
  const router = useRouter()
  const pathname = usePathname()
  const { errors, handleSubmit, register, loading } = useForm<Inputs>({
    schema: Schema,
    values: defaultValues,
    actionSubmit: async (formData) => {
      const supabase = createClient()
      const { data: { user }, error } = await supabase.auth.getUser()

      if (error || !user) {
        setError("No se pudo obtener el usuario")
        return
      }

      const body: Inputs = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        estado: formData.estado
      }

      const res = await fetch(`/api/proyecto/${idProject}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      const data = await res.json()

      if (data?.mensaje) {
        setError(data.mensaje)
        return
      }

      router.push(pathname)
      router.refresh()
    }
  })

  useEffect(() => {
    const getProject = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('Proyecto')
        .select('*')
        .eq('id', idProject)
        .single();

      if (error || !data) return

      setDefaultValues({
        nombre: data.nombre,
        estado: data.estado,
        descripcion: data.descripcion
      })
    }

    getProject()
  }, [])

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          await handleSubmit(e)
        }}
        className={`bg-white shadow-md rounded-lg px-6 py-8 mb-4 w-5/6 max-w-3xl ${className}`}
      >
        <h2 className="text-2xl font-bold text-primary-100 text-center mb-7">Editar proyecto</h2>

        <label
          className="block text-text-100 mb-1"
          htmlFor="nombre">
          Nombre del proyecto
        </label>
        <input
          className="w-full border border-border-50 rounded-lg px-4 py-2 mb-4 shadow-sm focus:outline-primary-100"
          placeholder="Nombre del proyecto"
          type="text"
          id="nombre"
          {...register("nombre")} />
        {errors.nombre?.message && <p className="text-red-800 -mt-2 mb-3 text-sm">{errors.nombre.message}</p>}

        <label
          className="block text-text-100 mb-1"
          htmlFor="descripcion">
          Descripción del proyecto
        </label>
        <textarea
          className="w-full border border-border-50 rounded-lg px-4 py-2 mb-2 shadow-sm focus:outline-primary-100"
          placeholder="Descripción del proyecto"
          {...register("descripcion")}
          id="descripcion" />
        {errors.descripcion?.message && <p className="text-red-800 -mt-2 mb-3 text-sm">{errors.descripcion.message}</p>}

        <label
          htmlFor="estado"
          className="text-text-100 block mb-2">
          Estado del proyecto <span className="text-red-800 font-medium">*</span>
        </label>
        <div className="relative mb-4">
          <select className="w-full border border-border-50 rounded-lg px-4 py-2 shadow-sm focus:outline-primary-100 border-none bg-bg-50 text-text-100 placeholder:text-gray-400 appearance-none shadow-button cursor-pointer"
            id="estado"
            {...register("estado")}
          >
            <option value="" selected disabled>
              {states.length === 0 ? 'Cargando estados...' : 'Seleccionar carrera'}
            </option>
            {
              states.map((s) => (
                <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>
              ))
            }
          </select>
          <Selector className="absolute stroke-text-200 right-3 top-1/2 -translate-y-1/2" />
        </div>
        {errors.estado?.message && <p className="text-red-800 -mt-2 mb-3 text-sm">{errors.estado.message}</p>}


        <footer className="flex items-center gap-4">
          <button
            className="px-4 py-1.5 rounded-lg bg-primary-100 text-bg-50 lg:hover:bg-accent-200 lg:transition-colors"
            type="submit"
          >
            {loading ? "Agregando..." : "Agregar"}
          </button>
          <Link
            href={pathname}
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