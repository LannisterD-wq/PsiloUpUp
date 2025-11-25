import React from "react"
import { clx } from "@medusajs/ui"

const Divider = ({ className }: { className?: string }) => {
  return (
    <div
      className={clx("h-px w-full border-b border-gray-200 mt-1", className)}
    />
  )
}

export default Divider
