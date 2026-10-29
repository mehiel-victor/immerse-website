# Especificação de movimento

Padrão da skill: imersão extrema com scroll trigger e animação constante perceptíveis sem clique. Registre abaixo a execução e qualquer exceção explícita ou restrição concreta; não espere um pedido adicional para essas camadas.

Copie e preencha no projeto. Valores devem ser concretos na implementação e ajustados à distância, escala, tarefa e dispositivo. Use “não aplicável” para recursos sem função; não preencha todos só para aumentar a quantidade de efeitos.

## Sistema compartilhado

- Conceito visual que o movimento desenvolve:
- Local dos tokens/componentes de motion existentes ou propostos:
- Convenção de IDs e ligação com a matriz de cobertura:

| Categoria | Token/regra | Valor ou parâmetros | Contexto e restrição |
| --- | --- | --- | --- |
| Duração de feedback | | | |
| Duração de entrada/saída | | | |
| Duração de continuidade/rota | | | |
| Curvas de aceleração/desaceleração ou spring | | | |
| Distância por contexto | | | |
| Escala e origem da transformação | | | |
| Sequenciamento, stagger e duração total | | | |
| Profundidade, rotação e perspectiva | | | |
| Desfoque e condições de uso | | | |

- Ritmo: momentos de impacto, leitura, exploração e conclusão:
- Continuidade: elemento identificado, origem, destino e atributos preservados:
- Gesto: velocidade/direção/intensidade → resposta; limites e amortecimento:
- Rotas: início/fim da transição, foco, scroll, acesso direto e histórico:

## Sequência central: encenação e ensaio

Use para a assinatura ou interação de maior incerteza; integre ao registro existente quando pequeno. Não duplique para cada componente reutilizado.

- Jornada e intenção do visitante:
- Protagonista, região de leitura e elementos que permanecem estáveis:
- Contratos de controle: gesto, transição dirigida, scroll trigger, scrub e/ou loop; propriedades compartilhadas e passagem de controle:
- Scroll trigger: limites de entrada/saída, ação temporizada e política de reentrada; scrub: faixa, progresso e reversão:
- Loop: período/variação, amplitude, continuidade e relação com a leitura; onde aparece sem clique na jornada normal:
- Poses-chave/passagens e riscos de silhueta, oclusão ou enquadramento:

| Momento ou condição do gesto | Foco da atenção / pose | Objeto, câmera, luz, texto e controles | Timing, trajetória, espaçamento e dependência |
| --- | --- | --- | --- |
| Origem utilizável | | | |
| Mudança decisiva / máxima influência | | | |
| Acomodação / destino utilizável | | | |
| Reversão ou nova intenção no meio | | | |

- Gesto → influência → propagação → acomodação: posição/direção/velocidade, raio, limites, dissipação e critério de repouso:
- Antecipação/sobreposição/ação secundária pertinentes; o que omitir e por quê:
- Animatic ou ensaio interativo: acesso, assets representativos, hipótese e falha perceptiva a resolver:
- Como preservar conteúdo e resposta imediata durante o ensaio e a implementação:

## Perfis independentes

| Perfil | Critério de ativação | Amplitude/ritmo ou custo gráfico | Estado preservado |
| --- | --- | --- | --- |
| Intensidade normal | | | |
| Intensidade reduzida | Preferência do usuário/sistema | | |
| Qualidade plena | | | |
| Qualidade econômica | | | |
| Recurso avançado indisponível | | | |

- Como trocar de perfil durante uma interação sem ocultar conteúdo ou perder foco:
- Movimento contínuo/áudio: controle, pausa, preferência e ausência de dependência funcional:

## Ficha de uma animação relevante

Duplique esta ficha por padrão ou momento com comportamento distinto; referencie o mesmo ID para reutilizações.

- ID, nome e componentes/rotas consumidores:
- Função: orientar, revelar, relacionar, responder, enfatizar ou criar atmosfera:
- Gatilho e condições de ativação:
- Estado inicial: propriedades, valores, semântica e disponibilidade do conteúdo:
- Transformação: propriedades, valores/etapas, duração, curva e sequência:
- Estado final: propriedades, foco, semântica e ação disponível:
- Relação com elementos ao redor: quem lidera, quem segue e quem permanece estável; evento/progresso compartilhado:
- Interrupção/repetição: cancelar, retomar ou substituir; estado resultante:
- Reversão: ação que reverte, ponto de partida atual e destino:
- Resposta ao gesto: intensidade, velocidade, direção e limites:
- Mobile/toque: equivalente ao hover/cursor/arrasto e adaptação de composição:
- Movimento reduzido: estado estável ou transição substituta:
- Fallback: comportamento sem a API, mídia ou recurso gráfico:
- Resize/orientação e fontes/imagens tardias: como recalcular sem salto:
- Ciclo de vida: montar, desmontar, pausar, retomar e liberar recursos:
- Técnica escolhida, razão e documentação oficial da API/versão:
- Critério observável de aceite e casos de falha/interrupção:
- Verificação executada, ambiente, resultado e evidência; ou motivo de pendência:

## Revisão temporal e comparação

- Sequência antes/depois: rota, viewport, ações, condições e baseline disponível ou ausente:
- Observação em velocidade normal: leitura, foco, resposta ao gesto, ritmo e repouso:
- Diagnóstico lento/quadro a quadro: tempos, passagens problemáticas, saltos, deriva de pivô e sincronização:
- Gesto lento/rápido/reverso/abandonado e repetição durante acomodação: resultado:
- Permanecer parado para observar o loop; descer/subir, âncora, saída/reentrada e reversão do scroll: resultado:
- Scroll e loop simultâneos, com gesto quando aplicável; legibilidade, custo, pausa/reduzido e suspensão/retorno fora de tela: resultado:
- Falha perceptiva → decisão de correção → diferença observada novamente em velocidade normal:
- Fluidez/latência: método, aparelho/renderer, condições, picos e limitações; distinguir medido de inferido:
- Evidência temporal e limites da aprovação; variações da sequência nas demais famílias:
