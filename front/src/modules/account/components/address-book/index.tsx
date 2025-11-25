"use client"

import React from "react"
import { Button } from "@medusajs/ui"

type Address = {
  id: string
  first_name?: string
  last_name?: string
  address_1?: string
  address_2?: string
  city?: string
  postal_code?: string
  province?: string
  country_code?: string
  phone?: string
}

type AddressBookProps = {
  customer?: {
    shipping_addresses?: Address[]
  }
}

const AddressBook: React.FC<AddressBookProps> = ({ customer }) => {
  const addresses = customer?.shipping_addresses || []

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Endereços salvos</h2>
        <Button variant="secondary">Adicionar endereço</Button>
      </div>
      
      {addresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-ui-fg-base mb-4">Nenhum endereço salvo</p>
          <p className="text-ui-fg-subtle text-sm">
            Adicione um endereço para facilitar suas compras futuras
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="border border-ui-border-base rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm">
                  <p className="font-medium">
                    {address.first_name} {address.last_name}
                  </p>
                  <p className="text-ui-fg-subtle">
                    {address.address_1}
                    {address.address_2 && `, ${address.address_2}`}
                  </p>
                  <p className="text-ui-fg-subtle">
                    {address.city}, {address.province} {address.postal_code}
                  </p>
                  {address.phone && (
                    <p className="text-ui-fg-subtle">Tel: {address.phone}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="small">
                    Editar
                  </Button>
                  <Button variant="secondary" size="small">
                    Remover
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AddressBook