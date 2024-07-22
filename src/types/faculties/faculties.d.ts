import { Database } from "../db/supabase"

type ProjectDB = Database["public"]["Tables"]["Proyecto"]["Row"]
export type Faculty = Database["public"]["Tables"]["Facultad"]["Row"]

export interface ProjectType {
  id: ProjectDB["id"]
  nombre: ProjectDB["nombre"]
  descripcion: ProjectDB["descripcion"]
  estado: ProjectDB["estado"]
  tutor: Database["public"]["Tables"]["Usuario"]["Row"]
  carrera: Database["public"]["Tables"]["Carrera"]["Row"]
}
  