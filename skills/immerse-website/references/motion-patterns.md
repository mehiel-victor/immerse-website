# Direção, sistema e repertório de movimento

Use ao conceber e refinar a animação, sobretudo em pedidos de qualidade profissional ou imersão extrema. A [especificação](../assets/templates/motion-spec.md) registra padrões e assinaturas; não crie uma ficha para cada hover idêntico. A direção deve existir no movimento observado, não apenas nos nomes dos efeitos.

## Encenação antes da interpolação

Defina para a sequência central o que o visitante deve acompanhar em cada momento: protagonista, informação secundária, região de leitura e destino da atenção. Planeje enquadramento, escala, silhueta, contraste e oclusões ao longo do percurso. Mover tudo com a mesma relevância produz competição, mesmo com curvas suaves.

Desenhe ou implemente **poses-chave e passagens importantes** antes do acabamento: origem, mudança decisiva e repouso, incluindo situações intermediárias em que a composição pode se desfazer. Em personagens ou objetos, pose significa forma/orientação; em UI, significa organização visual e estado utilizável. Para câmera, verifique trajetória, alvo e enquadramento juntos: uma curva espacial suave pode atravessar objetos ou perder o assunto.

Prove o ritmo em um **animatic ou ensaio interativo curto** com assets representativos. Uma ação dirigida pode usar uma sequência temporizada; manipulação direta precisa de ensaio com gesto lento, rápido, reverso, interrompido e solto. Esboços servem para encontrar ritmo e trajetória, mas o aceite visual final exige a execução representativa. Integre esse ensaio à fatia executável existente, sem inventar uma fase documental extensa.

## Timing, espaçamento e causalidade

Escolha os princípios pertinentes à marca, ao material e à intenção; não aplique uma lista de princípios mecanicamente.

| Decisão | Como dirigir | Falha a procurar em execução |
| --- | --- | --- |
| Timing e espaçamento | Defina quando algo começa, quanto percorre por intervalo e como chega ao destino; varie por papel, distância e massa sugerida | Tudo inicia/para junto; deslocamentos parecem flutuar ou arrastar; fim sem repouso definido |
| Antecipação, ação e acomodação | Prepare a atenção quando necessário, execute a mudança e deixe a resposta secundária resolver; feedback da intenção é imediato | Espera teatral antes de responder, overshoot gratuito ou vibração que nunca se encerra |
| Arcos e pivôs | Use trajetórias e pontos de articulação coerentes; preserve relações físicas ou gráficas reconhecíveis | Câmera corta o protagonista, articulação desliza da base, objeto gira em eixo arbitrário |
| Sobreposição e ação secundária | A causa lidera; partes dependentes seguem com atraso/amplitude próprios e acomodam depois | Movimento secundário compete com o principal; ondas uniformes sem relação com o gesto |
| Ritmo e pausas | Contraste passagem, impacto e repouso; organize pequenos grupos por função e limite o atraso acumulado | Mesmo fade/stagger em todo bloco; texto continua viajando enquanto precisa ser lido |

Em manipulação expressiva, descreva a cadeia **gesto → contato/influência → propagação → acomodação**. Relacione posição, direção e velocidade à resposta local; delimite raio de influência, saturação, resistência/amortecimento e retorno. Deixe visível a relação entre onde a pessoa age e o que muda. Uma força global ligada apenas à posição do ponteiro pode parecer um loop decorativo. Uma brisa que alcança formas próximas antes das distantes é um exemplo possível, não uma exigência para outros conceitos.

## Contratos de controle

**Gesto contínuo:** o estado visual acompanha a intenção corrente. Priorize latência, previsibilidade e continuidade de posição/velocidade; suavização excessiva cria distância entre mão e resposta. Ao soltar, interromper ou sair, decida se a ação mantém o estado, retorna ou dissipa energia. Defina limites e acomodação, inclusive para gesto repetido antes do repouso. Se usar simulação, atualize por tempo e trate intervalos longos de quadro sem explosão ou salto.

**Transição dirigida:** uma seleção ou mudança de contexto tem início, passagem e destino. Especifique duração e curvas por fase, ou parâmetros físicos com condição de repouso. Nova intenção redireciona a partir do estado corrente, reverte ou conclui imediatamente conforme o contrato; não acumule filas. Não aplique automaticamente o mesmo amortecimento de arrasto a câmera, títulos, luz e navegação.

Um sistema pode combinar os dois: o gesto controla o objeto e, ao selecionar, uma sequência organiza seu aprofundamento. Defina claramente a passagem de controle e preserve continuidade. A navegação e os dados comandam a intenção; cancelar animação não cancela silenciosamente uma operação real.

### Rolagem e movimento ambiental

| Controle | Contrato observável |
| --- | --- |
| Scroll trigger | Atravessar um limite dispara uma ação que evolui no tempo. Defina entrada, saída e reentrada: executar uma vez, repetir, retomar ou reverter do estado corrente, sem filas |
| Scrub | O progresso da rolagem dentro de uma faixa determina o progresso visual; defina mapeamento, limites e reversão. Ao parar o scroll, o progresso estabiliza, embora um loop independente possa continuar |
| Loop ambiental | O tempo mantém um movimento perceptível mesmo com página e ponteiro parados. Defina período/variação, amplitude e continuidade do ciclo; subordine-o à leitura e à ação principal |

Scroll trigger e animação constante fazem parte do padrão da skill, mesmo sem menção no pedido; componha ambos na jornada normal, sem exigir abrir um explorador ou clicar para descobri-los. Scrub, gesto e disparo podem coexistir, mas não se substituem silenciosamente. Defina qual controlador governa cada propriedade e como combinações ou passagem de controle evitam saltos; o loop não deve sobrescrever a pose do scroll ou a resposta do gesto. Escolha os efeitos pelo conceito, sem um conjunto universal de parallax, reveals e partículas. Para entrada da hero e costura do protagonista, GSAP + ScrollTrigger é o padrão; leia [hero e continuidade](hero-continuity.md). Outras camadas podem usar recursos adequados à stack. Registre exceções concretas sem reduzir a continuidade prometida.

Loops precisam de pausa acessível, alternativa reduzida e suspensão fora de tela/aba oculta; retome sem salto ou acúmulo do tempo suspenso. Entradas e scrub devem resolver corretamente acesso por âncora, restauração de scroll e reentrada, mantendo o conteúdo utilizável.

## Coreografar as camadas como uma sequência

Planeje em um mesmo registro objeto/cena, câmera, luz, tipografia e controles que participam do momento. Defina quem lidera, quem responde, quando o conteúdo se torna legível e o que fica parado. Marque dependências por evento ou progresso compartilhado; evite timers desconectados que só coincidem em uma velocidade de máquina.

A causa não precisa animar todas as camadas. Por exemplo, uma seleção pode reorganizar o protagonista e o enquadramento enquanto o texto espera uma região estável; a legenda pode mudar imediatamente sem viajar junto. Em interação contínua, preservar texto e controles estáveis pode dar ao ambiente mais liberdade de resposta.

Centralize durações, curvas/springs, amplitudes, pivôs, stagger e limites no sistema existente. Nomeie por função e material, preservando variação intencional. Valores iniciais são hipóteses ajustadas na execução; “usar easing premium” ou aplicar uma única curva a tudo não é direção de animação.

Separe **intensidade** da experiência, **qualidade de renderização** e **preferência de movimento**. Um dispositivo potente não exige movimentos maiores; reduzir custo gráfico não autoriza apagar a assinatura; movimento reduzido deve respeitar a preferência mesmo em hardware potente.

## Repertório por função

| Padrão / função | Aplicação | Controle e alternativa |
| --- | --- | --- |
| Revelação editorial / orientar | Recorte ou deslocamento resolve em texto estável; composição define sequência | Conteúdo visível se a inicialização falhar; reduzido mostra estado final |
| Elemento compartilhado / relacionar | Seleção transforma escala, posição e contexto do mesmo elemento | Novo destino vence; acesso direto e retorno funcionam sem o efeito |
| Painel/menu / revelar | Expansão ou passagem coerente com sua origem | Reversão do estado corrente; foco e fechamento independem do tempo decorativo |
| Resposta de material / responder | Gesto atua sobre forma ou articulação com causa e acomodação | Limites, cancelamento e equivalente por toque/teclado; reduzido mantém seleção/realce |
| Narrativa de rolagem / explicar | Progresso real altera composição e enquadramento, com trechos de leitura | Reversão e navegação nativa; conteúdo não depende de pinning/scrub |
| Personagem / expressar | Poses, intenção e resposta desenvolvem personalidade | Ações repetidas substituem anteriores; pose estática equivalente |
| Cena/partículas / atmosfera | Movimento contextual apoia o protagonista | Pausa fora de tela/aba oculta; composição completa se a camada falhar |
| Envio / orientar | Estados reais de espera, confirmação ou erro | Sem progresso inventado; dados e recuperação preservados |

Use transform/opacity quando servirem à composição; máscaras, filtros, deformação, blur e profundidade exigem medição. Não use `will-change` indiscriminadamente. Não fragmente texto sem preservar sua leitura e semântica nem faça controles fugirem da área de clique/toque.

## Alternativas e ciclo de vida

Toque e teclado precisam expressar a mesma intenção por gesto, botão, seleção ou estado equivalente; não dependa de hover. Movimento reduzido remove deslocamento, zoom, rotação e loops não essenciais, preservando estados, escolhas, identidade e foco. Uma resposta estática precisa comunicar a consequência da ação.

Trate troca de rota, acesso direto, histórico, restauração de scroll, resize, fontes/mídia tardias, cancelamento e repetição. Não reproduza uma abertura longa a cada visita interna. Limpe controladores e recursos; pause trabalho fora de tela ou com aba oculta. Áudio requer ativação/controle; preloaders refletem carregamento real, sem espera mínima teatral.

## Revisão de animação em execução

Primeiro observe em velocidade normal, no tamanho de uso: intenção reconhecível, foco da atenção, resposta à mão, ritmo e repouso. Depois use reprodução lenta ou quadros com tempos identificados para encontrar saltos, tangências, oclusões, deriva de pivô, mudança brusca de velocidade e dessincronização. A versão lenta diagnostica; a aprovação do ritmo acontece novamente em velocidade normal.

Repita com gesto lento/rápido, direção invertida, abandono, nova intenção durante acomodação e resize. Verifique a passagem de controle entre gesto e transição, o estado final e a possibilidade de agir durante a sequência. Loops devem apoiar a narrativa sem disputar leitura ou esconder ausência de resposta real.

Para scroll e movimento constante, permaneça parado por tempo suficiente para observar o ciclo; desça/suba, salte por âncora, saia/reentre e confira a política de cada trigger e a reversão do scrub. Observe ambos juntos e durante um gesto quando aplicável: legibilidade, continuidade, controle compartilhado e custo combinado. Confira pausa, reduzido e suspensão/retorno fora de tela; um loop só no código ou um efeito escondido atrás de clique não comprova a experiência solicitada.

Registre a **mesma sequência antes/depois**, com viewport, ações e condições comparáveis; se não houver baseline, declare isso. Gravação ou quadros identificados sustentam afirmações temporais; screenshot isolado só sustenta composição. Anote a falha perceptiva, a decisão que a corrige e o resultado observado — por exemplo, “o impulso agora começa perto do contato e dissipa antes de uma nova leitura”.

Verifique fluidez no ambiente disponível, separando projeto de movimento de limitações de renderização. Meça intervalos de quadro, picos, duração e latência pertinentes quando possível; registre dispositivo/renderer, carga e limitações. Média de FPS, frames exportados ou teste headless não certificam resposta em aparelho real. Corrija primeiro as falhas materiais da sequência; depois propague e verifique suas variações nas demais famílias. Quantidade de testes, WebGL, springs ou curvas não comprova animação profissional.
