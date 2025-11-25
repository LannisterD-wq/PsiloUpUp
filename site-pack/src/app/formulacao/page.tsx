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
              <img src="/images/burn-mind-sem-fundo.png" alt="Stack Duplo" />
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
      </main>
    </>
  )
}
