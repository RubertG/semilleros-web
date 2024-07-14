"use client"

import { signIn } from "@/src/app/server-actions/login/auth-actions"
import Link from "next/link"
import { SubmitButton } from "../common/submit-button"

export const Form = () => {
  return (
    <form action={signIn}>
      <label
        htmlFor="email"
        className="text-text-100 block mb-2">
        Email <span className="text-red-800 font-medium">*</span>
      </label>
      <input
        id="email"
        type="email"
        className="w-full border border-border-50 rounded-lg px-4 py-2 mb-4 shadow-sm focus:outline-primary-100"
        name="email"
        placeholder="juanperez@unipamplona.edu.co" />

      <label
        htmlFor="password"
        className="text-text-100 block mb-2">
        Contraseña <span className="text-red-800 font-medium">*</span>
      </label>
      <input
        id="password"
        className="w-full border border-border-50 rounded-lg px-4 py-2 mb-7 shadow-sm focus:outline-primary-100"
        type="password"
        name="password"
        placeholder="********" />

      <footer className="flex items-center justify-end gap-5">
        <Link
          className="text-text-200 hover:text-primary-100 transition-colors"
          href="/login/register">Registrarse</Link>
        <SubmitButton
          className="bg-primary-100 text-bg-50 hover:bg-accent-200 px-4 py-2 rounded-lg transition-colors"
        >Iniciar sesión</SubmitButton>
      </footer>
    </form>
  )
}