interface Props {
  params: {
    id: string
  }
}

export default function ProjectsFacultyPage({
  params: { id }
}: Props) {
  return (
    <div>Proyectos de la facultad con id { id }</div>
  )
}