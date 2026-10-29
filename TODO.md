# TODO — MVP LOQ

## Catálogo e descoberta de máquinas

- Busca por tipo, modelo ou categoria.
- Filtros de localização, período, capacidade e preço.
- Resultados exibidos com foto, modelo, localização e valor.
- Detalhes do equipamento com fotos, especificações técnicas, descrição, localização, valor, disponibilidade e identificação do proprietário.

## Proposta de locação

- Seleção das datas de utilização.
- Informações sobre período e local de entrega.
- Exibição do valor estimado.
- Opção de incluir seguro no momento da proposta e atualização automática do valor final.
- Opção de incluir operador especializado e acréscimo do valor da diária no resumo financeiro.
- Confirmação do envio da proposta e acompanhamento do status.

## Minhas propostas e locações

- Exibição de propostas enviadas, aceitas, recusadas e em negociação.
- Visualização de locações ativas e concluídas.
- Acesso aos detalhes de cada contratação.

## Painel do proprietário

- Lista dos equipamentos cadastrados com visualização e edição de informações, valor, disponibilidade e condições.
- Definição, alteração e bloqueio de períodos disponíveis.
- Exibição das propostas recebidas com cliente, equipamento, período, local e valor.
- Opções de aceitar, recusar ou apresentar novas condições.
- Exibição do valor e status do pagamento da locação.

## Fundação do projeto

- Manifesto de rotas servido em `/manus-routes.json` com as páginas do MVP.
- Layout responsivo em português brasileiro usando `#007016`, `#1d2669` e `#59e732`.
- Fluxos de interação com feedback visual local e dados demonstrativos prontos para futura persistência no banco.
- Projeto deve passar em `pnpm check` e `pnpm build`.

## Login demo e novos perfis

- Login fictício com seleção entre Locatário/Cliente, Proprietário/Locador, Transportadora e Operador.
- Uso de e-mail e senha demo com mensagem explícita de que nenhuma informação é persistida ou enviada externamente.
- Rota `/transportadora` com solicitações de transporte contendo origem, destino, máquina, período, peso, distância e valor; envio de orçamento com confirmação local.
- Rota `/operador` com radar de serviços ativável/desativável, oportunidades compatíveis, aceite/recusa representado, agenda resumida e ações de início e conclusão de serviço.
- Avatares das visões existentes levam ao login demo para troca rápida de persona.
