"use client"

import React, { useState } from "react"
import { Button, Input, Label } from "@medusajs/ui"

type ProfilePhoneProps = {
  customer?: {
    id: string
    phone?: string
  }
}

const ProfilePhone: React.FC<ProfilePhoneProps> = ({ customer }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [phone, setPhone] = useState(customer?.phone || "")

  const handleSave = () => {
    console.log("Saving phone:", phone)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setPhone(customer?.phone || "")
    setIsEditing(false)
  }

  return (
    <div className="border border-ui-border-base rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Telefone</h3>
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
          <div>
            <Label htmlFor="phone">Número de Telefone</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(11) 98765-4321"
            />
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
          {customer?.phone || "Nenhum telefone cadastrado"}
        </p>
      )}
    </div>
  )
}

export default ProfilePhone