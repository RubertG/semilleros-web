interface Props {
  params: {
    id: string
  }
}

export default function AvancesPage({ 
  params: { id } 
}: Props) {
  return (
    <div>Proyecto con id { id } en la seccion de avances</div>
  )
}