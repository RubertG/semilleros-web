"use client"

import { defaultUrl } from "@/src/const/common/consts"
import { useForm } from "@/src/hooks/common/use-form"
import { Database } from "@/src/types/db/supabase"
import { createClient } from "@/src/utils/supabase/client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { z } from "zod"
import { Selector } from "../../common/icons"

interface Props {
  className?: string
  setError: (message: string) => void
  careers: Database['public']['Tables']['Carrera']['Row'][]
  seeders: Database['public']['Tables']['Semillero']['Row'][]
  setCareer: (value: Database['public']['Tables']['Carrera']['Row'] | null) => void
}

const Schema = z.object({
  nombre: z.string().min(1, { message: "El nombre es requerido" }),
  id_semillero: z.string().min(1, { message: "El semillero es requerido" }),
  id_carrera: z.string().min(1, { message: "La carrera es requerida" }),
  descripcion: z.string().min(1, { message: "La descripción es requerida" }),
})

interface Inputs {
  nombre: string
  descripcion: string
  id_semillero: string
  id_carrera: string
}

type Project = Database["public"]["Tables"]["Proyecto"]["Row"]
interface Body extends Omit<Project, "id"> {
  id_carrera: string
}

export const ProjectForm = ({
  className, setCareer, careers, seeders, setError
}: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const { errors, handleSubmit, register, loading } = useForm<Inputs>({
    schema: Schema,
    actionSubmit: async (formData) => {
      const supabase = createClient()
      const { data: { user }, error } = await supabase.auth.getUser()

      if (error || !user) {
        setError("No se pudo obtener el usuario")
        return
      }

      const body: Body = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        estado: "nuevo",
        id_semillero: formData.id_semillero,
        id_tutor: user.id,
        id_carrera: formData.id_carrera
      }

      const res = await fetch(`${defaultUrl}/api/proyecto`, {
        method: 'POST',
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

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        await handleSubmit(e)
      }}
      className={`bg-white shadow-md rounded-lg px-6 py-8 mb-4 w-5/6 max-w-3xl ${className}`}
    >
      <h2 className="text-2xl font-bold text-primary-100 text-center mb-7">Agregar proyecto</h2>

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
        htmlFor="id_carrera"
        className="text-text-100 block mb-2">
        Carrera a la que pertenece <span className="text-red-800 font-medium">*</span>
      </label>
      <div className="relative mb-4">
        <select className="w-full border border-border-50 rounded-lg px-4 py-2 shadow-sm focus:outline-primary-100 border-none bg-bg-50 text-text-100 placeholder:text-gray-400 appearance-none shadow-button cursor-pointer"
          id="id_carrera"
          onClick={(e) => {
            setCareer(careers.find((c) => c.id === e.currentTarget.value) || null)
          }}
          {...register("id_carrera")}
        >
          <option value="" selected disabled>
            {careers.length === 0 ? 'Cargando carreras...' : 'Seleccionar carrera'}
          </option>
          {
            careers.map((career) => (
              <option key={career.id} value={career.id}>{career.nombre}</option>
            ))
          }
        </select>
        <Selector className="absolute stroke-text-200 right-3 top-1/2 -translate-y-1/2" />
      </div>
      {errors.id_carrera?.message && <p className="text-red-800 -mt-2 mb-3 text-sm">{errors.id_carrera.message}</p>}

      <label
        htmlFor="id_semillero"
        className="text-text-100 block mb-2">
        Semillero al que pertenece <span className="text-red-800 font-medium">*</span>
      </label>
      <div className="relative mb-4">
        <select className="w-full border border-border-50 rounded-lg px-4 py-2 shadow-sm focus:outline-primary-100 border-none bg-bg-50 text-text-100 placeholder:text-gray-400 appearance-none shadow-button cursor-pointer"
          id="id_semillero"
          {...register("id_semillero")}
        >
          <option value="" selected disabled>
            {seeders.length === 0 ? 'No hay semilleros en esta carrera' : 'Seleccionar semillero'}
          </option>
          {
            seeders.map((seeder) => (
              <option key={seeder.id} value={seeder.id}>{seeder.nombre}</option>
            ))
          }
        </select>
        <Selector className="absolute stroke-text-200 right-3 top-1/2 -translate-y-1/2" />
      </div>
      {errors.id_semillero?.message && <p className="text-red-800 -mt-2 mb-3 text-sm">{errors.id_semillero.message}</p>}

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
  )
}