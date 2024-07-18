"use client"

import { signIn } from "@/src/server-actions/login/auth-actions"
import Link from "next/link"
import { SubmitButton } from "../common/submit-button"
import { useForm } from "@/src/hooks/common/use-form"
import { signInSchema } from "@/src/validations/login/sign-in-schema"
import { SignInInputs } from "@/src/types/login/login"

export const Form = () => {
  const { errors, handleSubmit, loading, register } = useForm<SignInInputs>({
    schema: signInSchema,
    actionSubmit: signIn
  })

  return (
    <form onSubmit={handleSubmit}>
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
          href="/login/register">Registrarse</Link>
        <SubmitButton
          isPending={loading}
          pendingText="Iniciando sesión..."
          className="bg-primary-100 text-bg-50 hover:bg-accent-200 px-4 py-2 rounded-lg transition-colors text-sm lg:text-base"
        >Iniciar sesión</SubmitButton>
      </footer>
    </form>
  )
}