import { Database } from "@/src/types/db/supabase";
import { ExternalLink } from "../common/icons";
import Link from "next/link";

interface Props {
  faculty: Database["public"]["Tables"]["Facultad"]["Row"];
}

export const FacultyCard = ({
  faculty: { id, nombre }
}: Props) => {
  return (
    <Link
      className="flex items-center justify-between lg:px-3.5 py-2.5 gap-1 lg:hover:bg-bg-200 rounded-lg"
      href={`/facultades/${id}`}>
      <p className="text-text-100 lg:text-lg font-medium">{nombre}</p>
      <ExternalLink className="stroke-text-300 w-5 h-5" />
    </Link>
  );
}