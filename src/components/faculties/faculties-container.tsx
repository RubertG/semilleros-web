import { defaultUrl } from "@/src/app/layout";
import { Database } from "@/src/types/db/supabase";
import { FacultyCard } from "./faculty-card";
import clsx from "clsx";

interface Props {
  className?: string;
}

export const revalidate = 3600;

type Data = Database["public"]["Tables"]["Facultad"]["Row"][];

export const FacultiesContainer = async ({ className }: Props) => {
  const res = await fetch(`${defaultUrl}/api/facultad`);

  const data = await res.json() as Data | null;

  if (!data) {
    return (
      <p className={`text-text-100 text-center ${className}`}>Ocurrió un error al traer los datos</p>
    )
  }

  return (
    <ul className={`flex flex-col gap-1 ${className}`}>
      {data.map((facultad, index) => {
        const isLast = index === data.length - 1;

        return (
          <>
            <li key={facultad.id}>
              <FacultyCard key={facultad.id} faculty={facultad} />
            </li>
            <hr className={clsx("h-[1px] bg-gray-400 bg-opacity-20 w-full border-none outline-none", {
              "hidden": isLast
            })} />
          </>
        )
      })}
    </ul>
  );
}