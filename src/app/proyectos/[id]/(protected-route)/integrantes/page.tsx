interface Props {
  params: {
    id: string
  }
}

export default function MembersPage({ 
  params: { id } 
}: Props) {
  return (
    <div>Proyecto con id { id } en la seccion de integrantes</div>
  )
}