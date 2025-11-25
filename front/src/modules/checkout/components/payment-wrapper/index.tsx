"use client"

import React from "react"

type Props = {
  children?: React.ReactNode
}

export default function PaymentWrapper({ children }: Props) {
  return <div className="payment-wrapper">{children ?? null}</div>
}
