"use client"

import React from "react"
import { Button } from "@medusajs/ui"

type ProfileEmailProps = {
  customer?: {
    id: string
    email?: string
  }
}

const ProfileEmail: React.FC<ProfileEmailProps> = ({ customer }) => {
  return (
    <div className="border border-ui-border-base rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Email</h3>
        <Button variant="secondary" size="small" disabled>
          Editar
        </Button>
      </div>
      <p className="text-ui-fg-base">{customer?.email || "Não informado"}</p>
      <p className="text-sm text-ui-fg-subtle mt-2">
        O email não pode ser alterado após o cadastro
      </p>
    </div>
  )
}

export default ProfileEmail