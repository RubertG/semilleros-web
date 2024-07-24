"use client";

import { ProgressType } from "@/src/types/projects/projects";
import { SquareMinus } from "../../common/icons";
import { defaultUrl } from "@/src/const/common/consts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Database } from "@/src/types/db/supabase";
import { getRol } from "@/src/utils/supabase/get-rol-client";

interface Props {
  progress: ProgressType;
}

export const ProgressCard = ({ progress }: Props) => {
  const router = useRouter();
  const [rol, setRol] = useState<{
    rol: Database["public"]["Enums"]["rol"] | null;
    inProject: boolean;
  }>({
    rol: null,
    inProject: false,
  });

  useEffect(() => {
    const getR = async () => {
      const rol = await getRol({ idProject: progress.id_proyecto });
      setRol(rol);
    };
    getR();
  }, []);

  const handleDelete = async () => {
    const res = await fetch(
      `${defaultUrl}/api/proyecto/avances/${progress.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: progress.id,
        }),
      }
    );

    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <article className="flex items-center justify-between px-3.5 py-2.5 mb-1 lg:hover:bg-bg-200 rounded-lg lg:transition-colors">
      <div className="text-ellipsis overflow-hidden whitespace-nowrap">
        <p className="text-text-100 font-medium">{progress.nombre}</p>
        <p className="text-sm text-text-300">
          {new Date(progress.fecha).toLocaleDateString("es-ES", {
            month: "long",
            year: "numeric",
            day: "numeric",
          })}
        </p>
      </div>
      {rol.rol === "tutor" && (
        <button className="text-text-300" onClick={handleDelete}>
          <SquareMinus />
        </button>
      )}
    </article>
  );
};
