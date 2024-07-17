"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { ChevronsRight, Home, Logout, Menu, Persons, UserCircle } from "../../common/icons"
import Link from "next/link"

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
    <nav className="fixed bg-accent-200 h-full top-0 left-0">
      <button
        onClick={handleOpenMenu}
      >
        <Menu className="w-7 h-7 stroke-bg-50" />
      </button>
      <ul>
        {
          links.map(link => {
            return (
              <li key={link.name}>
                <Link
                  className="flex items-center gap-2.5 "
                  title={`Ir a la sección de ${link.name}`}
                  href={`/proyectos/${id}${link.path}`}
                >
                  <picture>{link.icon}</picture>
                  <p>{link.name}</p>
                </Link>
              </li>
            )
          })
        }
      </ul>
      <footer>
        <div>
          <UserCircle />
          <p>Nombre del usuario</p>
        </div>
        <div>
          <Logout />
          Cerrar sesión
        </div>
      </footer>
    </nav>
  )
}