import React from "react"

type TransferImageProps = {
  imageUrl?: string
  orderId?: string
}

const TransferImage: React.FC<TransferImageProps> = ({ imageUrl, orderId }) => {
  if (!imageUrl) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="border-2 border-dashed border-ui-border-base rounded-lg p-8 text-center">
          <p className="text-ui-fg-subtle">
            Nenhuma imagem de comprovante disponível
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">
        Comprovante de Transferência
      </h3>
      <div className="border border-ui-border-base rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={`Comprovante do pedido ${orderId}`}
          className="w-full h-auto"
        />
      </div>
      <p className="text-sm text-ui-fg-subtle mt-2">
        Pedido #{orderId}
      </p>
    </div>
  )
}

export default TransferImage