import Header from "@modules/layout/components/header"

export default function FormulacaoPage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero hero--catalog">
          <div className="container">
            <header className="hero__catalog-header">
              <h1>Formulação e História</h1>
              <p>Conheça a origem de cada ingrediente, o processo de formulação e a história por trás das nossas blends.</p>
            </header>
          </div>
        </section>

        {/* Produtos com fórmula detalhada */}
        <section className="container">
          <div className="bundle-grid">
            {/* UP MIND */}
            <article className="bundle-card bundle-card--highlight">
              <img src="/images/MIND-removebg-preview.png" alt="UP MIND" />
              <h3>UP MIND • Focus Core Blend™</h3>
              <p>Original: Focus Core Blend™ — Português: Núcleo de Foco. Combina adaptógenos e nootrópicos para clareza mental sem ansiedade.</p>
              <div className="ingredient-table__wrap">
                <table className="ingredient-table ingredient-table--mind">
                  <thead>
                    <tr>
                      <th>Ingrediente</th>
                      <th>Origem</th>
                      <th>Efeito</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Lion's Mane (Hericium erinaceus)</td>
                      <td>Japão/China</td>
                      <td>Neuroplasticidade, memória e foco limpo</td>
                    </tr>
                    <tr>
                      <td>Ashwagandha (Withania somnifera)</td>
                      <td>Índia</td>
                      <td>Estabilidade emocional e redução do estresse</td>
                    </tr>
                    <tr>
                      <td>Bacopa monnieri</td>
                      <td>Índia</td>
                      <td>Aprendizagem e retenção</td>
                    </tr>
                    <tr>
                      <td>Schisandra chinensis</td>
                      <td>China/Rússia</td>
                      <td>Resistência ao estresse e equilíbrio</td>
                    </tr>
                    <tr>
                      <td>Cordyceps militaris</td>
                      <td>Cultivo controlado (Ásia)</td>
                      <td>Energia celular para foco sustentado</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="note">Sinergia: equilíbrio entre calmantes e energizantes para foco limpo, evitando picos de ansiedade.</p>
            </article>

            {/* UP BURN */}
            <article className="bundle-card">
              <img src="/images/BURN-removebg-preview.png" alt="UP BURN" />
              <h3>UP BURN • Energy Flow System™</h3>
              <p>Original: Energy Flow System™ — Português: Sistema de Fluxo de Energia. Foco em energia celular constante e termogênese equilibrada.</p>
              <div className="ingredient-table__wrap">
                <table className="ingredient-table ingredient-table--burn">
                  <thead>
                    <tr>
                      <th>Ingrediente</th>
                      <th>Origem</th>
                      <th>Efeito</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Cordyceps militaris</td>
                      <td>Cultivo controlado (Ásia)</td>
                      <td>Desempenho, produção de ATP</td>
                    </tr>
                    <tr>
                      <td>Maca (Lepidium meyenii)</td>
                      <td>Peru (Andes)</td>
                      <td>Vigor físico e estabilidade hormonal</td>
                    </tr>
                    <tr>
                      <td>Guaraná nativo (Paullinia cupana)</td>
                      <td>Brasil (Amazônia)</td>
                      <td>Energia limpa sem taquicardia</td>
                    </tr>
                    <tr>
                      <td>Gynostemma (Jiaogulan)</td>
                      <td>China/Sudeste Asiático</td>
                      <td>Homeostase metabólica</td>
                    </tr>
                    <tr>
                      <td>Shilajit (Asphaltum)</td>
                      <td>Himalaias</td>
                      <td>Suporte mitocondrial, recuperação</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="note">Sinergia: energia estável ao longo do dia com suporte mitocondrial e controle do estresse.</p>
            </article>
          </div>
        </section>

        {/* Como combinam e agem */}
        <section className="section section--light">
          <div className="container grid-split">
            <div className="grid-split__media">
              <img src="/images/Stack_Duplo-removebg-preview.png" alt="Stack Duplo" />
            </div>
            <div className="grid-split__text">
              <h2>Como as fórmulas se combinam e agem</h2>
              <p>UP MIND otimiza foco e memória enquanto mantém a ansiedade sob controle. UP BURN sustenta energia celular e o metabolismo. Juntas, entregam um estado de performance estável e sustentável.</p>
              <ul className="grid-list">
                <li>Compatibilidade: cada ingrediente foi selecionado por sinergia — efeito somatório sem sobrecarga.</li>
                <li>Padronização: extratos com laudos e QR code de rastreio.</li>
                <li>Cápsulas vegetais nº 00 para melhor dissolução.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Processo de Formulação */}
        <section className="container hero__catalog">
          <div className="bundle-card">
            <h2>Processo de Formulação</h2>
            <ul>
              <li>Padronização por extratos com laudos técnicos por lote.</li>
              <li>Compatibilidade entre ingredientes e sinergias estudadas.</li>
              <li>Testes de estabilidade e segurança em cápsulas vegetais nº 00.</li>
              <li>Rastreabilidade com QR code e documentação.</li>
            </ul>
          </div>
        </section>

        {/* Recomendações de uso */}
        <section className="section">
          <div className="container">
            <h2>Recomendações de uso: um por vez, com estratégia</h2>
            <p>
              Para a maioria dos dias, o ideal é utilizar apenas <strong>um blend por dia</strong>, escolhendo conforme sua demanda: <strong>UP MIND</strong> para foco sustentado e clareza mental, ou <strong>UP BURN</strong> para energia celular e metabolismo ativo. Em uso simultâneo e cotidiano, os efeitos podem se <strong>anular parcialmente</strong> (calmantes vs. energizantes). No entanto, com estratégia, é possível combinar.
            </p>
            <ul className="grid-list">
              <li><strong>Competição ou prova:</strong> tome <strong>UP MIND</strong> bem cedo para foco limpo e estabilidade emocional, e <strong>UP BURN</strong> no <strong>pré-competição</strong> (30–45 min antes) para energia e disposição.</li>
              <li><strong>Rotina de trabalho/criação:</strong> prefira <strong>UP MIND</strong> pela manhã. Reserve <strong>UP BURN</strong> para treinos ou dias de alta demanda física.</li>
              <li><strong>Horário recomendado:</strong> manhã, com água e refeição leve. Evite usar ambos diariamente ao mesmo tempo.</li>
              <li><strong>Hidratação e alimentação:</strong> mantenha boa hidratação e alimentação equilibrada para melhor absorção.</li>
              <li><strong>Individualidade biológica:</strong> ajuste conforme sensibilidade pessoal. Em caso de condições específicas, consulte um profissional de saúde.</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="wrapper style1-alt">
        <div className="inner">
          <ul className="menu">
            <li>&copy; PsiloUp. Todos os direitos reservados.</li>
          </ul>
        </div>
      </footer>
    </>
  )
}
