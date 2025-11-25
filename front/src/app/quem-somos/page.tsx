import Header from "@modules/layout/components/header"

export default function QuemSomosPage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero hero--catalog">
          <div className="container">
            <header className="hero__catalog-header">
              <h1>Quem Somos</h1>
              <p>Conheça nossa história, propósito e o que nos move a criar blends de alta performance com transparência e responsabilidade.</p>
            </header>
          </div>
        </section>

        <section className="section section--light">
          <div className="container grid-split">
            <div className="grid-split__media">
              {/* Substitua VIDEO_ID pelo ID do seu vídeo do YouTube */}
              <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/VIDEO_ID?rel=0&modestbranding=1" 
                title="PsiloUp - Quem Somos" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="grid-split__text" style={{ background: "transparent", padding: "0" }}>
              <h2>Nossa história</h2>
              <p>
                PsiloUp nasceu da união entre ciência de ingredientes e respeito à individualidade biológica. Nosso compromisso é construir blends que elevem a performance de forma sustentável, com traço de qualidade e origem rastreável.
              </p>
              <p>
                Cada fórmula é pensada para resolver demandas reais do dia a dia: foco limpo, energia estável e clareza mental — evitando picos de ansiedade ou queda abrupta de desempenho. Por isso, trabalhamos com extratos padronizados, controle de qualidade contínuo e entrega rápida rastreada.
              </p>
              <p>
                Valorizamos a transparência: indicamos a origem dos ingredientes, explicamos a sinergia entre eles e orientamos o uso estratégico para que você extraia o melhor resultado, no trabalho, no treino ou em competição.
              </p>
              <p>
                Nossa missão é simples: entregar performance inteligente, com respeito ao corpo e à mente.
              </p>
              <p>
                Quer saber mais sobre os ingredientes e como usar? Visite a página de <a href="/formulacao">Formulação</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="container hero__catalog">
          <div style={{ background: "transparent", border: "none", boxShadow: "none", padding: "0" }}>
            <h2 style={{ marginBottom: "1rem" }}>Conheça os produtos e preços</h2>
            <p style={{ marginBottom: "1rem" }}>
              Explore nossos packs e encontre o blend ideal para seu objetivo. Acesse a vitrine abaixo.
            </p>
            <p>
              <a href="/#packs" className="button button--primary">Ir para produtos</a>
            </p>
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
