import { defaultUrl } from "@/src/const/common/consts"
import { FetchType } from "@/src/types/projects/projects"
import { MembersCard } from "./members-card"
import clsx from "clsx"

const getData = async (id: string) => {
  const res = await fetch(`${defaultUrl}/api/proyecto/integrantes/${id}`, { cache: 'no-store' })
  const data = await res.json()
  return data as FetchType[]
}

export const MembersContainer = async ({
  className, id
}: {
  className?: string
  id: string
}) => {
  const data = await getData(id)

  return (
    <>
      <ul className={`flex flex-col gap-1 ${className}`}>
        {
          data.map((item) => {
            const { estudiante, proyecto } = item
            const isLast = data.length - 1 === data.indexOf(item)

            return (
              <li key={estudiante.id}>
                <MembersCard
                  estudiante={estudiante}
                  proyecto={proyecto} />
                <hr className={clsx("h-[1px] bg-gray-400 bg-opacity-20 w-full border-none outline-none", {
                  "hidden": isLast
                })} />
              </li>
            )
          })
        }
        {
          data.length === 0 && (
            <p className={`text-text-100 ${className}`}>No hay integrantes :(</p>
          )
        }
      </ul>
    </>

  )
}