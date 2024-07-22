import { ProjectType } from "@/src/types/faculties/faculties"
import Link from "next/link"

interface Props {
  className?: string
  projects: ProjectType[]
}

export const ProjectContainer = ({
  className,
  projects
}: Props) => {
  return (
    <>
      {
        projects.length === 0 && (
          <section className={className}>
            <p className="text-text-100 text-center">No hay proyectos creados en esta facultad</p>
            <p className="text-text-100 text-center">:(</p>
          </section>
        )
      }
      <ul className={`grid grid-cols-1 gap-3 md:gap-1 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
        {
          projects.map((project) => {
            return (
              <li
                className="lg:px-3.5 lg:py-2.5 lg:hover:bg-bg-200 overflow-hidden rounded-lg"
                key={project.id}>
                <h2
                  title={project.nombre}
                  className="text-lg font-medium text-text-50 text-ellipsis overflow-hidden whitespace-nowrap">
                  {project.nombre}
                </h2>
                <p
                  className="text-text-300 text-sm text-ellipsis overflow-hidden whitespace-nowrap mt-1"
                >{project.carrera.nombre}</p>
                <p
                  className="text-text-300 text-sm text-ellipsis overflow-hidden whitespace-nowrap"
                >{project.tutor.nombre}</p>
                <Link
                  className="text-text-300 font-medium hover:underline text-sm mt-1"
                  href={`/proyectos/${project.id}`}>
                  Ver más
                </Link>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}