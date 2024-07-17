"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { ChevronsRight, Home, Logout, Menu, Persons, UserCircle } from "../../common/icons"
import Link from "next/link"
import clsx from "clsx"

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
  const { id } = useParams()

  if (!id) return null

  const handleOpenMenu = () => setOpen(!open)

  return (
    <nav className={clsx("fixed bg-accent-200 h-full top-0 left-0 px-1 py-1 pb-3 flex flex-col justify-between overflow-hidden w-[3.25rem] transition-all", {
      "w-56": open
    })}>
      <section>
        <button
          className="p-2"
          onClick={handleOpenMenu}
        >
          <Menu className="w-7 h-7 stroke-bg-50" />
        </button>
        <ul className="mt-5 flex flex-col">
          {
            links.map(link => {
              return (
                <li key={link.name}>
                  <Link
                    className="flex items-center gap-2.5 text-bg-200 p-2 rounded-lg lg:hover:bg-accent-300 lg:transition-colors"
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
      <footer className="flex flex-col">
        <div
          className="flex items-center gap-2.5 text-bg-200 p-2 rounded-lg lg:hover:bg-accent-300 lg:transition-colors"
          title="Nombre del usuario"
        >
          <UserCircle className="min-w-7 min-h-7 stroke-bg-50" />
          <p className="text-ellipsis overflow-hidden whitespace-nowrap">Nombre del usuario</p>
        </div>
        <button
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