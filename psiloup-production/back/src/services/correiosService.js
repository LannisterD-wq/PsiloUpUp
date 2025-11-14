/**
 * Serviço de cálculo de frete usando API pública dos Correios
 * Baseado no Loja-virtual-master
 * 
 * NÃO precisa de API key - usa WebService público
 * Código e senha só se tiver contrato com Correios
 */

const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');

// CEP de origem (loja)
const ORIGIN_CEP = process.env.SHIPPING_ORIGIN_CEP || '13506742';

// Códigos de serviço dos Correios
const SERVICO_PAC = '41106'; // PAC sem contrato
const SERVICO_SEDEX = '40010'; // SEDEX sem contrato
const SERVICO_PAC_NOVO = '41211'; // PAC (novo código)
const SERVICO_SEDEX_NOVO = '40096'; // SEDEX (novo código)

// Dimensões padrão (em cm)
const DEFAULT_DIMENSIONS = {
  comprimento: 16,
  altura: 5,
  largura: 11,
  diametro: 0,
};

// Peso padrão por produto (em kg)
// Pode ser configurado via variável de ambiente ou usar peso do produto do banco
const DEFAULT_WEIGHT = parseFloat(process.env.PRODUCT_WEIGHT_KG || '0.30');

/**
 * Calcula frete usando API pública dos Correios
 */
async function calculateCorreiosShipping({ destinationCep, items }) {
  try {
    // Calcula peso total
    // Se o item tiver weight_grams, usa ele, senão usa o padrão
    const totalWeight = items.reduce((sum, item) => {
      const itemWeight = item.weight_grams 
        ? (item.weight_grams / 1000) // Converte gramas para kg
        : DEFAULT_WEIGHT;
      return sum + (itemWeight * item.qty);
    }, 0);

    // Formata peso (mínimo 0.3kg, máximo 30kg)
    const formattedWeight = Math.max(0.3, Math.min(30, totalWeight)).toFixed(3);

    // Parâmetros para a API dos Correios
    const params = {
      nCdEmpresa: process.env.CORREIOS_EMPRESA || '', // Código da empresa (opcional)
      sDsSenha: process.env.CORREIOS_SENHA || '', // Senha (opcional)
      sCepOrigem: ORIGIN_CEP,
      sCepDestino: destinationCep.replace(/\D/g, ''),
      nVlPeso: formattedWeight,
      nCdFormato: '1', // 1 = Caixa/Pacote, 2 = Rolo/Prisma, 3 = Envelope
      nVlComprimento: DEFAULT_DIMENSIONS.comprimento,
      nVlAltura: DEFAULT_DIMENSIONS.altura,
      nVlLargura: DEFAULT_DIMENSIONS.largura,
      nVlDiametro: DEFAULT_DIMENSIONS.diametro,
      sCdMaoPropria: 'N', // Mão própria: S ou N
      nVlValorDeclarado: '0', // Valor declarado (0 = não declarar)
      sCdAvisoRecebimento: 'S', // Aviso de recebimento: S ou N
      StrRetorno: 'XML', // Formato de retorno
      nCdServico: `${SERVICO_PAC_NOVO},${SERVICO_SEDEX_NOVO}`, // PAC e SEDEX
    };

    // URL da API dos Correios
    const url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx';
    
    console.log('[Correios] Fazendo requisição:', url);
    console.log('[Correios] Parâmetros:', params);
    
    // Faz requisição
    const response = await axios.get(url, { params, timeout: 10000 });
    
    console.log('[Correios] Status da resposta:', response.status);
    console.log('[Correios] Tamanho da resposta:', response.data?.length);

    // Parse do XML
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '_text',
      parseAttributeValue: true,
      trimValues: true,
    });

    console.log('[Correios] Resposta XML bruta:', response.data.substring(0, 500));
    
    const xmlData = parser.parse(response.data);
    
    console.log('[Correios] XML parseado (estrutura):', {
      hasServicos: !!xmlData?.Servicos,
      hasCServico: !!xmlData?.Servicos?.cServico,
      cServicoType: typeof xmlData?.Servicos?.cServico,
      isArray: Array.isArray(xmlData?.Servicos?.cServico),
    });
    
    // Extrai serviços
    const services = [];
    let servicos = xmlData?.Servicos?.cServico;
    
    // Garante que seja array
    if (!servicos) {
      console.warn('[Correios] Nenhum serviço encontrado no XML');
      servicos = [];
    } else if (!Array.isArray(servicos)) {
      console.log('[Correios] Convertendo serviço único para array');
      servicos = [servicos];
    }
    
    console.log(`[Correios] Total de serviços encontrados: ${servicos.length}`);

    for (const servico of servicos) {
      // Verifica se há erro
      const erro = servico.Erro?._text || servico.Erro || '0';
      if (erro !== '0' && erro !== 0) {
        const msgErro = servico.MsgErro?._text || servico.MsgErro || 'Erro desconhecido';
        console.warn(`Erro no serviço: ${msgErro}`);
        continue;
      }

      const codigo = servico.Codigo?._text || servico.Codigo || '';
      const valor = servico.Valor?._text || servico.Valor || '0';
      const prazo = servico.PrazoEntrega?._text || servico.PrazoEntrega || '0';

      console.log(`[Correios] Serviço ${codigo}: valor="${valor}", prazo="${prazo}"`);

      // Converte valor para centavos
      // O valor vem como "123,45" (vírgula como separador decimal)
      const valorStr = String(valor).replace(',', '.');
      const valorNum = parseFloat(valorStr) || 0;
      const priceCents = Math.round(valorNum * 100);
      
      console.log(`[Correios] Serviço ${codigo}: valorNum=${valorNum}, priceCents=${priceCents}`);

      // Identifica o serviço
      let carrier = 'Correios';
      let name = '';

      if (codigo === SERVICO_PAC_NOVO || codigo === SERVICO_PAC) {
        name = 'PAC';
      } else if (codigo === SERVICO_SEDEX_NOVO || codigo === SERVICO_SEDEX) {
        name = 'SEDEX';
      } else {
        name = `Serviço ${codigo}`;
      }

      const serviceData = {
        carrier,
        name,
        price_cents: priceCents,
        delivery_time_days: parseInt(prazo) || undefined,
        service_code: codigo,
      };
      
      console.log(`[Correios] Adicionando serviço:`, serviceData);
      services.push(serviceData);
    }

    const result = {
      services: services.length > 0 ? services : undefined,
      cost_cents: services.length > 0 ? services[0].price_cents : undefined,
    };
    
    console.log('[Correios] Resultado final:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('Erro ao calcular frete dos Correios:', error.message);
    throw new Error('Falha ao calcular frete. Tente novamente.');
  }
}

module.exports = {
  calculateCorreiosShipping,
};

