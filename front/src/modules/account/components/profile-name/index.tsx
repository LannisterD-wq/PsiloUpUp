"use client"

import React, { useState } from "react"
import { Button, Input, Label } from "@medusajs/ui"

type ProfileNameProps = {
  customer?: {
    id: string
    first_name?: string
    last_name?: string
  }
}

const ProfileName: React.FC<ProfileNameProps> = ({ customer }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [firstName, setFirstName] = useState(customer?.first_name || "")
  const [lastName, setLastName] = useState(customer?.last_name || "")

  const handleSave = () => {
    console.log("Saving name:", { firstName, lastName })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFirstName(customer?.first_name || "")
    setLastName(customer?.last_name || "")
    setIsEditing(false)
  }

  return (
    <div className="border border-ui-border-base rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Nome</h3>
        {!isEditing && (
          <Button
            variant="secondary"
            size="small"
            onClick={() => setIsEditing(true)}
          >
            Editar
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Nome</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Sobrenome</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave}>Salvar</Button>
            <Button variant="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-ui-fg-base">
          {customer?.first_name || customer?.last_name
            ? `${customer.first_name || ""} ${customer.last_name || ""}`.trim()
            : "Nome não informado"}
        </p>
      )}
    </div>
  )
}

export default ProfileName