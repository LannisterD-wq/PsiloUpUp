# Configuração de Peso dos Produtos

## Peso Atual
- **Peso padrão por produto**: 0.30 kg (300g)
- **Localização**: `back/src/services/correiosService.js`

## Como Alterar

### Opção 1: Variável de Ambiente
Adicione no `.env`:
```
PRODUCT_WEIGHT_KG=0.30
```

### Opção 2: Cadastro de Produtos (Recomendado)
Para ter pesos diferentes por produto, você precisa:

1. **Adicionar campo `weightGrams` na tabela `products`**:
```sql
ALTER TABLE products ADD COLUMN weightGrams INTEGER DEFAULT 300;
```

2. **Atualizar produtos existentes**:
```sql
UPDATE products SET weightGrams = 300 WHERE weightGrams IS NULL;
```

3. **O sistema já está preparado** para usar `product.weightGrams` se disponível!

## Dimensões Padrão
- **Comprimento**: 16 cm
- **Altura**: 5 cm
- **Largura**: 11 cm
- **Diâmetro**: 0 cm (não usado)
- **Formato**: 1 (Caixa/Pacote)

## Nota
O sistema usa o peso do produto do banco de dados se disponível, caso contrário usa 0.30kg por padrão.


