import React from "react"
import { Spinner as UISpinner } from "@medusajs/icons"

const Spinner = (props: React.ComponentProps<typeof UISpinner>) => {
  return <UISpinner className="animate-spin" {...props} />
}

export default Spinner