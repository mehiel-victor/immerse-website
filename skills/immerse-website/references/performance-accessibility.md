# Qualidade adaptativa, desempenho e acessibilidade

Consulte ao definir orçamentos, implementar recursos avançados ou verificar o resultado. Registre condições e medições no [brief](../assets/templates/brief.md); vincule falhas à [matriz de cobertura](../assets/templates/site-coverage.csv).

## Definir um alvo verificável

Escolha um dispositivo ou perfil de emulação, navegador, viewport, entrada, rede, cache e cenário de interação. Distinga dispositivo real de emulação. Use condições comparáveis para o antes e o depois; registre mudanças de ambiente.

| Recurso | Decisão antes de implementar | Evidência possível |
| --- | --- | --- |
| JavaScript inicial | Limite de transferência e execução; o que pode chegar após interação | Relatório de build, rede e tarefas longas |
| Imagens, vídeo e fontes | Dimensões, formatos, variantes e prioridade por contexto | Rede, dimensões renderizadas e carregamento sem cache |
| Texturas e cena | Resolução, número de objetos, passes e limite de pixel ratio | Estatísticas do renderer e perfil gráfico disponível |
| Carregamento | Tempo aceitável para conteúdo e ação principal utilizáveis | Marcas de desempenho, métricas do navegador e percurso real |
| Animação | Trabalho por quadro compatível com a taxa de atualização escolhida | Timeline de performance durante o cenário, travamentos e atrasos |
| Memória e GPU | Limite ou tendência aceitável após repetir rotas e interações | Comparação antes/depois, recursos retidos e métricas disponíveis |

Valores são metas do projeto, não resultados garantidos. Meça o que o ambiente permite e marque o restante como não medido. Uma captura de tela não comprova fluidez; uma medição de laboratório não representa automaticamente a população real de visitantes.

## Reduzir custo sem perder a direção

- Carregue cenas, players e assets pesados quando necessários; priorize conteúdo e ação principal.
- Dimensione imagens e vídeos para o uso real; reserve espaço antes da carga. Não faça preload indiscriminado.
- Agrupe leituras de layout, depois escritas; evite medir e alterar geometria alternadamente em cada quadro.
- Use transformações e opacidade quando adequadas. Verifique o custo real de filtros, sombras, máscaras, grandes superfícies e composição.
- Interrompa loops e mídia fora de tela ou com a aba oculta. Retome sem salto de estado nem aceleração acumulada.
- Descarte recursos na saída e repita navegação para procurar crescimento persistente de memória e duplicação de listeners.
- Adapte densidade, resolução, efeitos e frequência de atualização ao contexto observado. Não use largura da tela como único indicador de capacidade.

## Separar intensidade de qualidade

**Intensidade** controla amplitude, profundidade, ritmo e frequência expressiva. **Qualidade** controla resolução, partículas, passes e custo gráfico. Um aparelho potente pode ter movimento reduzido ativado; um aparelho lento pode conservar a linguagem em baixa qualidade.

Defina perfis no [motion spec](../assets/templates/motion-spec.md). Troque de perfil preservando conteúdo, foco, estado do fluxo e intenção visual. Uma adaptação não pode reiniciar formulários nem remover ações.

## Garantir uma experiência estável

- Mantenha conteúdo essencial em estrutura semântica utilizável quando uma camada visual falhar. Canvas decorativo não substitui texto, links ou controles.
- Para WebGL, trate indisponibilidade inicial e perda de contexto. Mostre alternativa completa, como imagem ou composição DOM, com as mesmas ações e conteúdo; permita recuperação quando viável.
- Detecte movimento reduzido no início e durante a sessão quando a plataforma permitir. Resolva timelines em andamento para estado compreensível; não deixe elementos ocultos ou bloqueios de scroll.
- Substitua deslocamentos, zoom, parallax e sequências extensas por composição estável, estado final imediato ou transição discreta apropriada. Não apague identidade, feedback ou relações entre estados.
- Ofereça pausa para movimento contínuo quando aplicável. Áudio depende de ação e controle claros, com estado visível e preferência respeitada; a compreensão não deve depender dele.
- Vincule preloaders à carga real. Para progresso não mensurável, use indicação indeterminada, tratamento de falha e saída recuperável; nunca invente uma porcentagem ou espera mínima teatral.

## Verificar acessibilidade na interação real

- Percorra as ações só com teclado: ordem lógica, foco visível, ativação, fechamento e retorno de foco de overlays. Não crie armadilhas nem use `tabindex` positivo para corrigir estrutura.
- Confirme nomes acessíveis, rótulos associados, hierarquia e landmarks; anuncie somente mudanças relevantes, sem narrar cada quadro da animação.
- Dê equivalente por foco, toque ou controle explícito ao conteúdo revelado por hover. Arrastar não deve ser a única forma de executar uma ação importante.
- Confira contraste sobre os estados e fundos realmente exibidos. Use os critérios do projeto; como referência de contraste AA, 4,5:1 para texto normal e 3:1 para texto grande e elementos de interface aplicáveis.
- Garanta alvos confortáveis, preferencialmente 44–48 px conforme a plataforma, e espaço entre ações adjacentes. Preserve zoom e rolagem nativos.
- Verifique texto longo, zoom, telas estreitas e orientação; evite recortes e overflow involuntário. O foco não pode ficar escondido sob cabeçalhos fixos.
- Teste carregamento, erro, envio e sucesso com texto e semântica, além da cor e do movimento. Sucesso visual acompanha confirmação real do sistema.

## Registrar o resultado

Associe cada verificação a cenário, ambiente, resultado observado e evidência. Diferencie revisão de código, medição automatizada e observação no navegador. Registre capacidades não exercitadas — por exemplo, toque emulado, leitor de tela indisponível ou GPU não mensurável — sem convertê-las em aprovação.

Corrija regressões materiais antes de concluir. Repita os cenários afetados após a correção; não dilua o resultado com novas medições sem hipótese concreta.
