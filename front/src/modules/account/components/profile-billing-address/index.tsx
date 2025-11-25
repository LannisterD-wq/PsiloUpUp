"use client"

import React, { useState } from "react"
import { Button, Input, Label } from "@medusajs/ui"

type Address = {
  first_name?: string
  last_name?: string
  company?: string
  address_1?: string
  address_2?: string
  city?: string
  country_code?: string
  province?: string
  postal_code?: string
  phone?: string
}

type ProfileBillingAddressProps = {
  customer?: {
    id: string
    billing_address?: Address | null
  }
}

const ProfileBillingAddress: React.FC<ProfileBillingAddressProps> = ({ 
  customer 
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [address, setAddress] = useState<Address>(
    customer?.billing_address || {}
  )

  const handleSave = () => {
    console.log("Saving billing address:", address)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setAddress(customer?.billing_address || {})
    setIsEditing(false)
  }

  const handleChange = (field: keyof Address) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddress({ ...address, [field]: e.target.value })
  }

  return (
    <div className="border border-ui-border-base rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Endereço de Cobrança</h3>
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
              <Label htmlFor="first_name">Nome</Label>
              <Input
                id="first_name"
                value={address.first_name || ""}
                onChange={handleChange("first_name")}
              />
            </div>
            <div>
              <Label htmlFor="last_name">Sobrenome</Label>
              <Input
                id="last_name"
                value={address.last_name || ""}
                onChange={handleChange("last_name")}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="company">Empresa (Opcional)</Label>
            <Input
              id="company"
              value={address.company || ""}
              onChange={handleChange("company")}
            />
          </div>

          <div>
            <Label htmlFor="address_1">Endereço</Label>
            <Input
              id="address_1"
              value={address.address_1 || ""}
              onChange={handleChange("address_1")}
              placeholder="Rua, número"
            />
          </div>

          <div>
            <Label htmlFor="address_2">Complemento (Opcional)</Label>
            <Input
              id="address_2"
              value={address.address_2 || ""}
              onChange={handleChange("address_2")}
              placeholder="Apartamento, bloco, etc."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="postal_code">CEP</Label>
              <Input
                id="postal_code"
                value={address.postal_code || ""}
                onChange={handleChange("postal_code")}
                placeholder="00000-000"
              />
            </div>
            <div>
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={address.city || ""}
                onChange={handleChange("city")}
              />
            </div>
            <div>
              <Label htmlFor="province">Estado</Label>
              <Input
                id="province"
                value={address.province || ""}
                onChange={handleChange("province")}
                placeholder="SP"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              type="tel"
              value={address.phone || ""}
              onChange={handleChange("phone")}
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
        <div>
          {customer?.billing_address ? (
            <div className="text-sm space-y-1">
              <p className="font-medium">
                {address.first_name} {address.last_name}
              </p>
              {address.company && (
                <p className="text-ui-fg-subtle">{address.company}</p>
              )}
              <p className="text-ui-fg-subtle">{address.address_1}</p>
              {address.address_2 && (
                <p className="text-ui-fg-subtle">{address.address_2}</p>
              )}
              <p className="text-ui-fg-subtle">
                {address.city}, {address.province} {address.postal_code}
              </p>
              {address.phone && (
                <p className="text-ui-fg-subtle">Tel: {address.phone}</p>
              )}
            </div>
          ) : (
            <p className="text-ui-fg-subtle">
              Nenhum endereço de cobrança cadastrado
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default ProfileBillingAddress