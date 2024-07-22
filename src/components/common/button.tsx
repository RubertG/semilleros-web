import Link from "next/link"
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const Button = ({ children, className, ...props }: Props) => (
  <button
    className={`px-4 py-2 rounded-lg lg:text-lg bg-primary-100 ${className}`}
    {...props}
  >
    {children}
  </button>
)

interface PropsLink extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
}

export const ButtonLink = ({ children, className, href, ...props }: PropsLink) => (
  <Link
    href={href || "#"}
    className={`px-4 py-1.5 rounded-lg bg-primary-100 text-bg-50 lg:hover:bg-accent-200 lg:transition-colors ${className}`}
    {...props}
  >
    {children}
  </Link>
)