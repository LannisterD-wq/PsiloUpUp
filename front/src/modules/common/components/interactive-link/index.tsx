"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowUpRightMini } from "@medusajs/icons"

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
}

const InteractiveLink = ({
  href,
  children = "Ver detalhes",
  onClick,
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      className="flex gap-x-1 items-center group text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
      href={href}
      onClick={onClick}
      {...props}
    >
      <span>{children}</span>
      <ArrowUpRightMini
        className="group-hover:rotate-45 ease-in-out duration-150"
        color="var(--fg-interactive)"
      />
    </LocalizedClientLink>
  )
}

export default InteractiveLink