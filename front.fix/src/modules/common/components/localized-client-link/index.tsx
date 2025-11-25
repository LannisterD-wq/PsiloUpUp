"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"

type LocalizedClientLinkProps = {
  children?: React.ReactNode
  href: string
  className?: string
  onClick?: () => void
  passHref?: boolean
  [key: string]: any
}

const LocalizedClientLink = ({
  children,
  href,
  className,
  onClick,
  ...props
}: LocalizedClientLinkProps) => {
  const params = useParams()
  const countryCode = params?.countryCode as string | undefined

  const localizedHref = countryCode ? `/${countryCode}${href}` : href

  return (
    <Link href={localizedHref} className={className} onClick={onClick} {...props}>
      {children}
    </Link>
  )
}

export default LocalizedClientLink
