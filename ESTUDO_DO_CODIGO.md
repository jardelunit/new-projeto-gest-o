# Estudo do código – LogiMaster TMS

Análise completa dos arquivos do projeto React/Vite (tema escuro, dados mockados, roteamento por HashRouter). Estrutura principal e comportamento, arquivo a arquivo.

## Configuração e Bootstrap
- `package.json`: app React 19 + Vite 6; dependências apenas de UI (`lucide-react`, `recharts`, `react-router-dom`); scripts `dev/build/preview`.
- `tsconfig.json`: target ES2022, JSX automatic, resolução bundler, alias `@` para raiz; `noEmit`.
- `vite.config.ts`: habilita React plugin, carrega `GEMINI_API_KEY` em `process.env`, servidor em 0.0.0.0:3000, alias `@`.
- `index.html`: carrega Tailwind via CDN com paleta estendida, scrollbar custom, import map para libs CDN, root `#root`, entry `index.tsx`.
- `index.tsx`: cria root React, envolve em `React.StrictMode` + `HashRouter`, renderiza `App`.
- `App.tsx`: define rotas principais: landing `/`, login `/login`, dashboards em `/admin/*` e `/client/*`, fallback para `/`.

## Tipos e dados mock
- `types.ts`: contratos de domínio (User, Vehicle, Driver, Freight, Expense, Maintenance, Document, Carrier, KPI, Webhook, Invoice, Fine) e `UserRole`.
- `mocks/index.ts`: coleções de exemplo para todas as entidades (frota, motoristas, multas, fretes, despesas, manutenções, documentos, transportadoras, usuários, webhooks, faturas, KPIs, planos). Usadas por todas as telas; não há persistência real.

## Componentes compartilhados
- `components/layout/Layout.tsx`: `Sidebar` (links variam por `role`, destaca rota ativa via `useLocation`, fecha em mobile, botão sair leva a `/login`), mostra avatar textual e email fictício. `DashboardLayout` monta página com sidebar fixa, header mobile com botão de menu e `children` em área principal.
- `components/ui/Common.tsx`:
  - `Card`: contêiner estilizado com título opcional.
  - `Button`: variantes (primary/secondary/danger/ghost/success), `isLoading` mostra ícone Loader.
  - `Input` e `Select`: rótulo, erro opcional, estilos escuros.
  - `Modal`: overlay escuro, fecha com Esc ou X, renderiza children.
  - `KPICard`: título, valor, mudança percentual opcional com cor condicional.
  - `DataTable`: recebe dados genéricos, colunas com accessor (chave ou função), estiliza cabeçalho e hover.
- `components/charts/DashboardCharts.tsx`: três gráficos Recharts com dados mock locais: `RevenueChart` (Area), `ProfitLossChart` (Bar para receita vs despesas semanais) e `ExpensesPieChart` (Pie por categoria), todos dentro de `Card` com `CustomTooltip`.

## Landing e Login
- `pages/landing/index.tsx`: página de marketing com navbar âncoras, hero com CTA, blocos de features, cards de planos usando `mockPlans`, rodapé simples; estilizada com gradiente de fundo.
- `pages/login/index.tsx`: formulário controlado (email/senha), valida campos, simula autenticação com `setTimeout`. Se email for `admin@logi.com`, salva `userRole=ADMIN` no `localStorage` e navega para `/admin`; qualquer outro leva a `/client`. Mostra alerta de erro, botão loading.

## Dashboard Admin
- `pages/admin/index.tsx`: monta `DashboardLayout` com `role="ADMIN"` e rotas internas.
- `pages/admin/Overview.tsx`: cabeçalho com botão exportar; KPIs de plataforma vindos de `adminKPIs`; `RevenueChart`; card de alertas estáticos; tabela `DataTable` com `mockCarriers` exibindo badges de plano/status.
- `pages/admin/Carriers.tsx`: listagem de transportadoras com busca e filtro (sem lógica ainda), botão “Nova Transportadora”. Colunas mostram plano/status com cores e ações de editar/bloquear (não implementadas).
- `pages/admin/Users.tsx`: tabela de usuários com avatar inicial, badge de role, status colorido; busca simples sem lógica; CTA “Novo Usuário”.
- `pages/admin/Plans.tsx`: cards dos planos de preço de `mockPlans` com ícone de edição e botão “Editar Detalhes”; CTA “+ Novo Plano”.
- `pages/admin/Webhooks.tsx`: tabela de webhooks (url, evento, status com ponto colorido, último disparo); ações de refresh; botão “Adicionar Webhook”.
- `pages/admin/Financial.tsx`: cards-resumo de receita/pendências/atrasos; tabela de faturas `mockInvoices` com chips de status e ação “Baixar PDF”; CTA de relatório financeiro.

## Dashboard Cliente
- `pages/client/index.tsx`: `DashboardLayout` com `role="CLIENT"` e rotas internas.
- `pages/client/Overview.tsx`: KPIs de `clientKPIs`; `ProfitLossChart`; tabela de fretes recentes de `mockFreights` com chips de status; ações rápidas e callout de upgrade.
- `pages/client/Fleet.tsx`: gerencia lista de veículos (`mockVehicles`) e detalhe.
  - `VehicleList`: tabela com placa/modelo/ano/status/km/última manutenção; busca/filtro placeholders; botão cadastrar abre modal.
  - `VehicleDetail`: tabs info/docs/expenses. Info mostra formulário editável e status de motorista; Docs filtra `mockDocuments` pelo `plate`, permite upload/botões de exclusão; Expenses filtra `mockExpenses` por veículo, calcula totais (combustível/geral) em `KPICard`, tabela de gastos; botão “Manutenção” quando aplicável.
  - Modal de criação de veículo: formulário de placa/modelo/ano/km/status inicial; ao salvar adiciona à lista local.
- `pages/client/Freights.tsx`: gestão de fretes com listagem, detalhe e criação.
  - `FreightList`: tabela com origem/destino, motorista/veículo resolvidos de mocks, data, valor e status colorido; ações “Detalhes”; busca/filtro placeholders.
  - `FreightDetail`: tabs info (rota, recursos alocados, valor) e financial (KPIs brutos, despesas e margem). Permite mudar status (iniciar, concluir, cancelar) via `onUpdateStatus`. Despesas do frete vêm de `mockExpenses`; modal de nova despesa é stub.
  - Modal de novo frete: form de origem/destino, motorista, veículo, data e valor; cria item local `Pendente`.
- `pages/client/Drivers.tsx`: gestão de motoristas.
  - `DriverList`: tabela com avatar inicial, telefone, CNH, categoria, validade com alerta (`getCNHStatus` avalia dias para vencer), status e ação “Gerenciar”.
  - `DriverDetail`: header com status CNH, telefone e CTAs (registrar multa, salvar). Tabs:
    - Dados Gerais: formulários pessoais, dados CNH, veículo atribuído (mockVehicles).
    - Histórico de Viagens: cards de totais e tabelas de fretes (`mockFreights`) e despesas (`mockExpenses`) do motorista.
    - Multas: resumo de pontos somados de `mockFines`, tabela com status e modal para registrar nova multa (form sem persistência).
  - Modal de novo motorista: form completo; adiciona motorista ao estado local.
- `pages/client/Expenses.tsx`: filtros por busca, categoria, intervalo de datas; KPIs (total, média, maior gasto) calculados sobre despesas filtradas; gráfico de pizza por categoria (`ExpensesPieChart` com dados agregados via `useMemo`); tabela de despesas com chips de categoria. Modal “Nova Despesa” cria item local.
- `pages/client/Maintenances.tsx`: lista `mockMaintenances`; ações de editar (preenche modal) e finalizar (marca status Concluída). Modal usado para criar/editar manutenção com veículo, tipo, data, custo, descrição e status.
- `pages/client/Documents.tsx`: tabela de documentos (`mockDocuments`) com status colorido (vencido/a vencer/válido) e ação “Renovar”; CTA “Novo Documento”.
- `pages/client/Financial.tsx`: visão financeira com tabs:
  - Visão Geral: KPIs (receita, despesas, lucro calculados de mocks), gráfico `ProfitLossChart`, cards de resumo e ponto de equilíbrio.
  - Contas a Pagar: `payables` derivados de `mockExpenses` com status pago/pendente baseado na data; filtros placeholder; tabela com chips de status.
  - Contas a Receber: `receivables` derivados de `mockFreights`, status “Recebido” se frete entregue; tabela com valores.
  - DRE Gerencial: calcula receita bruta (fretes não cancelados), impostos, custos variáveis, despesas fixas e lucro líquido; `DRERow` renderiza cada linha com coloração por tipo; mostra margem de lucro.
- `pages/client/Reports.tsx`: central de relatórios configurável. Seleciona tipo de relatório e período; filtros adicionais para veículo ou motorista conforme o tipo; gera `reportData` via `useMemo` com base nos mocks e datas; renderiza `DataTable` apropriada; botões simulados de exportação (setTimeout + alert) e impressão.

## Observações gerais
- Todo o estado é local a cada página; não há API real. Navegação depende apenas de `HashRouter` e dados mock. Logout apenas navega ao login; não limpa `localStorage`.
- Estilização consistente em Tailwind (escuro), ícones `lucide-react`, tabelas reutilizam `DataTable`.
- Interações de criação/edição salvam apenas em estado in-memory; formulários de modais servem como mock de fluxos reais.

