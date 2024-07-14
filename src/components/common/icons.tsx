interface Props {
  className?: string
}

export const Selector = ({ className }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`icon icon-tabler icons-tabler-outline icon-tabler-selector ${className}`}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 9l4 -4l4 4" /><path d="M16 15l-4 4l-4 -4" /></svg>
  )
}