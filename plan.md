# Plano do MVP LOQ

## Escopo

O MVP transforma o backlog em uma experiência navegável da LOQ — marketplace brasileiro de locação de máquinas. O recorte foca as jornadas de maior valor dos itens **Must Have** para Locatário/Cliente e Proprietário/Locador, com dados demonstrativos e estados interativos no frontend. Transportadora e Operador aparecem como extensões de operação no produto, sem ampliar a primeira entrega com backoffice completo.

## Decisões de implementação

- **Stack:** React + TypeScript + Vite no starter web-db-user, com Express/tRPC/Drizzle preservados para evolução do backend.
- **Experiência inicial:** dashboard do locatário em `/`, com navegação lateral e alternância para a visão do proprietário via seletor de perfil.
- **Fluxos funcionais no MVP:** busca por texto, filtros por categoria/localização, cards de equipamentos, detalhe em drawer/modal, proposta com datas, local, seguro e operador, atualização de resumo financeiro, confirmação de envio e acompanhamento de propostas/locações; visão de proprietário com métricas, propostas recebidas, disponibilidade e CTA de cadastro de equipamento.
- **Persistência:** o starter mantém servidor e banco habilitados; os dados apresentados na primeira entrega são demonstrativos no cliente para permitir validação rápida da UX antes de conectar entidades Drizzle.
- **Autenticação:** o ponto de entrada visual existe no perfil/conta e o starter conserva Manus OAuth; não criar autenticação paralela email/senha.
- **Imagens:** usar três fotos de máquinas de construção selecionadas no image search e copiadas para `client/public/machines`, evitando placeholders genéricos nos cards.
- **Build e execução:** `pnpm dev` na porta 3000, `pnpm check` e `pnpm build` como verificações principais.
- **Rotas:** manifest estático em `client/public/manus-routes.json` para `/` e `/proprietario`.

## Direção de design

- **Movimento:** industrial premium com influência de dashboards de logística e marketplaces B2B; robusto, preciso e energético sem parecer pesado.
- **Princípios:** (1) confiança antes da complexidade, (2) informação em camadas, (3) ações primárias muito claras, (4) ritmo visual com grandes números e imagens de equipamentos.
- **Filosofia de cor:** `#1d2669` ancora segurança e operação; `#007016` comunica disponibilidade e ação; `#59e732` funciona como assinatura de energia e sinal de pronto. Neutros quentes deixam a interface respirável.
- **Layout:** casca de aplicação com navegação lateral estreita, cabeçalho contextual e áreas assimétricas: hero de busca com painel de status, seção de resultados com filtros verticais e trilha lateral de atividade.
- **Elementos assinatura:** marca LOQ em monograma hexagonal, chips de status com ponto pulsante, cards com “faixa técnica” verde e micro-labels em caixa alta.
- **Interação:** cada clique deve dar feedback local (drawer, toast, mudança de status ou resumo), mantendo o usuário no contexto da tarefa.
- **Animação:** transições de 180–240ms, entrada suave de cards, hover com elevação mínima, drawer com deslocamento horizontal; evitar animações decorativas longas.
- **Tipografia:** `DM Sans` para leitura e `Space Grotesk` para títulos/labels técnicos, carregadas via Google Fonts no HTML.
- **Essência:** “A infraestrutura certa para a obra que não pode parar.” Para clientes e proprietários que precisam locar máquinas com segurança, rapidez e previsibilidade. Personalidade: confiável, direta, operacional.
- **Voz:** títulos curtos, específicos e orientados à obra. Exemplos: “Encontre a máquina certa para o próximo avanço.” / “Sua frota trabalhando, não esperando.”
- **Wordmark/logo:** “LOQ” em caixa alta com um corte diagonal no O, acompanhado por um símbolo hexagonal formado por três barras que lembram conexão entre máquina, obra e transporte.
- **Cor proprietária:** verde-lima `#59e732`, usado apenas em momentos de disponibilidade, confirmação e ações de destaque.

## Estrutura

- `client/src/App.tsx`: roteamento principal e provider de feedback.
- `client/src/pages/Home.tsx`: experiência do locatário, busca, catálogo e drawers.
- `client/src/pages/Owner.tsx`: painel do proprietário com propostas, equipamentos e indicadores.
- `client/src/index.css`: tokens de cor, tipografia, layout e componentes visuais específicos da LOQ.
- `client/public/machines/*`: fotos reais usadas nos cards.
- `client/public/manus-routes.json`: manifest das páginas navegáveis.
- `server/*`, `drizzle/*`: infraestrutura preservada para a próxima etapa de persistência e autenticação real.

## Critérios de produto preservados

- Busca por tipo, modelo ou categoria, com filtros de localização, período, capacidade e preço representados na interface.
- Resultados com foto, modelo, localização e valor.
- Detalhes com fotos, especificações, descrição, localização, valor, disponibilidade e proprietário.
- Proposta com período, local de entrega, valor estimado, seguro opcional e operador opcional.
- Acompanhamento de propostas e locações com status de negociação, aceita, recusada e ativa.
- Visão do proprietário com cadastro/edição de equipamento, disponibilidade, propostas recebidas, aceitar/recusar/negociar e acompanhamento de pagamentos.

## Extensão de perfis adicionada

O MVP agora inclui uma tela de **Login demo** com seletor de persona e quatro entradas fictícias: Locatário/Cliente, Proprietário/Locador, Transportadora e Operador. A seleção redireciona para a visão correspondente sem autenticação real e exibe claramente que nenhum dado é salvo ou enviado.

As rotas `/transportadora` e `/operador` são dashboards navegáveis e responsivos. A Transportadora possui fretes compatíveis, origem/destino, período, peso, estimativa de valor, envio de orçamento e acompanhamento de um próximo transporte. O Operador possui radar ativável/desativável, oportunidades filtradas por perfil, aceite de serviço, agenda resumida e ações para iniciar/finalizar o serviço. Os avatares das visões de Cliente e Proprietário também levam ao login demo para facilitar a troca de persona.
