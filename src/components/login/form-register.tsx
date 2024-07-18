"use client"

import { signUp } from "@/src/server-actions/login/auth-actions"
import Link from "next/link"
import { SubmitButton } from "../common/submit-button"
import { useForm } from "@/src/hooks/common/use-form"
import { SignUpInputs } from "@/src/types/login/login"
import { signUpSchema } from "@/src/validations/login/sign-up-schema"
import { Selector } from "../common/icons"
import { useEffect, useState } from "react"
import { createClient } from "@/src/utils/supabase/client"
import { Database } from "@/src/types/db/supabase"

export const FormRegister = () => {
  const [careers, setCareers] = useState<Database['public']['Tables']['Carrera']['Row'][]>([])
  const { errors, handleSubmit, loading, register } = useForm<SignUpInputs>({
    schema: signUpSchema,
    actionSubmit: signUp
  })

  useEffect(() => {
    const fetchCareers = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from('Carrera').select('*')

      if (error) return setCareers([])

      setCareers(data)
    }
    fetchCareers()
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="name"
        className="text-text-100 block mb-2">
        Nombre y apellido <span className="text-red-800 font-medium">*</span>
      </label>
      <input
        id="name"
        type="text"
        className="w-full border border-border-50 rounded-lg px-4 py-2 mb-4 shadow-sm focus:outline-primary-100"
        placeholder="Juan Perez"
        {...register("name")}
      />
      {errors.name?.message && <p className="text-red-800 -mt-2 mb-3 text-sm">{errors.name.message}</p>}

      <label
        htmlFor="career"
        className="text-text-100 block mb-2">
        Carrera <span className="text-red-800 font-medium">*</span>
      </label>
      <div className="relative mb-4">
        <select className="w-full border border-border-50 rounded-lg px-4 py-2 shadow-sm focus:outline-primary-100 border-none bg-bg-50 text-text-100 placeholder:text-gray-400 appearance-none shadow-button cursor-pointer"
          id="career"
          {...register("career")}
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
      {errors.career?.message && <p className="text-red-800 -mt-2 mb-3 text-sm">{errors.career.message}</p>}

      <label
        htmlFor="email"
        className="text-text-100 block mb-2">
        Email <span className="text-red-800 font-medium">*</span>
      </label>
      <input
        id="email"
        type="email"
        className="w-full border border-border-50 rounded-lg px-4 py-2 mb-4 shadow-sm focus:outline-primary-100"
        placeholder="juanperez@unipamplona.edu.co"
        {...register("email")}
      />
      {errors.email?.message && <p className="text-red-800 -mt-2 mb-3 text-sm">{errors.email.message}</p>}

      <label
        htmlFor="password"
        className="text-text-100 block mb-2">
        Contraseña <span className="text-red-800 font-medium">*</span>
      </label>
      <input
        id="password"
        className="w-full border border-border-50 rounded-lg px-4 py-2 mb-7 shadow-sm focus:outline-primary-100"
        type="password"
        placeholder="********"
        {...register("password")}
      />
      {errors.password?.message && <p className="text-red-800 -mt-5 mb-3 text-sm">{errors.password.message}</p>}

      <footer className="flex items-center justify-end gap-5">
        <Link
          className="text-text-200 hover:text-primary-100 transition-colors text-sm lg:text-base"
          href="/login">¿Ya tienes cuenta?</Link>
        <SubmitButton
          isPending={loading}
          pendingText="Creando usuario..."
          className="bg-primary-100 text-bg-50 hover:bg-accent-200 px-4 py-2 rounded-lg transition-colors text-sm lg:text-base"
        >Crear usuario</SubmitButton>
      </footer>
    </form>
  )
}