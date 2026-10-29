# Cobertura do site e verificação

Consulte ao delimitar o trabalho, expandir a implementação além da primeira página e preparar a entrega. Copie [site-coverage.csv](../assets/templates/site-coverage.csv) para o local de trabalho do projeto; a linha de exemplo é instrucional e deve ser substituída.

## Construir um inventário rastreável

Inspecione o roteador, layouts, templates, componentes e fontes de conteúdo disponíveis. Confronte o inventário com a navegação executável. Sitemap e links públicos ajudam, mas não comprovam rotas autenticadas, estados internos ou a totalidade do CMS.

Use uma linha por unidade com comportamento verificável: página, família de template, componente compartilhado, estado ou jornada. Divida a linha quando a transformação, a alternativa ou a verificação mudar materialmente. Relacione os itens por IDs, sem copiar a mesma especificação em cada rota.

Inclua o que existe no escopo: cabeçalho, menus, rodapé, busca, filtros, galerias, overlays, formulários e CTAs. Identifique variantes de conteúdo e estados de carregamento, vazio, erro, sucesso, foco, hover, seleção, expansão e envio. Marque itens inaplicáveis com motivo; não crie funcionalidades para preencher a matriz.

Em famílias dinâmicas, enumere o template e as variações relevantes: conteúdo curto/longo, mídia ausente, listas vazias ou extensas, permissões e parâmetros, conforme o produto. Registre rotas representativas e por que representam a família. Um exemplar não cobre uma variação com comportamento diferente.

Para componentes globais, registre a origem compartilhada e seus consumidores. Verifique no código sua aplicação global e execute instâncias representativas de cada layout; não declare todas as rotas testadas quando apenas a propagação do componente foi inspecionada.

## Registro mínimo para casos pequenos

Em uma demonstração pequena, use um único registro antes de editar: objetivo/acesso, conceito, inventário e uma linha por unidade verificável. Acrescente valores de motion e orçamento pertinentes no mesmo registro; os três templates completos não são obrigatórios. Expanda quando houver complexidade ou risco que justifique a separação.

Exemplo de uma linha inicial (complete as demais famílias, componentes, estados e jornadas do inventário):

| Unidade/papel | Visual e motion | Toque / reduzido / fallback | Implementação / verificação | Como verificar |
| --- | --- | --- | --- | --- |
| Template de serviço, 3 variações; aprofundar e levar ao pedido | A escolha reorganiza a cena e desenvolve o conteúdo no detalhe; retorno recupera a relação com a origem; valores no motion spec | Escolha explícita / composições estáveis por estado / links e conteúdo completos | Pendente / não executada | Executar escolha → detalhe → pedido → retorno nas 3 variantes; observar composição e transformação, além de teclado, mobile e reversão |

Atualize status e evidências durante o trabalho. Não reconstrua um baseline fictício ao documentar depois; declare o que foi registrado tardiamente. Esse formato reduz documentação, não alcance nem critérios de conclusão.

## Usar a matriz durante a execução

Preencha papel, proposta visual e ligação para a especificação de movimento antes de editar. Defina toque, movimento reduzido, fallback e condições de tela como parte da proposta, não como correções finais.

Mantenha duas situações separadas:

- **Implementação:** pendente, em andamento, implementado, bloqueado ou fora do escopo justificado.
- **Verificação:** não executada, aprovada, falhou, bloqueada ou não aplicável justificado.

Uma implementação sem execução permanece não verificada. Bloqueios identificam o acesso ou recurso ausente e o próximo passo; não desaparecem da matriz. Toda alteração do alcance deve ficar explícita.

## Executar a experiência

1. Capture o estado inicial com conteúdo e condições identificáveis. Use dados de teste nas integrações conforme as convenções do projeto.
2. Após os fundamentos e o protótipo de maior incerteza, percorra as famílias implementadas e jornadas essenciais; execute lint, testes, build e checks aplicáveis.
3. Observe o movimento rodando. Dispare ações repetidas, interrompa e inverta transições; valide o estado final, foco, scroll e ausência de filas acumuladas.
4. Navegue por links, acesse páginas internas diretamente e recarregue; use voltar/avançar, âncoras e restauração de scroll onde existirem. Repita para detectar inicializações duplicadas e recursos retidos.
5. Exercite desktop, tablet e mobile em tamanhos representativos e limites de layout. Teste teclado, toque disponível ou emulado, rotação e preferência de movimento reduzido.
6. Atrase ou falhe fontes, imagens e recursos avançados quando a ferramenta permitir. Valide erros recuperáveis, conteúdo disponível e contratos das integrações afetadas.
7. Confira erros de execução, requisições falhas e assets ausentes. Compare composição e estados com o início, usando condições equivalentes quando possível.
8. Faça uma rodada própria de refinamento: ajuste ritmo, hierarquia, alinhamentos, recortes, resposta ao gesto e continuidade. Corrija falhas materiais e repita as verificações afetadas.

Não envie operações reais apenas para demonstrar animações. Use os mecanismos de teste do projeto e a autorização já existente; preserve os contratos e as regras de negócio.

## Escolher evidências adequadas

| Afirmação | Evidência que a sustenta |
| --- | --- |
| A composição funciona em determinado tamanho | Captura identificada por rota, viewport, estado e origem dos dados |
| A coreografia funciona e responde à interrupção | Observação direta registrada; gravação curta ou sequência de quadros, quando disponível |
| A jornada preserva dados e contratos | Teste ou execução da jornada com entradas, resultado e ambiente identificados |
| Um componente alcança várias famílias | Origem e consumidores inspecionados, mais instâncias executadas |
| Um orçamento foi atendido | Medição com método e condições, conforme [performance-accessibility.md](performance-accessibility.md) |

Não use revisão conceitual como prova de implementação, captura como prova de movimento, emulação como teste em aparelho real ou sucesso de build como aprovação visual.

## Fechar o alcance com honestidade

Reconcile a matriz com os arquivos alterados e as evidências. A experiência completa exige todas as famílias, componentes, estados e jornadas acordados; um hero pronto não fecha itens pendentes.

Avalie autoria, composição, coreografia, resposta ao gesto, continuidade, clareza e acabamento pelo [aceite criativo de imersão](immersive-quality.md), separado da aprovação funcional. O registro compacto acima organiza o trabalho; sua linha de animação não representa, isoladamente, qualidade imersiva aprovada.

Entregue acesso à implementação ou instrução reproduzível de execução, cobertura realizada, decisões principais e verificações com resultado. Liste limitações, itens bloqueados e recursos não medidos separadamente. Só declare publicação quando tiver sido autorizada e verificada.

## Avaliar a própria skill

Crie estímulos inéditos de portfólio/estúdio, serviço local ilustrado e produto com jornada funcional. Dê ao avaliador o pedido, a skill e os artefatos brutos mínimos, sem antecipar respostas ou falhas esperadas. Os [exemplos](examples.md) calibram o domínio, mas não são gabaritos do teste. Compare adaptação à marca, escolha técnica, cobertura, preservação de jornadas e reconhecimento de limites.

Quando houver execução disponível, aplique a skill a um caso isolado e percorra o resultado no navegador. Identifique a demonstração como tal. Registre avaliações conceituais e testes executados em categorias distintas; corrija a skill com base nas falhas observadas.
