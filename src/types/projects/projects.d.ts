type Estudiantes = Database["public"]["Tables"]["Usuario"]["Row"] 
type Proyecto = Database["public"]["Tables"]["Proyecto"]["Row"]

export interface FetchType {
  proyecto: { 
    id: Proyecto["id"], 
    nombre: Proyecto["nombre"], 
  }, 
  estudiante: { 
    id: Estudiantes["id"], 
    nombre: Estudiantes["nombre"] ,
    correo: Estudiantes["correo"]
  }
}
