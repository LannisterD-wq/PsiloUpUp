"use client"

import React, { useState } from "react"
import { Button, Input, Label, Textarea } from "@medusajs/ui"

const TransferRequestForm: React.FC = () => {
  const [formData, setFormData] = useState({
    orderId: "",
    reason: "",
    bankAccount: "",
    pixKey: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Transfer request submitted:", formData)
  }

  return (
    <div className="w-full max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Solicitar Transferência</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <div>
          <Label htmlFor="orderId">Número do Pedido</Label>
          <Input
            id="orderId"
            type="text"
            placeholder="Ex: #1234"
            value={formData.orderId}
            onChange={(e) =>
              setFormData({ ...formData, orderId: e.target.value })
            }
            required
          />
        </div>
        
        <div>
          <Label htmlFor="reason">Motivo da Solicitação</Label>
          <Textarea
            id="reason"
            placeholder="Descreva o motivo da solicitação de transferência"
            value={formData.reason}
            onChange={(e) =>
              setFormData({ ...formData, reason: e.target.value })
            }
            rows={4}
            required
          />
        </div>

        <div>
          <Label htmlFor="pixKey">Chave PIX</Label>
          <Input
            id="pixKey"
            type="text"
            placeholder="Sua chave PIX"
            value={formData.pixKey}
            onChange={(e) =>
              setFormData({ ...formData, pixKey: e.target.value })
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="bankAccount">Dados Bancários (Opcional)</Label>
          <Textarea
            id="bankAccount"
            placeholder="Banco, Agência, Conta"
            value={formData.bankAccount}
            onChange={(e) =>
              setFormData({ ...formData, bankAccount: e.target.value })
            }
            rows={3}
          />
        </div>

        <Button type="submit" className="w-full">
          Enviar Solicitação
        </Button>
      </form>
    </div>
  )
}

export default TransferRequestForm