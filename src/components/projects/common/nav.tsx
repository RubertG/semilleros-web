"use client"

import { useParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ChevronsRight, Home, Logout, Menu, Persons, UserCircle } from "../../common/icons"
import Link from "next/link"
import clsx from "clsx"
import { createClient } from "@/src/utils/supabase/client"
import { Database } from "@/src/types/db/supabase"
import { getRol } from "@/src/utils/supabase/get-rol-client"

const links = [
  {
    name: "Información",
    icon: <Home className="stroke-bg-200 w-7 h-7" />,
    path: "/"
  }, {
    name: "Avances",
    icon: <ChevronsRight className="stroke-bg-200 w-7 h-7" />,

    path: "/avances"
  }, {
    name: "Integrantes",
    icon: <Persons className="stroke-bg-200 w-7 h-7" />,
    path: "/integrantes"
  }
]

export const Nav = () => {
  const [open, setOpen] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const pathName = usePathname()
  const supabase = createClient()
  const { id } = useParams()
  const router = useRouter()
  const [rol, setRol] = useState<{
    rol: Database["public"]["Enums"]["rol"] | null,
    inProject: boolean
  }>({
    rol: null,
    inProject: false
  })

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user?.email) return

      setUserEmail(user.email)

      if (!Array.isArray(id)) {
        const data = await getRol({ idProject: id })
        setRol(data || { rol: null, inProject: false })
      }
    }
    fetchUser()
  }, [])

  if (!userEmail || !rol.inProject || !rol.rol) return null

  const handleOpenMenu = () => {
    setOpen(!open)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <nav className={clsx("fixed bg-accent-200 h-full top-0 left-0 px-1 py-1 pb-3 flex flex-col justify-between overflow-hidden transition-all", {
      "w-[3.25rem]": !open,
      "w-56": open
    })}>
      <section>
        <button
          title="Abrir menu de proyectos"
          className="p-2"
          onClick={handleOpenMenu}
        >
          <Menu className="w-7 h-7 stroke-bg-50" />
        </button>
        <ul className="mt-5 flex flex-col gap-1">
          {
            links.map(link => {
              let isActive = pathName === `/proyectos/${id}${link.path}`

              if (link.path === "/") {
                isActive = pathName === `/proyectos/${id}`
              }

              return (
                <li key={link.name}>
                  <Link
                    className={clsx("flex items-center gap-2.5 text-bg-200 p-2 rounded-lg lg:hover:bg-accent-300 lg:transition-colors", {
                      "bg-accent-300": isActive
                    })}
                    title={`Ir a la sección de ${link.name}`}
                    href={`/proyectos/${id}${link.path}`}
                  >
                    <picture>{link.icon}</picture>
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap">{link.name}</p>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </section>
      <footer className="flex flex-col gap-1">
        <div
          className="flex items-center gap-2.5 text-bg-200 p-2 rounded-lg lg:hover:bg-accent-300 lg:transition-colors"
          title={userEmail}
        >
          <UserCircle className="min-w-7 min-h-7 stroke-bg-50" />
          <p className="text-ellipsis overflow-hidden whitespace-nowrap">{userEmail}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 text-bg-200 p-2 rounded-lg lg:hover:bg-accent-300 w-full lg:transition-colors"
          title="Cerrar sesión"
        >
          <Logout className="min-w-7 min-h-7 stroke-bg-50" />
          <p className="text-ellipsis overflow-hidden whitespace-nowrap">Cerrar sesión</p>
        </button>
      </footer>
    </nav>
  )
}