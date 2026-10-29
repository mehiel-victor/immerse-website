# Hero habitável e continuidade por rolagem

Leia antes de definir o protótipo central. São padrões de uma invocação simples da skill: **entrar perceptivelmente no universo da hero** e **manter o mesmo protagonista na passagem para as seções seguintes**, com GSAP ScrollTrigger coordenando a sequência. Não espere um pedido adicional de zoom, pin ou elemento compartilhado. Uma exceção explícita do usuário, movimento reduzido ou restrição concreta pode alterar a execução; registre a alternativa e preserve o conteúdo.

## Entrada em profundidade

Preserve o percurso **à frente da cena → dentro do universo → próximo contexto**, desenvolvido por **ao menos cinco etapas perceptivelmente distintas de profundidade** antes da entrega ao contexto seguinte. Na primeira faixa de rolagem, o visitante deve perceber avanço para dentro da hero, não apenas a imagem diminuindo e saindo pela borda. Resolva câmera/perspectiva ou escala relativa, planos em profundidades distintas, oclusão e destino da atenção. Texto, protagonista e ambiente não devem ampliar todos como uma fotografia plana.

Planeje as cinco etapas com pose de origem/destino, plano que lidera, movimento de câmera/escala relativa, atenção e estado legível. Um percurso original possível é: **aproximação → limiar → descoberta espacial → travessia → acomodação interna**. Adapte as funções à marca; não replique a mesma cena em cinco tamanhos. Cada etapa precisa mudar enquadramento, relações entre planos ou contexto visual de maneira observável. Cinco marcadores sobre um único zoom não satisfazem o mínimo.

Distribua espaço de scroll suficiente para perceber cada passagem e voltar por ela, sem exigir cinco cliques nem criar espera artificial. Um indicador discreto de percurso pode orientar, mas não comprova profundidade. Movimento reduzido oferece uma composição estável e acesso direto; não obriga atravessar cinco animações.

Exemplo original: num gabinete de instrumentos, anéis próximos passam para fora do enquadramento, a trama distante cresce lentamente e a peça se aproxima do visitante. Ao atravessar esse limiar, a mesma peça se afasta e pousa na coleção; o texto do acervo assenta quando a trajetória libera sua região. Uma tipografia espacial ou ilustração pode usar a mesma gramática sem simular objetos realistas. Não imponha túnel, estrelas ou bússola a outra marca.

Use pin de uma região de apresentação quando ele sustentar a entrada; delimite a duração pela ação e pela área de leitura. Preserve rolagem nativa, âncoras e saída da região. Um preloader, um zoom automático no carregamento, parallax raso ou um vídeo de fundo isolado não comprovam essa entrada.

## Um protagonista atravessa as seções

Escolha o elemento que organiza a jornada: objeto, imagem, palavra, forma ou conjunto com identidade clara. Especifique origem e destino em hero → descoberta → aprofundamento, escala/orientação preservadas, mudanças de função e caminho de retorno. Por padrão, use o mesmo nó DOM ou objeto de cena durante a costura entre seções da mesma página. Portais ou reparenting podem mudar seu contêiner; a identidade e o estado não devem ser reiniciados. Em troca real de documento, use continuidade visual equivalente e declare a mudança técnica.

Uma cópia independente em cada seção com fade de entrada não atende a esse padrão. Hand-off de renderização só é aceitável quando necessário, sem duplicação visível ou perda de pose/estado. Registre o motivo e verifique a passagem em execução.

## ScrollTrigger como controlador padrão

No navegador, adote **GSAP + ScrollTrigger** para a entrada da hero e a costura do protagonista, usando a versão instalada ou uma versão adicionada de forma justificada. Confirme APIs e licença. Outra implementação exige restrição concreta ou escolha explícita e deve preservar o mesmo resultado; isso não autoriza migrar framework/roteador.

- **Gatilho temporal:** um limite dispara uma ação com duração e reentrada definidas, mesmo que a pessoa pare de rolar.
- **Scrub:** use progresso de scroll quando a travessia precisar acompanhar a intenção; defina começo/fim, smoothing e reversão. Não chame scrub de entrada temporal nem elimine os triggers de entrada/saída independentes.
- **Loop ambiental:** continua perceptível com página e ponteiro parados e não sobrescreve câmera/pose governadas pelo scroll.
- **Coordenação:** uma propriedade tem um controlador; use um estado/progresso compartilhado para hero, câmera, texto, luz e elemento. Recalcule depois de fontes, mídia e resize; agrupe leituras de geometria e invalide o cache quando necessário.
- **Interrupção:** descer/subir, inverter no meio, usar âncora ou abrir um detalhe deve resolver a pose atual sem filas, clones acumulados ou reinício da hero.

## Aceite antes de propagar

Execute a sequência com assets representativos e verifique:

1. Sem clicar, a rolagem percorre no mínimo cinco etapas de entrada com mudanças distintas de profundidade, planos e atenção. Observe o centro de cada etapa e a passagem entre elas, incluindo retorno; nomes e contadores isolados não bastam.
2. O protagonista continua identificado na origem, passagem e destino; inspecione identidade do nó/objeto e pose, além dos pixels. Nenhuma cópia aparece simultaneamente.
3. A trajetória conecta composições, em vez de apenas revelar um catálogo convencional depois de uma hero isolada. Texto/controles não ficam cobertos em momentos de leitura.
4. Reversão lenta/rápida e retorno restauram as relações; âncoras, acesso direto, histórico e resize não deixam estados intermediários presos.
5. Pausa interrompe movimento autônomo sem impedir navegação. Movimento reduzido elimina zoom, viagem espacial e pin desnecessário, mostrando composições estáveis e conteúdo completo.
6. Mobile/toque mantém a intenção com trajetória e custo adaptados; falha da biblioteca oferece a página estática utilizável.

Registre viewport, ações, estados intermediários, observações e limites. Contagem de testes não certifica sensação subjetiva nem acabamento profissional. Se o protótipo só mostrar uma imagem grande seguida de cards, revise a encenação antes de expandir; não espere o usuário pedir a costura depois.
