# Exemplos de decisões

Use para calibrar domínio, técnica e intensidade. São cenários ilustrativos, não relatos de sites implementados nem resultados de testes. Adapte ao inventário real. Nos três domínios, desenvolva o padrão extremo com disparos por rolagem e movimento ambiental contínuo coerentes com o conceito; mantenha os momentos estáveis necessários às tarefas.

## 1. Portfólio de estúdio — “arquivo vivo”

**Contexto:** MPA editável, projetos no CMS, fotografia autorizada e objetivo de gerar contatos. Famílias: início, índice filtrável, estudo de caso, estúdio, contato e erro; componentes globais e estados de mídia ausente fazem parte da cobertura.

**Direção:** tipografia editorial de grande escala, contraste entre preto e papel, índices pequenos e imagens em enquadramentos assimétricos. O retângulo de um projeto se transforma no enquadramento do estudo de caso; a mesma regra aparece na navegação entre projetos e no fechamento para contato.

**Técnica:** começar com CSS/SVG e transição entre vistas com detecção de suporte; adotar timeline somente se a sequência coordenada exigir. Sem suporte, abrir diretamente a página com composição estável. CMS continua fornecendo conteúdo real.

**Ritmo:** abertura breve e expressiva, índice responsivo à exploração, estudos de caso tranquilos para leitura, CTA claro no fim. Toque usa seleção explícita; movimento reduzido preserva forma e relação sem expansão espacial.

**Entrega/evidência esperadas:** todas as famílias implementadas, template de estudo testado com conteúdo longo e mídia ausente, filtro e contato funcionando; testar deep link, histórico, interrupção e teclado. Screenshots demonstram composição e sequência demonstra continuidade. Não relatar esses resultados sem executar.

## 2. Serviço local ilustrado — “uma oficina que conversa”

**Contexto:** negócio de reparos com tom acolhedor; serviços, detalhes, equipe e solicitação de orçamento. Personagem e ilustrações próprios; visitantes usam principalmente telefone.

**Direção:** uma oficina ilustrada funciona como ambiente de exploração; ferramentas e peças mudam de enquadramento conforme o serviço escolhido, e o personagem responde à ação dentro desse espaço. A passagem ao detalhe desenvolve a mesma cena; o pedido aproxima a composição e estabiliza o movimento para leitura. Um personagem que apenas troca de pose em um layout estático seria insuficiente para a transformação imersiva. Erros recebem ajuda clara, sem humor que culpe a pessoa.

**Técnica:** SVG/CSS pode atender a uma narrativa ilustrada com enquadramentos, recortes e transformações coordenadas; escolha timeline ou outra camada quando esse modelo exigir. Lottie depende de exportação de qualidade e peso compatível. Se o conceito depender de percurso espacial, materiais ou manipulação tridimensional, prove essa solução com assets representativos e considere WebGL; o fato de ser um serviço local não justifica reduzir a ambição. Formulário preserva validação e integração existentes.

**Ritmo:** descoberta lúdica, leitura estável de preços/escopo e formulário tranquilo. Toque tem alvos confortáveis e não depende de hover. Reduzido mantém poses estáticas e feedback textual.

**Entrega/evidência esperadas:** cobertura de páginas e estados do orçamento; testar seleção, validação, envio, indisponibilidade e recuperação. Não simular envio silenciosamente. Se só houver URL pública, entregar inspeção, conceito e matriz proposta, pedir acesso ao projeto; demo apenas se autorizada.

## 3. Produto com jornada crítica — “clareza em camadas”

**Contexto:** site de produto integrado a cadastro e contratação; React com SSR e design system existente. A transformação inclui marketing, planos, ajuda, autenticação e estados relevantes da jornada autorizada.

**Direção:** camadas translúcidas e diagramas mostram o produto; uma linha conecta promessa, escolha de plano e resumo da contratação. Expressão maior na descoberta e contida na revisão e confirmação. Valores, custos e erros permanecem estáveis e claros.

**Técnica:** tokens/componentes existentes, SVG para diagramas, motion em fronteiras cliente. Não alterar contratos ou lógica de preços. Uma cena 3D opcional só entra após prova de valor e medição; fallback mantém explicação completa.

**Ritmo:** demonstração orienta, comparação permite ler, transição mantém contexto e confirmação representa resposta real do serviço. Nunca atrasar envio, inventar progresso ou celebrar antes da confirmação.

**Entrega/evidência esperadas:** checks do projeto, jornadas em ambiente de teste com falha/reenvio, teclado e movimento reduzido; verificar SSR/hidratação, histórico e acesso direto. Sem credenciais de teste, registrar integração como pendente e entregar o que foi realmente verificado.

## Limites que mudam a execução

| Pedido e acesso | Resultado apropriado |
| --- | --- |
| “Quais tecnologias este site usa?” + URL | Análise com evidências e incerteza; não instalar pacotes nem reconstruir |
| “Transforme meu site” + repositório | Inventário, direção, implementação completa e QA real |
| “Quero imersão a nível extremo” + projeto editável | Compromisso extremo: definir modelo de exploração, provar transformação dominante em descoberta → escolha → detalhe → retorno e propagar a direção ao escopo; parallax e fades isolados não aprovam |
| “Quero esse nível” + screenshot | Composição observável; motion é hipótese até evidência ou protótipo |
| “Crie uma demonstração local” + referência pública | Demo original identificada, com alcance e simulações explícitos; não alegar alteração do original |
| “Ajuste apenas a transição do menu” | Menu, estados e consumidores afetados; não redesenhar todo o produto |
