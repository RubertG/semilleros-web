import { defaultUrl } from "@/src/app/layout";
import { Database } from "@/src/types/db/supabase";
import { FacultyCard } from "./faculty-card";
import clsx from "clsx";

interface Props {
  className?: string;
}

const getData = async () => {
  const res = await fetch(`${defaultUrl}/api/facultad`, { cache: 'no-store' });
  return res.json() as Promise<Database["public"]["Tables"]["Facultad"]["Row"][]> | null;
};

export const FacultiesContainer = async ({ className }: Props) => {
  const data = await getData();

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