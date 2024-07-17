interface Props {
  params: {
    id: string
  }
}

export default function ProjectPage({
  params: { id }
}: Props) {
  return (
    <div>Proyecto con id { id }</div>
  )
}