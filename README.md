# Semilleros unipamplona Web

Prototipo de aplicacion web para el manejo de los semilleros de la Unipamplona.

## Desarrolladores

- [Leider Solano](https://github.com/Leider17)
- [Andres Hernandez](https://github.com/HAndres8)
- [Rubert Gonzalez](https://github.com/rubertg)


/api/proyecto/integrantes/id

type Estudiantes=Database["public"]["Tables"]["Usuario"]["Row"]
type Proyecto=Database["public"]["Tables"]["Proyecto"]["Row"]

interface FetchType {
  proyecto:{
    id:Proyecto["id"],
    nombre:Proyecto["nombre"],
  },
  estudiante:{
    id_estudiante:Estudiantes["id"],
    nombre:Estudiantes["nombre"]
  }

}

/apiproyecto/id

type Proyecto=Database["public"]["Tables"]["Proyecto"]["Row"];

interface FetchType extends Proyecto{
 proyecto:{
  id:Proyecto["id"],
  nombre:Proyecto["nombre"],
  descripcion:Proyecto["descripcion"],
  estado:Proyecto["estado"],
  semillero:Proyecto["id_semillero"],
  tutor:Database["public"]["Tables"]["Usuario"]["Row"],
  carrera:Database["public"]["Tables"]["Carrera"]["Row"]
 }
}