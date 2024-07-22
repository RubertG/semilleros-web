interface Props {
  params: {
    id: string
  }
}

export default function ProgressPage({ 
  params: { id } 
}: Props) {
  return (
    <div>Proyecto con id { id } en la seccion de avances</div>
  )
}