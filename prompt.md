


Você é um engenheiro de software focado em simplificar fluxos de trabalho complexos, mantendo a estética e a arquitetura React/TypeScript/Tailwind/Vite do projeto LogiMaster TMS (tema escuro).  
**OBJETIVO PRINCIPAL:** Recriar **do zero** o módulo de fretes (pages/client/Freights) e seus subcomponentes. O objetivo é transformar o módulo em um sistema de **emissão fiscal (CT-e/MDF-e)**, focado em alta usabilidade e integração com APIs de terceiros, priorizando a agilidade do usuário no preenchimento.

### ---

**1\. REESTRUTURAÇÃO DO FLUXO DE CRIAÇÃO (Novo Documento Fiscal)**

O modal de criação de fretes atual (CreateFreightModal.tsx) deve ser **removido e substituído** por um componente de fluxo de passos (Wizard) otimizado para a coleta de dados fiscais.  
**A. Componente Principal:** Crie um novo componente chamado NewFreightWizard.tsx. Ele deve ser o fluxo de criação principal.  
**B. Fluxo do Wizard (4 Passos CRÍTICOS):**

| Passo | Título | Foco e Campos Chave (Integração API) |
| :---- | :---- | :---- |
| **Passo 1: Carga & NF-e** | Dados da Mercadoria e Fiscais de Origem | **Input: Chave de Acesso da NF-e (44 dígitos)**. Adicione um botão "Importar Dados" que simula a chamada de API e preenche: Remetente, Destinatário, Peso e Valor da Carga. **Dropdown: Tipo de CT-e** (Normal, Substituição, Anulação). **Dropdown: Tomador do Serviço** (Pagador do frete). |
| **Passo 2: Rota e Recursos** | Logística e Alocação | **Dropdowns de Veículo e Motorista** (puxando dos cadastros existentes). **Multi-select/Checkboxes: UFs de Percurso** (Lista de Estados que o caminhão passará, essencial para o MDF-e). Data/Hora de Coleta e Entrega. |
| **Passo 3: Valores e Impostos** | Composição de Custo e Cálculo Fiscal | **Input: Valor Total da Prestação (Frete Bruto).** Inputs opcionais para Ad Valorem, GRIS e Pedágio. **Campos Fiscais:** Regime Tributário, Base de Cálculo e Alíquota do ICMS (simular cálculos para envio à API). |
| **Passo 4: Revisão e Emissão** | Transmissão à SEFAZ | Resumo dos dados. **Opção MDF-e:** Checkbox para "Gerar MDF-e Imediatamente com este CT-e?". **Botão Principal: "Emitir CT-e e Transmitir"** (Simular isLoading e retorno da API: Autorizado/Rejeitado). |

### ---

**2\. APRIMORAMENTO DA TELA DE DETALHES (FreightDetail.tsx)**

A tela de detalhes do frete deve ser um **Hub de Gerenciamento Fiscal**.  
**A. Nova Aba:** Adicione uma terceira aba chamada **"Documentos Fiscais"** ao lado de "Informações" e "Financeiro".  
**B. Conteúdo da Aba "Documentos Fiscais":**

* **Status Fiscal:** Exiba um indicador visual (Verde, Vermelho, Amarelo) do cteStatus do frete.  
* **Downloads:** Botões para **"Baixar DACTE (PDF)"** e **"Baixar XML do CT-e"**.  
* **Ações MDF-e:** Botões **"Encerrar MDF-e"** (Se mdfStatus for 'Aberto') e **"Emitir MDF-e"** (Se mdfStatus for 'N/A' e CT-e Autorizado).  
* **Ações CT-e:** Botões **"Cancelar CT-e"** e **"Carta de Correção"**.

### **3\. AJUSTES NO LISTAGEM (FreightList.tsx)**

**A. Colunas da Tabela:**

* **Substitua** a coluna "Origem \-\> Destino" por: **"ID Interno"** (ID do seu sistema) e **"Documento Fiscal"**.  
  * **Documento Fiscal:** Exiba o cteNumber e utilize a cor do cteStatus (Autorizado, Rejeitado, etc.) para indicar o Status Fiscal.  
* Mantenha colunas de Motorista/Veículo, Valor e Status Operacional.

### ---

**4\. INSTRUÇÕES GERAIS PARA A CODIFICAÇÃO**

* **Tipos e Mocks:** Atualize types.ts e mocks/index.ts para incluir os campos fiscais (cteNumber, cteStatus, nfeKey, mdfStatus, freightComponents).  
* **Simulação API:** Use setTimeout (1-2s) para simular a latência da transmissão e retorne status mockados (Autorizado, Rejeitado, etc.).  
* **Remoção:** Exclua o componente CreateFreightModal.tsx e todo o código relacionado a ele, pois será substituído pelo Wizard.  
* **Estilo:** Mantenha estritamente o tema escuro e utilize os componentes de UI (Card, Button, Input, Select, DataTable, Modal) já definidos no projeto.