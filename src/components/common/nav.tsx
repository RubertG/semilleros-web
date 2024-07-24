'use client'

import { createClient } from "@/src/utils/supabase/client"
import { User } from "@supabase/supabase-js"
import clsx from "clsx"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient()
      const { data: { user }, error } = await supabase.auth.getUser()

      if (error || !user) setUser(null)

      setUser(user)
    }
    fetchUser()
  }, [])

  return (
    <nav
      className="px-4 py-2.5 w-full"
    >
      <nav
        className="flex items-center justify-between max-w-7xl mx-auto">
        <Link
          href="/"
        >
          <h1
            className="text-xl font-bold text-primary-100 lg:transition-colors">
            Semilleros UP
          </h1>
        </Link>
        <ul
          className={clsx("text-text-100 text-center entry bg-bg-50 lg:bg-inherit absolute w-full top-14 left-0 lg:static lg:w-auto lg:flex lg:items-center lg:justify-center gap-1", {
            "hidden": !open
          })}
          onClick={() => setOpen(false)}
        >
          <li>
            <Link
              href="/"
              className={clsx("block py-2 px-3 w-full lg:transition-colors lg:hover:text-primary-100", {
                "text-primary-100": pathname === "/"
              })}>
              Inicio
            </Link>
          </li>

          <li>
            {
              user ? (
                <button
                  onClick={async () => {
                    const supabase = createClient()
                    const { error } = await supabase.auth.signOut()
                    router.push("/login")
                  }}
                  className="block py-2 px-3 w-full lg:transition-colors lg:hover:text-red-900">
                  Cerrar sesión
                </button>
              ) : (
                <Link
                  href="/login"
                  className="block py-2 px-3 w-full lg:transition-colors lg:hover:text-primary-100">
                  Iniciar sesión
                </Link>
              )
            }
          </li>
        </ul>
        <button
          className="flex justify-between items-center gap-[3px] flex-col lg:hidden"
          onClick={() => setOpen(!open)}
        >
          <span className={clsx("h-[2px] w-5 bg-gray-200 rounded-lg transition-transform", {
            "translate-y-[5px] -rotate-45": open
          })}></span>
          <span className={clsx("h-[2px] w-5 bg-gray-200 rounded-lg transition-transform", {
            "opacity-0": open
          })}></span>
          <span className={clsx("h-[2px] w-5 bg-gray-200 rounded-lg transition-transform", {
            "-translate-y-[5px] rotate-45": open
          })}></span>
        </button>
      </nav>
    </nav>
  )
}
