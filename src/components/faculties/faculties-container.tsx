import { Database } from "@/src/types/db/supabase";
import { FacultyCard } from "./faculty-card";
import clsx from "clsx";
import { defaultUrl } from "@/src/const/common/consts";

interface Props {
  className?: string;
}

const getData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/facultad`, { cache: 'no-store' });
  const data: Database["public"]["Tables"]["Facultad"]["Row"][] = await res.json();
  return data;
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
          <li key={facultad.id}>
            <>
              <FacultyCard key={facultad.id} faculty={facultad} />
            </>
            <hr className={clsx("h-[1px] bg-gray-400 bg-opacity-20 w-full border-none outline-none", {
              "hidden": isLast
            })} />
          </li>
        )
      })}
    </ul>
  );
}