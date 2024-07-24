import { ProgressType } from "@/src/types/projects/projects"
import clsx from "clsx"
import { ProgressCard } from "./progress-card"

const getData = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/proyecto/avances/${id}`, { cache: 'no-store' })
  const data = await res.json()
  return data as ProgressType[]
}

export const ProgressContainer = async ({
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
            const isLast = data.length - 1 === data.indexOf(item)

            return (
              <li key={item.id}>
                <ProgressCard
                  progress={item} />
                <hr className={clsx("h-[1px] bg-gray-400 bg-opacity-20 w-full border-none outline-none", {
                  "hidden": isLast
                })} />
              </li>
            )
          })
        } 
        {
          data.length === 0 && (
            <p className={`text-text-100 ${className}`}>No hay avances :(</p>
          )
        }
      </ul>
    </>
  )
}