# Adaptação à arquitetura e ao ciclo de vida

Use antes de escolher bibliotecas e ao integrar motion com rotas, renderização e recursos gráficos. Preserve o framework, o roteador, o CMS e as convenções que já atendem ao objetivo.

## Escolher a camada

Escolha a partir da transformação prometida, não de uma preferência antecipada por CSS ou WebGL. Para imersão extrema, valide se a camada permite o modelo de exploração, a continuidade e a qualidade dos assets definidos no [contrato perceptivo](immersive-quality.md). Preserve a arquitetura do produto; acrescentar uma camada gráfica justificada não exige substituir roteador, CMS ou formulários. Uma técnica econômica que só produz uma aproximação decorativa não cumpre o contrato; uma cena 3D sem direção também não.

| Necessidade | Camada candidata | Condição para adotar |
| --- | --- | --- |
| Estados de UI, transições pequenas | CSS, Web Animations API | Estados e cancelamento claros; não adicionar runtime sem ganho |
| Vetores, recortes, traços, personagem simples | SVG + CSS/JS | DOM acessível e complexidade de paths controlada |
| Sequências coordenadas, scrub, controle de timeline | GSAP e plugins pertinentes | Coreografia justifica dependência; confirmar instalação, APIs e licença de uso |
| Objetos, materiais, partículas, espaço tridimensional | Three.js/WebGL | Cena faz parte do conceito, com orçamento e fallback completo |
| Cenas declarativas em projeto React | React Three Fiber | Compatibilidade com React/renderer instalado e necessidade real de 3D |
| Efeito gráfico específico | Shader próprio | Efeito essencial e medido; fallback sem shader e limites de precisão/qualidade |
| Animação vetorial produzida em ferramenta externa | Lottie | Exportação compatível, peso controlado, sem depender dela para semântica |
| Continuidade entre vistas | View Transitions API | Detecção de suporte, compatibilidade com roteador/renderização e caminho imediato alternativo |
| Rolagem suavizada | Lenis ou equivalente | Benefício demonstrado; âncoras, teclado, foco, histórico, reduced motion e rolagem aninhada preservados |
| Atmosfera sonora | APIs de áudio | Conceito exige som, visitante o ativa e controla; silêncio continua funcional |

Para a [entrada da hero e a costura entre seções](hero-continuity.md), GSAP + ScrollTrigger é a escolha padrão e sua função já é justificada pelo contrato da skill. Preserve as versões compatíveis do projeto; use outra técnica apenas diante de escolha explícita ou restrição concreta, com resultado equivalente verificado.

Não instale todas as candidatas. Registre a função da dependência selecionada e por que recursos existentes não bastam. Separe ferramentas de produção de assets, código executado no navegador e serviços de conteúdo/mídia/infraestrutura.

## Resolver APIs sem congelar versões

Leia manifest, lockfile e versão efetivamente instalada. Consulte documentação oficial compatível antes de implementar APIs; se a documentação atual divergir do projeto, use a documentação da versão, changelog ou código fonte oficial pertinente. Não atualize dependências só para copiar um exemplo.

Pontos de entrada para consulta, sem garantia de compatibilidade com qualquer versão:

- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), [Web Animations](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API), [View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API).
- [GSAP](https://gsap.com/docs/), [Three.js](https://threejs.org/docs/), [React Three Fiber](https://r3f.docs.pmnd.rs/).
- [Lottie Web](https://github.com/airbnb/lottie-web), [Lenis](https://github.com/darkroomengineering/lenis).
- [React](https://react.dev/), [Vue](https://vuejs.org/), [Svelte](https://svelte.dev/docs), [Astro](https://docs.astro.build/).

## Integrar com o ambiente encontrado

| Arquitetura | Integração e riscos a resolver |
| --- | --- |
| HTML/MPA e templates de servidor | Conteúdo/links funcionam antes de JS; inicialização idempotente; navegação real e restauração via back/forward cache |
| React / Next ou outro SSR React | APIs de navegador em fronteiras cliente/efeitos; SSR/hidratação mantêm o mesmo conteúdo inicial; limpar efeitos em reexecuções e desmontagem; eventos públicos do roteador |
| Vue / Nuxt | Ref de elemento e hooks de montagem/desmontagem; considerar componentes mantidos vivos e mudanças de rota; não disputar propriedades com o render |
| Svelte / SvelteKit | Transições/actions nativas adequadas; cleanup ao desmontar e hooks oficiais de navegação; verificar SSR e foco |
| Astro / ilhas | HTML sem hidratação utilizável; hidratar apenas ilhas necessárias; tratar reentrada após navegação do cliente sem listeners duplicados |
| CMS / conteúdo dinâmico | Template real, slots e campos existentes; título longo, mídia ausente e coleções vazias; não substituir dados por hardcode visual |

Consulte apenas o adaptador correspondente ao projeto; esses critérios não substituem documentação da versão nem autorizam migração arquitetural.

## Contrato do controlador

Mantenha estado da aplicação como fonte de verdade. Encapsule montagem, atualização e descarte no mecanismo do framework. Um controlador deve tolerar execução repetida, elemento removido, preferência alterada e destino de navegação substituído.

Na desmontagem, cancele animações/RAF, timelines, observers e listeners; remova classes/estilos temporários que bloqueiem conteúdo. Descarte texturas, materiais, geometrias e renderers conforme propriedade e compartilhamento: não destrua recurso ainda usado por outra instância. Libere objetos de áudio e mídia quando não necessários.

Trate resize/orientação, fontes carregadas e imagens decodificadas sem ler e escrever layout repetidamente por quadro. Invalide medidas na mudança pertinente, faça leituras agrupadas e reaproveite resultados. Evite dois loops de renderização para a mesma cena.

## Navegação e falhas

- Teste entrada direta em rota interna, voltar/avançar, âncoras e restauração de scroll do roteador; não force topo em toda mudança.
- Garanta foco e título apropriados após navegação, sem atrasar acesso por duração decorativa.
- Interrompa recursos da página anterior e revalide a intenção antes de concluir callbacks assíncronos. Troca rápida de rota não pode restaurar conteúdo velho.
- Carregue módulos pesados sob demanda. Falha de import, imagem, vídeo, fonte ou inicialização/perda de contexto WebGL deve convergir para alternativa legível e navegável.
- Preserve validação, envio, erros, autenticação e contratos. Demonstração com respostas simuladas deve declarar essa condição; não chamar simulação de integração verificada.
