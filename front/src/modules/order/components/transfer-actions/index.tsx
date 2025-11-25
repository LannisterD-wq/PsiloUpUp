"use client"

import React from "react"
import { Button } from "@medusajs/ui"
import { useRouter } from "next/navigation"

type TransferActionsProps = {
  orderId: string
  token: string
  onAccept?: () => void
  onDecline?: () => void
}

const TransferActions: React.FC<TransferActionsProps> = ({
  orderId,
  token,
  onAccept,
  onDecline,
}) => {
  const router = useRouter()

  const handleAccept = async () => {
    if (onAccept) {
      onAccept()
    } else {
      router.push(`/order/${orderId}/transfer/${token}/accept`)
    }
  }

  const handleDecline = async () => {
    if (onDecline) {
      onDecline()
    } else {
      router.push(`/order/${orderId}/transfer/${token}/decline`)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button 
        onClick={handleAccept}
        className="min-w-[150px]"
      >
        Aprovar Transferência
      </Button>
      <Button 
        variant="secondary"
        onClick={handleDecline}
        className="min-w-[150px]"
      >
        Recusar Transferência
      </Button>
    </div>
  )
}

export default TransferActions